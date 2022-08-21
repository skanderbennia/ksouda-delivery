import bwipjs from "bwip-js";
import React, { Component } from "react";

class App extends Component {
  // create state
  state = {};
  componentDidMount() {
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
      console.log(canvas);
    } catch (e) {
      // `e` may be a string or Error object
    }
  }
  render() {
    console.log(this.state.image);
    return (
      <div className="App">
        <div className="App-header"></div>
        <img src={this.state.image} style={{ marginTop: 50, marginLeft: 40 }} />
        <canvas id="mycanvas" />
      </div>
    );
  }
}
export default App;
