(function (canvasId) {
  // setup canvas
  var canvas = document.getElementById(canvasId);
  canvas.width = window.innerWidth; // canvas.clientWidth;
  canvas.height = window.innerHeight; // canvas.clientHeight;
  var ctx = canvas.getContext('2d');

  var size = 10;

  let color = [255, 32, 255];

  for (let i = 0; i < 100; i++) {
    draw(i, 5, color.map(c => Math.round(i * c % 255)));
  }

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

      let color = [
        0,
        v,
        0
      ];

      draw(x, y, color);
    }
  }

})('plasma');


/*

int main(int argc, char *argv[])
{
  screen(256, 256, 0, "Plasma");

  for(int y = 0; y < h; y++)
  for(int x = 0; x < w; x++)
  {
    int color = int
    (
        128.0 + (128.0 * sin(x / 8.0))
      + 128.0 + (128.0 * sin(y / 8.0))
    ) / 2;
    pset(x, y, ColorRGB(color, color, color));
  }
  redraw();
  sleep();
  return(0);
}

*/