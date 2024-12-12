import React, { useEffect, useRef } from 'react';

const PostItem = ({ post }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoElement?.play();
          } else {
            videoElement?.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (videoElement) observer.observe(videoElement);

    // Cleanup
    return () => {
      if (videoElement) observer.unobserve(videoElement);
    };
  }, []);

  return (
    <div className="post-item">
      <div className="post-header">
        <img src={post.userPhoto} alt="User" className="post-user-photo" />
        <div>
          <h4>{post.userName}</h4>
          <small>{post.createdAt?.toDate().toLocaleString()}</small>
        </div>
      </div>
      <p className="post-text">{post.text}</p>
      {post.imageUrls && post.imageUrls.length > 0 && (
        <div className="post-images">
          {post.imageUrls.map((url, index) => (
            url.endsWith('.mp4') ? (
              <video
                key={index}
                src={url}
                ref={videoRef}
                muted
                loop
                className="post-video"
              />
            ) : (
              <img
                key={index}
                src={url}
                alt={`Post content ${index}`}
                className="post-image"
              />
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default PostItem;
