import React, { useEffect, useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { AuthUserCtx } from "../../context/authUser";
import io from "socket.io-client";

export const Chat = () => {
  const { authUser } = useContext(AuthUserCtx);

  const [onLineCount, setOnLineCount] = useState(0);

  useEffect(() => {
    const socket = io.connect("http://localhost:5000", {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd",
      },
    });
    socket.emit("setOnline", { id: authUser._id, username: authUser.username });

    socket.on("onLineCount", (count) => {
      console.log("hello");
      setOnLineCount(count);
    });
  }, [{ id: authUser._id, username: authUser.username }]);
  return (
    <Row style={{ height: "100vh" }}>
      <Col xs={3}>
        <div className="border rounded h-100">
          <span>Total Online : {onLineCount}</span>
        </div>
      </Col>
      <Col xs={9}>
        <div className="d-flex flex-column h-100 border rounded">
          <Header />
          <div style={{ flex: 1 }}>
            <Message />
          </div>
          <Composser />
        </div>
      </Col>
    </Row>
  );
};

const Header = () => {
  return <div>Header</div>;
};

const Message = () => {
  return <div>Message</div>;
};

const Composser = () => {
  return <div> Composser</div>;
};
