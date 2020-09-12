let calFileName = "basic.ics";
let calFileURL = "https://cors-anywhere.herokuapp.com/https://calendar.google.com/calendar/ical/supervirtualteacher%40gmail.com/public/basic.ics"

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
let calendarFile = loadFile(calFileURL);

let calendarArr = calendarFile.split("\n");

console.log(calendarArr);

function parseEvents(calendarFile) {


}