
const svg2png = require('svg2png');
const fs = require('fs')

class SvgAsPng {

  convert(svgStream) {

    // svg2png(svgStream)
    // .then((buffer) => {
    //   fs.writeFile('./out.png', buffer);
    // })
    // .catch((err) => {
    //   console.log(err);
    // })

    return svg2png(svgStream, {width: 250, height:150});
  }
}

module.exports = SvgAsPng;