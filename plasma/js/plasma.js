(function (canvasId) {
  // setup canvas
  var canvas = document.getElementById(canvasId);
  canvas.width = window.innerWidth; // canvas.clientWidth;
  canvas.height = window.innerHeight; // canvas.clientHeight;
  var ctx = canvas.getContext("2d", { alpha: false });

  let palette = getGradient("gradient");
  let paletteShift = 0;

  var size = 10;

  function draw(x, y, rgb) {
    ctx.fillStyle = 'rgb(' + rgb + ')';
    ctx.fillRect(x * size, y * size, size, size);
  }

  let h = canvas.height / size;
  let w = canvas.width / size;
  var t = 0;

  function main(dt) {
    let t = dt / 500;

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let v2 = (
          128 + (128 * Math.sin(x / 8.0))
          + 128 + (128 * Math.sin(y / 8.0))
        ) / 2;

        let v3 = (
          128.0 + (128.0 * Math.sin(x / 16.0))
          + 128.0 + (128.0 * Math.sin(y / 8.0))
          + 128.0 + (128.0 * Math.sin((x + y + t) / 16.0))
          + 128.0 + (128.0 * Math.sin(Math.sqrt(x * x + y * y) / 8.0))
        ) / 4;

        let v = (
          128.0 + (128.0 * Math.sin((t / 7.0) + x / 16.0))
          + 128.0 + (128.0 * Math.sin(y / 32.0))
          + 128.0 + (128.0 * Math.sin(t + Math.sqrt(((x - w / 2.0) * (x - w / 2.0) + (y - h / 2.0) * (y - h / 2.0))) / 8.0))
          + 128.0 + (128.0 * Math.sin(Math.sqrt((x * x + y * y)) / 8.0))
        ) / 4;

        let color = palette[(Math.round(v + paletteShift)) % palette.length];

        draw(x, y, color);
      }
    }

    paletteShift++;
    requestAnimationFrame(main);
  }
  requestAnimationFrame(main);

  function getGradient(canvasId) {
    var canvas = document.getElementById(canvasId);
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    var ctx = canvas.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);

    gradient.addColorStop(0.0, "#0000");
    gradient.addColorStop(0.1, "#ffff00");
    gradient.addColorStop(0.2, "#000000");
    gradient.addColorStop(0.4, "#ff00ff");
    gradient.addColorStop(0.6, "#000000");
    gradient.addColorStop(0.8, "#00ffff");
    gradient.addColorStop(1.0, "#000000");

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
