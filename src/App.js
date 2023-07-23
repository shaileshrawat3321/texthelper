import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Content from "./components/Content";

function App() {
  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "	#001f24"
    } else {
      setMode("light");
      document.body.style.backgroundColor = "#fff"
    }
  };

  return (
    <>
      <Navbar title="TextHelper" mode={mode} toggleMode={toggleMode} />
      <div className="container my-3">
        <Content heading="Enter the text below" mode={mode}/>
      </div>
    </>
  );
}

export default App;
