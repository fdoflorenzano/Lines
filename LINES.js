function LINES(N, radius, cx, cy, rotation = 0, M = 10) {
  	var lines = [];
  	for (var i = 0; i < N; i++) {
    	for (var j = 0; j < M; j++) {
      	lines.push({'x1': cx + radius * j / M * Math.cos(Math.PI * 2 / N * (i - 1) % N),
                 'y1': cy + radius * j / M * Math.sin(Math.PI * 2 / N * (i - 1) % N),
                 'x2': cx + radius * Math.cos(Math.PI * 2 * i / N) - radius * j / M * Math.cos(Math.PI * 2 * i / N),
                 'y2': cy + radius * Math.sin(Math.PI * 2 * i / N) - radius * j / M * Math.sin(Math.PI * 2 * i / N)});
      }
    }
    lines.forEach(function(line){
      var x1 = (line.x1-cx)*Math.cos(Math.PI*rotation/180) - (line.y1-cy)*Math.sin(Math.PI*rotation/180);
      var y1 = (line.x1-cx)*Math.sin(Math.PI*rotation/180) + (line.y1-cy)*Math.cos(Math.PI*rotation/180);
      var x2 = (line.x2-cx)*Math.cos(Math.PI*rotation/180) - (line.y2-cy)*Math.sin(Math.PI*rotation/180);
      var y2 = (line.x2-cx)*Math.sin(Math.PI*rotation/180) + (line.y2-cy)*Math.cos(Math.PI*rotation/180);
      line.x1 = cx + x1;
      line.x2 = cx + x2;
      line.y1 = cy + y1;
      line.y2 = cy + y2;
    });
  	return lines;
}
