import React, { useState } from "react";
import axios from "axios";

export default function Home() {
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault(); // Corrected the typo
    try {
      await axios.post("http://localhost:8000/", {
        msg,
      });
      console.log("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      <div className="cont">
        {/* <form onSubmit={submit}> Correctly handle form submission */}
          {/* <textarea
            name="text"
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Enter the text"
            cols="30"
            rows="10"
          ></textarea> */}
          {/* <input type="submit" value="Submit" /> */}
        {/* </form> */}
      </div>
    </div>
  );
}
