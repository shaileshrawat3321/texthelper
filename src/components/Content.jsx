import React, { useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
// import jsPDF from 'jspdf'
// import autoTable from 'jspdf-autotable'

// imported the toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Content = (props) => {
  // created completion notification
  const completionNotification = () => {
    toast.success("Changes done successfully", {
      autoClose: 1500,
    });
  };
  const handleOnChange = (e) => {
    setText(e.target.value);
  };

  // converting text to uppercase
  const handleUppercase = () => {
    let newText = text.toUpperCase();
    setText(newText);
    completionNotification();
  };

  // converting text to lowercase
  const handleLowercase = () => {
    let newText = text.toLowerCase();
    setText(newText);
    completionNotification();
  };

  const CopyText = () => {
    const writtenText = document.getElementById("contentbox");
    // writtenText.select();
    writtenText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(writtenText.value)
    // navigator.clipboard.writeText(text);

    // showing copy to clipboard notification
    const copyNotification = () => {
      toast.success("Copied to clipboard!", {
        autoClose: 1500,
      });
    };
    copyNotification();
  };

  const removeExtraSpaces = () => {
    let newText = text.replace(/\s+/g, ' ').trim()
    setText(newText);
    completionNotification();
  }

  // function for converting text to speech
  const { speak } = useSpeechSynthesis();
  const textListener = () => {
    speak({ text : text});
  };

  const [text, setText] = useState("");
  return (
    <>
      <div
        className="container"
        style={{ color: props.mode === "dark" ? "white" : "black" }}
      >
        <h1>{props.heading}</h1>
        <div className="my-3">
          <textarea
            className="form-control"
            id="contentbox"
            value={text}
            onChange={handleOnChange}
            rows="7"
            style={{
              color: props.mode === 'dark' ? 'white' : 'black',
              backgroundColor: props.mode === "dark" ? "grey" : "white",
            }}
          ></textarea>
        </div>
        {/* uppercase button */}
        <button
          type="button"
          className="btn btn-primary mx-1 my-1"
          onClick={handleUppercase}
        >
          Convert to Uppercase
        </button>
        {/* lowercase button */}
        <button
          type="button"
          className="btn btn-primary mx-1 my-1"
          onClick={handleLowercase}
        >
          Convert to Lowercase{" "}
        </button>
        {/* copy text button */}
        <button
          type="button"
          className="btn btn-primary mx-1 my-1"
          onClick={CopyText}
        >
          Copy text
        </button>
        {/* remove extra spaces button */}
        <button
          type="button"
          className="btn btn-primary mx-1 my-1"
          onClick={removeExtraSpaces}
        >
          Remove extra spaces
        </button>
        {/* text to speech button */}
        <button
          type="button"
          className="btn btn-primary mx-1 my-1"
          onClick={textListener}
        >
          {" "}
          Click to listen
          {" "}
        </button>
        <ToastContainer />

        <div className="container my-2">
          <h2>Text summary</h2>
          <p>{text.split(/\s+/).filter((word) => word !== "").length} words and {text.length} characters</p>
        </div>
      </div>
    </>
  );
};

export default Content;
