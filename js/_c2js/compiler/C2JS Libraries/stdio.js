function scanf(type){
	var input = window.prompt();
	if(type == '%i' || type == '%l'){
		input = parseInt(input);
	}else if(type == '%f'){
		input = parseFloat(input);
	}
	return input;
}

