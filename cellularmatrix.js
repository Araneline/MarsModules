var n = 17, m = 20;
var mas = [];
var mas_next = [];

$( document ).ready(function() {
for (var i = 0; i < m; i++){
    mas[i] = [];
    for (var j = 0; j < n; j++){
        mas[i][j] = Math.floor(Math.random() * (0 - 2) + 2);
}};
var string = '';
for(var i = 0; i < m; i++){
	string += mas[i] + '<br>';
}

for (var i = 0; i < m; i++){
    mas_next[i] = [];
    for (var j = 0; j < n; j++){
        mas_next[i][j] = 0;
}};

for (var i = 0; i < m; i++){
    for (var j = 0; j < n; j++){
        mas_next[i][j] = evolve(mas[i][j],i,j);
}};

var string = '';
for(var i = 0; i < m; i++){
	string += mas_next[i] + '<br>';
}

draw();
setInterval(function(){mas_evolve(); draw();}, 2000);
});

function draw() {
	var canvas = document.getElementById('dustCanvas');
	var context = canvas.getContext('2d');
	var imageObj = new Image();
	var imageObj2 = new Image();
	      
	context.canvas.width = $('#imgMap').width();
	context.canvas.height = $('#imgMap').height();
	var width_step = context.canvas.width / 20;
	var height_step = context.canvas.height / 17;

	imageObj.onload = function() {
		for (var i = 0; i < m; i++){
		    for (var j = 0; j < n; j++){
				if(mas_next[i][j] == 1) {
					context.drawImage(imageObj, width_step * i, height_step * j);				
				}
		}};
	};

	imageObj2.onload = function() {
		for (var i = 0; i < m; i++){
		    for (var j = 0; j < n; j++){
				if(mas_next[i][j] == 2) {
					context.drawImage(imageObj2, width_step * i, height_step * j);				
				}
		}};
	};
	imageObj.src = 'images/dust_half.png';
	imageObj2.src = 'images/dust.png';
}

function mas_evolve() {
	for (var i = 0; i < m; i++){
	    for (var j = 0; j < n; j++){
	        mas[i][j] = evolve(mas_next[i][j],i,j);
		}};
		mas_next = mas;
	console.log(mas_next);
	var string = '';
for(var i = 0; i < m; i++){
	string += mas_next[i] + '<br>';
}

$('#test2').html(string);
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