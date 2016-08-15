function RADIAL(N, radius, cx, cy, rotation, M) {
    if (typeof rotation === "undefined"){ rotation = 0;}
    if (typeof M === "undefined"){ M = 10;}
  	var lines = [];
  	for (var i = 0; i < N; i++) {
      lines.push({'x1': cx + radius  * Math.cos(Math.PI * 2 / N * (i - 1) % N),
                 'y1': cy + radius  * Math.sin(Math.PI * 2 / N * (i - 1) % N),
                 'x2': cx,
                 'y2': cy});
    }
    var web = [];
    for( i = 0; i < N; i++){
      web = web.concat(WEB(lines[i], lines[(i+1)%N], M));
    }
    lines = lines.concat(web);
    lines = ROTATE(lines, rotation, cx, cy);
  	return lines;
}

function RADIAL_RADII(N, radii, cx, cy, rotation, M) {
    if (typeof rotation === "undefined"){ rotation = 0;}
    if (typeof M === "undefined"){ M = 10;}
  	var lines = [];
    if (N != radii.length){ return lines; }
  	for (var i = 0; i < N; i++) {
      lines.push({'x1': cx + radii[i]  * Math.cos(Math.PI * 2 / N * (i - 1) % N),
                 'y1': cy + radii[i]  * Math.sin(Math.PI * 2 / N * (i - 1) % N),
                 'x2': cx,
                 'y2': cy});
    }
    var web = [];
    for( i = 0; i < N; i++){
      web = web.concat(WEB(lines[i], lines[(i+1)%N], M));
    }
    lines = lines.concat(web);
    lines = ROTATE(lines, rotation, cx, cy);
  	return lines;
}

function RADIAL_ANGLE(angles, radius, cx, cy, rotation, M){
  var lines = [];
  if (angles.reduce(function(a,b){ return a+b; }, 0) != 360) { return lines;}
  if (typeof rotation === "undefined"){ rotation = 0;}
  if (typeof M === "undefined"){ M = 10;}
  var sum = 0;
  for (var i = 0; i < angles.length; i++) {
    sum += angles[i];
    lines.push({'x1': cx + radius  * Math.cos(Math.PI * sum / 180),
               'y1': cy + radius  * Math.sin(Math.PI *  sum / 180),
               'x2': cx,
               'y2': cy});
  }
  var web = [];
  for( i = 0; i < angles.length; i++){
    web = web.concat(WEB(lines[i], lines[(i+1)%(angles.length)], M));
  }
  lines = lines.concat(web);
  lines = ROTATE(lines, rotation, cx, cy);
  return lines;
}

function RADIAL_ANGLE_RADII(angles, radii, cx, cy, rotation, M){
  var lines = [];
  if (angles.reduce(function(a,b){ return a+b; }, 0) != 360 || angles.length != radii.length) { return lines;}
  if (typeof rotation === "undefined"){ rotation = 0;}
  if (typeof M === "undefined"){ M = 10;}
  var sum = 0;
  for (var i = 0; i < angles.length; i++) {
    sum += angles[i];
    lines.push({'x1': cx + radii[i]  * Math.cos(Math.PI * sum / 180),
               'y1': cy + radii[i] * Math.sin(Math.PI *  sum / 180),
               'x2': cx,
               'y2': cy});
  }
  var web = [];
  for( i = 0; i < angles.length; i++){
    web = web.concat(WEB(lines[i], lines[(i+1)%(angles.length)], M));
  }
  lines = lines.concat(web);
  lines = ROTATE(lines, rotation, cx, cy);
  return lines;
}

function WEB(line1, line2, M){
  var lines = [];
  for(var i = 0; i < M+1 ; i++){
    lines.push({
      'x1': line1.x1 + i*(line1.x2 - line1.x1)/M,
      'y1': line1.y1 + i*(line1.y2 - line1.y1)/M,
      'x2': line2.x2 + i*(line2.x1 - line2.x2)/M,
      'y2': line2.y2 + i*(line2.y1 - line2.y2)/M
    });
  }
  return lines;
}

function ROTATE(lines, rotation, cx, cy){
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
