var n = 17, m = 20;
var mas = [];
var mas_next = [];
var canvas = null;
var context = null;

var c = 0;
var globalID;

function animate_main_cycle() {
  var start = performance.now();
  var c = 0;
  var prevTime = 0;

  requestAnimationFrame(function checkLoop(time) {
    // определить, сколько прошло времени с начала анимации
    var timePassed = time - start;
    if ((timePassed - prevTime) > 10000) {
	    mas_evolve();
	    animate(5000);
		prevTime = timePassed;
      	requestAnimationFrame(checkLoop);
    }
    // возможно небольшое превышение времени, в этом случае зафиксировать конец
    if (timePassed > 10000) timePassed = 0;

    // если время анимации не закончилось - запланировать ещё кадр
    if (timePassed < 10000) {
      requestAnimationFrame(checkLoop);
    }
  });
};

function draw(cutting) {
	var imageObj = new Image();
	var imageObj2 = new Image();
	var width_step = context.canvas.width / 20;
	var height_step = context.canvas.height / 16.5;
	var canvas2 = document.getElementById('dustCanvas2');
	context2 = canvas2.getContext('2d');
	context2.canvas.width = 992;
	context2.canvas.height = 876;
	imageObj.src = 'images/dust_half.png';
	imageObj2.src = 'images/dust.png';
	var size_multiplier = 1.5;
	var width_seventh = width_step/7;
	var height_nineth = height_step/9;
	var width_multi = width_step / size_multiplier;
	var height_multi = height_step / size_multiplier;

		for (var j = 0; j < n; j++){
			if (j <= cutting) {
				for (var i = 0; i < m; i++){
					switch (mas_next[i][j]) {
						case 1:
							context2.drawImage(imageObj, width_seventh + width_step * i, height_step * j - height_nineth, width_multi, height_multi);				
							break;
						case 2:
							context2.drawImage(imageObj2, width_seventh + width_step * i, height_step * j - height_nineth, width_multi, height_multi);				
							break;
						default:
							break;
					}
				}
			} else {
				for (var i = 0; i < m; i++){
					switch (mas[i][j]) {
						case 1:
							context2.drawImage(imageObj, width_seventh + width_step * i, height_step * j - height_nineth, width_multi, height_multi);				
							break;
						case 2:
							context2.drawImage(imageObj2, width_seventh + width_step * i, height_step * j - height_nineth, width_multi, height_multi);				
							break;
						default:
							break;
					}
				}
			}
		}
	//grab the context from your destination canvas
	destinationCanvas = document.getElementById('dustCanvas');
	var canvas2 = document.getElementById('dustCanvas2');
	var destCtx = destinationCanvas.getContext('2d');

	//call its drawImage() function passing it the source canvas directly
	canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
	destCtx.drawImage(canvas2, 0, 0);
};


function animate(duration) {
  var start = performance.now();
  var c = 0;
  var prevTime = 0;

  requestAnimationFrame(function drawLoop(time) {
    // определить, сколько прошло времени с начала анимации
    var timePassed = time - start;
    if ((timePassed - prevTime) > (((duration) - 2000)) / 17) {
	    c++;
	    if (c < 18) {
	    	draw(c);
		} else {
			cancelAnimationFrame(drawLoop);
		}
		prevTime = timePassed;
    }
    // возможно небольшое превышение времени, в этом случае зафиксировать конец
    if (timePassed > duration) timePassed = duration;

    // нарисовать состояние анимации в момент timePassed
    

    // если время анимации не закончилось - запланировать ещё кадр
    if (timePassed < duration) {
      requestAnimationFrame(drawLoop);
    }

  });
};

function mas_evolve() {
	var prev = mas_next;
	for (var i = 0; i < m; i++){
	    for (var j = 0; j < n; j++){
	        mas[i][j] = evolve(mas_next[i][j],i,j);
		}
	};
	mas_next = mas;
	mas = prev;
}

function evolve(cell, row, column) {
	var westCell, eastCell, northCell, southCell;
	var sum = 0;
	westCell = mas[row][columnCheck(column-1)];
	eastCell = mas[row][columnCheck(column+1)];
	northCell = mas[rowCheck(row-1)][column];
	southCell = mas[rowCheck(row+1)][column];
	
	sum = westCell + eastCell + northCell + southCell;
	switch(cell) {
		case 1:
			switch(sum) {
				case 0:
				case 1:
					return 0;
				case 2:
					return 1;
				case 3:
				case 4:
					return 2;
				default:
					return 0;
			}
		case 2:
			switch(sum) {
				case 0:
				case 1:
					return 0;
				case 2:
				case 3:
					return 1;
				case 4:
					return 2;
				default:
					return 0;
			}		
		default:
			switch(sum) {
				case 0:
				case 1:
				case 4:
					return 0;
				case 2:
				case 3:
					return 1;
				default:
					return 0;
			}

	}
	
}

function rowCheck(row) {
	switch(row) {
		case -1:
			return m-1;
		case m:
			return 0;
		default:
			return row;
	};
}

function columnCheck(column) {
	switch(column) {
		case -1:
			return n-1;
		case n:
			return 0;
		default:
			return column;
	};
}