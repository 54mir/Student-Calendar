let calendarFileName = "basic.ics";

function loadFile(filePath) {
	var result = null;
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", filePath, false);
	xhttp.send();
	if (xhttp.status == 200) {
		result = xhttp.responseText;
	}
	return result;
}
let calendarFile = loadFile(calendarFileName);

let calendarArr = calendarFile.split("\n");

console.log(calendarArr);

function parseEvents(calendarFile) {


}