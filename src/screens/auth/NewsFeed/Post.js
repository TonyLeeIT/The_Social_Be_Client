import React, { useContext, useState } from "react";

import { Card, FormControl, Button } from "react-bootstrap";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp as fasThumsUp } from "@fortawesome/free-solid-svg-icons";
import styles from "./Post.module.css";
import { AuthUserCtx } from "../../../context/authUser";

export const Post = ({ post, onLikeClick, onComment }) => {
  const { authUser } = useContext(AuthUserCtx);

  const [showComments, setShowCommnets] = useState(false);

  const [inputValue, setImputValue] = useState("");

  const hasLiked = post.likes
    ? post.likes.some((item) => item === authUser._id)
    : false;
  return (
    <Card className="mb-3">
      <Card.Header className="d-flex">
        <img
          src={post.author.photoUrl}
          style={{ width: "50px", height: "50px" }}
          className="border rounded-circle mr-2"
        />
        <div>
          <h6>{post.author.displayName || post.author.username}</h6>
          <small>{dayjs(post.createdAt).format("DD-MM-YYYY HH:MM")}</small>
        </div>
      </Card.Header>
      <Card.Body
        className="p-4 text-left"
        style={{
          backgroundImage: `url(${post.image})`,
          fontSize: "36px",
          textShadow: "2px 2px 4px #ffffff",
        }}
      >
        {post.content}
      </Card.Body>
      <div className="d-flex p-2">
        <div className={styles.iconButton} onClick={onLikeClick}>
          <FontAwesomeIcon
            icon={hasLiked ? fasThumsUp : faThumbsUp}
            color={hasLiked ? "#007bff" : ""}
          />
          <span>{post.likes ? post.likes.length : 0}</span>
        </div>
        <div
          className={styles.iconButton}
          onClick={() => {
            setShowCommnets(!showComments);
          }}
        >
          <FontAwesomeIcon icon={faComment} />
          <span>10</span>
        </div>
      </div>
      {post.comments.map((item) => (
        <Comment key={item._id} comment={item} />
      ))}
      {showComments ? (
        <div className="d-flex">
          <FormControl
            type="text"
            placeholder="Comment here ...."
            className="flex-grow-1 mr-2"
            value={inputValue}
            onChange={(event) => {
              setImputValue(event.target.value);
            }}
          />
          <Button
            variant="primary"
            onClick={() => {
              onComment(post._id, inputValue);
            }}
          >
            Post
          </Button>
        </div>
      ) : null}
    </Card>
  );
};

const Comment = ({ comment }) => {
  return (
    <div className="d-flex mb-2">
      <img
        src={comment.user.photoUrl}
        style={{ width: "40px", height: "40px" }}
        className="border rounded-circle mr-2"
      />
      <div>
        <h6>{comment.user.displayName}</h6>
        <span>{comment.content}</span>
      </div>
    </div>
  );
};
