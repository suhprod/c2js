
function abort(){
	throw new Error('Program aborted');
}

function abs(num){
	return Math.abs(num);
}


function labs(num){
	return Math.abs(num);
}



function atexit(funcName){

	object.onunload = function(){ 
		funcName(); 
	};
}

function exit(){
	throw new Error('Program exited');
}

function atof(str){
	return parseFloat(str);
}

function atoi(str){
	return parseInt(str);
}


function atol(str){
	return parseInt(str);
}


function div(nume, denom){
	var div = Math.floor(nume/denom);
	var rem = nume % denom;
	var result = {divisionResult:div, remainderResult:rem};
	return result;
}


function ldiv(nume, denom){
	var div = Math.floor(nume/denom);
	var rem = nume % denom;
	var result = {divisionResult:div, remainderResult:rem};
	return result;
}

function rand(){
	return Math.random() * 4294967295;
}

function qsort(arr){
	return arr.sort();
}
