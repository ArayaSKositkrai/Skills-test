import React, { useState, useEffect } from "react";

const ElementAndEvent = () => {
  const [bgColor, setBgColor] = useState("white");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const changeBackground = () => {
    const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBgColor(randomColor);
  };

  const handleMouseOver = () => {
    setMessage("Mouse is over the button!");
  };

  const handleKeyUp = (event) => {
    setMessage(`You pressed: ${event.key}`);
  };

  const validateEmail = (e) => {
    setEmail(e.target.value);
    if (!e.target.value.includes("@") || !e.target.value.endsWith(".com")) {
      setEmailError("Invalid email format. It must contain '@' and end with '.com'");
    } else {
      setEmailError("");
    }
  };

  useEffect(() => {
    const button = document.getElementById("eventButton");
    if (button) {
      button.addEventListener("click", () => alert("Button clicked!"));
    }
    return () => {
      if (button) {
        button.removeEventListener("click", () => alert("Button clicked!"));
      }
    };
  }, []);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: bgColor }}>
      <button
        id="eventButton"
        onClick={changeBackground}
        onMouseOver={handleMouseOver}
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer", marginBottom: "10px" }}
      >
        เปลี่ยนสีพื้นหลัง
      </button>
      <p>{message}</p>
      <input type="text" placeholder="Type something..." onKeyUp={handleKeyUp} style={{ marginBottom: "10px", padding: "5px" }} />
      <form style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} style={{ marginBottom: "10px", padding: "5px" }} />
        <input type="email" placeholder="Enter your email" value={email} onChange={validateEmail} style={{ marginBottom: "10px", padding: "5px" }} />
        {emailError && <p style={{ color: "red" }}>{emailError}</p>}
      </form>
    </div>
  );
};

export default ElementAndEvent;