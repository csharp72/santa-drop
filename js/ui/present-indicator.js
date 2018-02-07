// TODO

var radius = 75;
      var startAngle = -.5 * Math.PI;
      var endAngle = 1.4 * Math.PI;
      var counterClockwise = false;

      context.beginPath();
      context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
      context.lineWidth = 15;

      // line color
      context.strokeStyle = 'black';
      context.stroke();
