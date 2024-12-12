import React from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

const Content = () => {
  const { user } = useAuth();
  return (
    <div style={{ padding: "20px" }}>
      {user ? (
        <>
          <PostForm user={user} />
          <PostList />
        </>
      ) : (
        <h2>Please login to view posts</h2>
      )}
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Content />
    </AuthProvider>
  );
};

export default App;
