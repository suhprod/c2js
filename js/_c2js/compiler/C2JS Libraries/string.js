
function strcat(str1, str2){
	return str1 + str2;
}


function strncat(str1, str2, len){
	str1 = str1.substring(0, len);
	str2 = str2.substring(0, len);
	return str1 + str2;
}


function strcmp(str1,str2){
	return ( ( str1 == str2 ) ? 0 : ( ( str1 > str2 ) ? 1 : -1 ) );
}

function strncmp(str1,str2, len){
	str1 = str1.substring(0, len);
	str2 = str2.substring(0, len);
  	return ( ( str1 == str2 ) ? 0 : (( str1 > str2 ) ? 1 : -1 ));
}

function strlen(str){
	return str.length;
}

function strcpy(str1, str2){
	str1 =  str1 + str2;
	return str1;
}

function strncpy(str1, str2, len){
	str1 = str1.substring(0, len);
	str2 = str2.substring(0, len);
	str1 =  str1 + str2;
	return str1;
}

function strrchr(str, ch){
	return str.lastIndexOf(ch);
}