var n = 17, m = 20;
var mas = [];
var mas_next = [];
var canvas = null;
var context = null;

$( document ).ready(function() {
canvas = document.getElementById('dustCanvas');
context = canvas.getContext('2d');
context.canvas.width = $('#imgMap').width();
context.canvas.height = $('#imgMap').height();

for (var i = 0; i < m; i++){ //randomize fiest matrix
    mas[i] = [];
    for (var j = 0; j < n; j++){
        mas[i][j] = Math.floor(Math.random() * (0 - 2) + 2);
}};

for (var i = 0; i < m; i++){ //inititalize second matrix
    mas_next[i] = [];
    for (var j = 0; j < n; j++){
        mas_next[i][j] = 0;
}};

for (var i = 0; i < m; i++){ //evolve 1 matrix into 2nd
    for (var j = 0; j < n; j++){
        mas_next[i][j] = evolve(mas[i][j],i,j);
}};

mas_evolve();
setInterval(function(){mas_evolve();}, 20000);
});

function draw(cutting) {
	var imageObj = new Image();
	var imageObj2 = new Image();
	var width_step = context.canvas.width / 20;
	var height_step = context.canvas.height / 16.5;
	context.clearRect(0, 0, canvas.width, canvas.height);
	imageObj.src = 'images/dust_half.png';
	imageObj2.src = 'images/dust.png';
	var size_multiplier = 1.5;

	imageObj.onload = function() {
		for (var j = 0; j < n; j++){
			if (j <= cutting) {
				for (var i = 0; i < m; i++){
					switch (mas_next[i][j]) {
						case 1:
							context.drawImage(imageObj, (width_step/7) + width_step * i, height_step * j - (height_step/9), width_step / size_multiplier, height_step / size_multiplier);				
							break;
						case 2:
							context.drawImage(imageObj2, (width_step/7) + width_step * i, height_step * j - (height_step/9), width_step / size_multiplier, height_step / size_multiplier);				
							break;
						default:
							break;
					}
				}
			} else {
				for (var i = 0; i < m; i++){
					switch (mas[i][j]) {
						case 1:
							context.drawImage(imageObj, (width_step/7) + width_step * i, height_step * j - (height_step/9), width_step / size_multiplier, height_step / size_multiplier);				
							break;
						case 2:
							context.drawImage(imageObj2, (width_step/7) + width_step * i, height_step * j - (height_step/9), width_step / size_multiplier, height_step / size_multiplier);				
							break;
						default:
							break;
					}
				}
			}
		}
	};

};

function drawLoop (i,c) {          
	setTimeout(function () {   
	c++;
	if(c < m) {
	  	draw(c);          
		if (document.getElementById('dustCanvas').style.opacity == 0.75) {
			document.getElementById('dustCanvas').style.opacity = 1;
		} else {
			document.getElementById('dustCanvas').style.opacity = 0.75;
		}            
	}
	    if (--i) {
	    	drawLoop(i,c);      //  decrement i and call drawLoop again if i > 0
		} else {
			document.getElementById('dustCanvas').style.opacity = 1;
		}
	}, 350)
};                        //  pass the number of iterations as an argument

function mas_evolve() {
	var prev = mas_next;
	for (var i = 0; i < m; i++){
	    for (var j = 0; j < n; j++){
	        mas[i][j] = evolve(mas_next[i][j],i,j);
		}
	};
	mas_next = mas;
	mas = prev;
	drawLoop(20,0);
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