(function (canvasId) {
  // setup canvas
  var canvas = document.getElementById(canvasId);
  canvas.width = window.innerWidth; // canvas.clientWidth;
  canvas.height = window.innerHeight; // canvas.clientHeight;
  var ctx = canvas.getContext('2d');

  let palette = getGradient("gradient");
  let paletteShift = 0;

  var size = 10;

  function draw(x, y, rgb) {
    ctx.fillStyle = 'rgb(' + rgb + ')';
    ctx.fillRect(x * size, y * size, size, size);
  }

  let h = canvas.height / size;
  let w = canvas.width / size;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let v = (
        + 128 + (128 * Math.sin(x / 8.0))
        + 128 + (128 * Math.sin(y / 8.0))
      ) / 2;

      let color = palette[(Math.round(v) + paletteShift) % palette.length];

      draw(x, y, color);
    }
  }

  function getGradient(canvasId) {
    var canvas = document.getElementById(canvasId);
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    var ctx = canvas.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);

    gradient.addColorStop(0, "black");
    gradient.addColorStop(0.5, "red");
    gradient.addColorStop(0.7, "yellow");
    gradient.addColorStop(1.0, "black");

    // Set the fill style and draw a rectangle
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let array = [];

    for (let i = 0; i < canvas.width; i++) {
      const color = ctx.getImageData(i, 0, 1, 1).data;
      array.push(
        [
          color[0],
          color[1],
          color[2]
        ]
      )
    }

    canvas.remove();

    return array;
  }

})('plasma');
