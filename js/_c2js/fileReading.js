window.onload = function() {
	uploadProcess();
}

function uploadProcess(){
	var fileInput = document.getElementById('uploadBtn');
	var fileDisplayArea = document.getElementById('codeArea');
	var fileResultDisplayArea = document.getElementById('resultArea');


	fileDisplayArea.value = '';
	fileResultDisplayArea.value = '';
	document.getElementById("uploadFile").value = '';
	$('#warning').html('Please <a class="page-scroll" href="#page-top" onclick="uploadProcess()">Upload</a> Your C File First!');
	$('#convert').attr("disabled", true);

	fileInput.onclick = function () {
    	this.value = null;
	};

	fileInput.addEventListener('change', function(e) {
		var ind = 0;
		var files = [];

		while(fileInput.files[ind]){
			if(matchFileType(fileInput.files[ind])){
				files[ind] = fileInput.files[ind];
				ind++;
			}else{
				//fileResultDisplayArea.innerText = "File not supported!";
				alert("'"+fileInput.files[ind].name + "' file is not supported!");
				$('#convert').attr("disabled", true);
				return;
			}
		}
		var filesname = '';
		for (var i=0;i<files.length;i++){ 
			readFiles(files[i]);
			filesname += files[i].name + ', '; 
		}

        if (files.length>0){
        	document.getElementById("uploadFile").value = filesname;
        	$('#warning').html('Code from ' + filesname + '  uploaded! <a class="page-scroll" href="#page-top" onclick="uploadProcess()"> Upload New!</a>');
			//$.scrollTo('#editor',500);
			$('html, body').animate({
				scrollTop: $("#editor").offset().top
			}, 2000);
            $('#convert').attr("disabled", false);
        }

	});
}


/* Pass file Object */
function matchFileType(file){
	return file.name.substring(file.name.lastIndexOf(".")+1) == 'C' || 
	       file.name.substring(file.name.lastIndexOf(".")+1) == 'c' || 
	       file.name.substring(file.name.lastIndexOf(".")+1) == 'H' || 
	       file.name.substring(file.name.lastIndexOf(".")+1) == 'h'
	       ;
}

/* Pass file Object */
function readFiles(file) {
    var name = file.name;
    var reader = new FileReader();  
    reader.onload = function(e) {  
        // get file content  
        var text = e.target.result;
        var fileDisplayArea = document.getElementById('codeArea');
        //fileDisplayArea.innerHTML += "<b>File: "+file.name+"</b><br>";
        //fileDisplayArea.innerHTML += reader.result;
        //fileDisplayArea.innerHTML += "<hr>";
        fileDisplayArea.value = text;
        $.scrollTo('#editor',500);
    }
    reader.readAsText(file, "UTF-8");
}