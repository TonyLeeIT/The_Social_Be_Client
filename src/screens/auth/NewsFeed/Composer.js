import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import style from "./Composer.module.css";
import axios from "axios";

const images = [
  "https://www.freecodecamp.org/news/content/images/2020/04/w-qjCHPZbeXCQ-unsplash.jpg",
  "https://cdn.wallpapersafari.com/21/24/pELVjk.jpg",
  "https://htmlcolorcodes.com/assets/images/html-color-codes-color-tutorials-hero.jpg",
];

export const Composer = () => {
  const [selectedImage, setSelectedImage] = useState();
  const [content, setContent] = useState("");

  const createPost = () => {
    axios.post(
      "http://localhost:5000/post",
      {
        image: selectedImage,
        content: content,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    );
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>What are you thinking?</Card.Title>
        <Form.Control
          as="textarea"
          row="3"
          className={style.composer}
          style={{ backgroundImage: `url(${selectedImage})` }}
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
          }}
        ></Form.Control>
        <div className="d-flex justify-content-between mt-2">
          <div>
            {images.map((item) => (
              <img
                src={item}
                key={item}
                alt=""
                className="rounded-circle mr-1"
                style={{
                  width: 30,
                  height: 30,
                  cursor: "pointer",
                  border: item === selectedImage ? "2px solid #007bff" : null,
                }}
                onClick={() => {
                  setSelectedImage(item);
                }}
              />
            ))}
          </div>
          <Button variant="primary" onClick={createPost}>
            Post
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};
