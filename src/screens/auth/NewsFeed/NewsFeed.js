import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Composer } from "./Composer";
import axios from "axios";
import { Post } from "./Post";

export const NewsFeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/post", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        setPosts(res.data);
      });
  }, []);

  const onLike = (postId) => {
    axios
      .post(`http://localhost:5000/post/${postId}/like`, null, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        setPosts(
          posts.map((item) => {
            if (item._id === res.data._id) {
              return res.data;
            }
            return item;
          })
        );
      });
  };

  const onComment = (postId, content) => {
    axios
      .post(
        `http://localhost:5000/post/${postId}/comments`,
        { content: content },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      )
      .then((res) => {
              setPosts(
                posts.map((item) => {
                  if (item._id === res.data._id) {
                    return res.data;
                  }
                  return item;
                })
              );
      });
  };

  return (
    <Container className="mt-5">
      <Composer />
      <hr className="my-5" />
      {posts.map((post) => (
        <Post
          key={post._id}
          post={post}
          onLikeClick={() => {
            onLike(post._id);
          }}
          onComment={onComment}
        />
      ))}
    </Container>
  );
};
