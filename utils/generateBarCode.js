function generate() {
  try {
    // The return value is the canvas element
    let canvas = bwips.toCanvas("mycanvas", {
      bcid: "code128", // Barcode type
      text: "0123456789", // Text to encode
      scale: 3, // 3x scaling factor
      height: 10, // Bar height, in millimeters
      includetext: true, // Show human-readable text
      textxalign: "center", // Always good to set this
    });
    return canvas.toDataURL("image/png");
  } catch (e) {
    // `e` may be a string or Error object
  }
}
console.log(generate());
