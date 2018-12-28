function match(re, string) {

	var regex = new RegExp(re);
   
    return regex.test(string);
}