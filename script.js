let calFileName = "basic.ics";
let calFileURL = "https://cors-anywhere.herokuapp.com/https://calendar.google.com/calendar/ical/supervirtualteacher%40gmail.com/public/basic.ics"
let calendarFile = loadFile(calFileName);

function Event(title, description, startTime, endTime) {
	this.title = title;
	this.description = description;
	this.startDateTime = startTime;
	this.endDateTime = endTime;
	// this.checkDate = function () {
	// 	if (this.startDateTime > this.endDateTime) {
	// 		this.startDateTime.setDate(this.startDateTime.getDate() - 1);
	// 	}
	// }
}

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

function parseEvents(calendar) {
	var events = new Array;
	var calendarArr = calendar.split(/\r?\n/);
	// console.log(calendarArr);
	for (let i = 0; i < calendarArr.length; i++) {
		if (calendarArr[i].includes("BEGIN:VEVENT")) {
			event = new Event;
			while (!calendarArr[i].startsWith("END:VEVENT")) {
				if (calendarArr[i].startsWith("DTSTART")) event.startDateTime = splitTime(calendarArr[i]);
				else if (calendarArr[i].startsWith("DTEND")) event.endDateTime = splitTime(calendarArr[i]);
				else if (calendarArr[i].startsWith("SUMMARY")) event.title = splitSummary(calendarArr[i]);
				else if (calendarArr[i].startsWith("DESCRIPTION")) {
					var joined = calendarArr[i++];
					while (!calendarArr[i].startsWith("LAST-MODIFIED:")) { joined += calendarArr[i++].slice(1); }
					event.description = splitDescription(joined);
				}
				i++;
			}
			events.push(event);
		}
	}
	return events;
}

function splitTime(time) {
	var rawTime = time.split(":");
	var dt = rawTime[1].split("T");
	// var date = dt[0];
	var date = new Date();
	var time = dt[1];
	date.setHours(time.slice(0, 2));
	date.setMinutes(time.slice(2, 4));

	return date;
	// return new Date(date.slice(0, 4), date.slice(4, 6), date.slice(6), time.slice(0, 2), time.slice(2, 4));
	// return new Date(date.getFullYear.toString, date.getMonth.toString, date.getDay.toString, time.slice(0, 2), time.slice(2, 4));
}

function splitDescription(entry) {
	text = entry.slice(12);
	// text = text.replace("\\,", ",");
	return text;
}



function splitSummary(entry) {
	return entry.split(":", 2)[1];
}



function getEvents() {
	currentTime = new Date();
	events = parseEvents(calendarFile);
	events.sort(function (a, b) { return a.startDateTime > b.startDateTime });


	// for (let i = 0; i < events.length; i++) {
	// 	if (events[i].endDateTime < currentTime) continue;
	// 	else {
	// 		return events.slice(i);
	// 	}

	// }

	return events;

}

