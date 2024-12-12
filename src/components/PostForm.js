import React, { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const PostForm = ({ user }) => {
  const [text, setText] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text && images.length === 0) return;

    setLoading(true);
    const storage = getStorage();
    const imageUrls = [];

    try {
      // Upload images to Firebase Storage
      for (const image of images) {
        const storageRef = ref(storage, `posts/${user.uid}/${image.name}`);
        await uploadBytes(storageRef, image);
        const url = await getDownloadURL(storageRef);
        imageUrls.push(url);
      }

      // Save post data to Firestore
      await addDoc(collection(db, 'posts'), {
        text,
        imageUrls,
        createdAt: serverTimestamp(),
        userId: user.uid,
        userName: user.displayName,
        userPhoto: user.photoURL,
      });

      // Reset form
      setText('');
      setImages([]);
    } catch (error) {
      console.error('Error uploading post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <textarea
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="post-textarea"
      ></textarea>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        className="post-file-input"
      />
      <button type="submit" className="post-submit-button" disabled={loading}>
        {loading ? 'Posting...' : 'Post'}
      </button>
    </form>
  );
};

export default PostForm;
