import bwipjs from "bwip-js";
import React, { Component, useEffect, useState } from "react";

function App() {
  // create state
  const [image, setImage] = useState(null);
  useEffect(() => {
    try {
      // The return value is the canvas element
      let canvas = bwipjs.toCanvas("mycanvas", {
        bcid: "code128", // Barcode type
        text: "0123456789", // Text to encode
        scale: 3, // 3x scaling factor
        height: 3, // Bar height, in millimeters
        width: 3,
        textxalign: "center", // Always good to set this
      });
      setImage(canvas.toDataURL("image/png"));
    } catch (e) {
      // `e` may be a string or Error object
    }
  }, []);

  return (
    <div className="App">
      <div className="App-header"></div>
      <img src={image} style={{ marginTop: 50, marginLeft: 40 }} />
    </div>
  );
}
export default App;
