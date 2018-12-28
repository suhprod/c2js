
function isalnum(ch){
	return (isdigit(ch) || isalpha(ch));
}

function isalpha(ch){
	charCode = ch.charCodeAt(0);
	if(((charCode > 64) && (charCode <  91)) ||
	((charCode > 96) && (charCode < 123))){
		return true;
	}
	return false;
}

function iscntrl(ch){
}

function isdigit(ch){
	charCode = ch.charCodeAt(0);
    if((charCode > 47) && (charCode <  58)){
        return true;
    }
    return false;
}

function isgraph(ch){
	charCode = ch.charCodeAt(0);
    if((charCode > 32) && (charCode <  127)){
         return true;
    }
	return false;
}

function isprint(ch){
	charCode = ch.charCodeAt(0);
    if((charCode > 31) && (charCode <  127)){
         return true;
    }
	return false;
}

function islower(ch){
	charCode = ch.charCodeAt(0);
	if((charCode > 96) && (charCode < 123)){
	    return true;
	}
	return false;
}

function tolower(ch){
	charCode = ch.charCodeAt(0);
	if((charCode > 96) && (charCode < 123)){
	    ch.charCodeAt(0) = charCode - 32;
	}
	return ch;
}

function isupper(ch){
	charCode = ch.charCodeAt(0);
	if((charCode > 64) && (charCode < 91)){
	    return true;
	}
	return false;
}

function toupper(ch){
	charCode = ch.charCodeAt(0);
	if((charCode > 64) && (charCode < 91)){
	    ch.charCodeAt(0) = charCode - 32;
	}
	return ch;
}

function isspace(ch){
	charCode = ch.charCodeAt(0);
	if((charCode == 32)){
	    return true;
	}
	return false;
}


function ispunct(ch){
	return (isgraph(ch) && !(isalnum(ch)));
}


function isA2F(ch){
  charCode = ch.charCodeAt(0);
  if(((charCode > 64) && (charCode <  71)) ||
     ((charCode > 96) && (charCode < 103))){
    	return true;
  }
	return false;
}

function isxdigit(ch){
    return (isdigit(ch) || isA2F(ch));
}