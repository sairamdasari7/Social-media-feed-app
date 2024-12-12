import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, "posts"), orderBy("timestamp", "desc"), limit(20));
      const querySnapshot = await getDocs(q);
      setPosts(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchPosts();
  }, []);

  return (
    <div className="p-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-white p-4 rounded shadow-md mb-4">
          <p>{post.text}</p>
          {post.image && <img src={post.image} alt="post" className="w-full mt-2" />}
        </div>
      ))}
    </div>
  );
};

export default PostList;
