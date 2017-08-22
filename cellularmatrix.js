var mas = [];
var mas_next = [];
var canvas = null;
var context = null;
function animate_main_cycle() {
  var start = performance.now();
  var prevTime = 0;
  var prevTime2 = 0;

  requestAnimationFrame(function checkLoop(time) {
    // определить, сколько прошло времени с начала анимации
    var timePassed = time - start;
    var timeTillMaas = time - start;
    if ((timePassed - prevTime) > 30000) {
	    mas_evolve();
	    animate(10000);
		prevTime = timePassed;
      	requestAnimationFrame(checkLoop);
    }
    if ((timeTillMaas - prevTime2) > 3600000) {
    	CheckMaas();
    	prevTime2 = timeTillMaas;
    }
    // если время анимации не закончилось - запланировать ещё кадр
    if ((timePassed - prevTime) < 10000) {
      requestAnimationFrame(checkLoop);
    }
  });
};

function draw(cutting) {
	var imageObj = new Image();
	var imageObj2 = new Image();
	var width_step = context.canvas.width / 20;
	var height_step = context.canvas.height / 16.5;
	imageObj.src = 'images/dust_half.png';
	imageObj2.src = 'images/dust.png';
	var width_seventh = width_step/7;
	var height_nineth = height_step/9;
	var width_multi = width_step / 1.5;
	var height_multi = height_step / 1.5;

				for (var i = 0; i < 20; i++){
							context.clearRect(width_seventh + width_step * i, height_step * cutting - height_nineth, width_multi, height_multi);
					switch (mas_next[i][cutting]) {
						case 1:
							context.drawImage(imageObj, width_seventh + width_step * i, height_step * cutting - height_nineth, width_multi, height_multi);				
							break;
						case 2:
							context.drawImage(imageObj2, width_seventh + width_step * i, height_step * cutting - height_nineth, width_multi, height_multi);				
							break;
						default:
							break;
					}
				}
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
    // если время анимации не закончилось - запланировать ещё кадр
    if (timePassed < duration) {
      requestAnimationFrame(drawLoop);
    }

  });
};

function mas_evolve() {
	var prev = mas_next;
	for (var i = 0; i < 20; i++){
	    for (var j = 0; j < 17; j++){
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
			return 19;
		case 20:
			return 0;
		default:
			return row;
	};
}

function columnCheck(column) {
	switch(column) {
		case -1:
			return 16;
		case 17:
			return 0;
		default:
			return column;
	};
}