let calFileName = "basic.ics";
let calFileURL = "https://cors-anywhere.herokuapp.com/https://calendar.google.com/calendar/ical/supervirtualteacher%40gmail.com/public/basic.ics"
let calendarFile = loadFile(calFileName);

function Event(title, description, startTime, endTime) {
	this.title = title;
	this.description = description;
	this.startDateTime = startTime;
	this.endDateTime = endTime;
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
	let calendarArr = calendar.split("\n");

	for (let i = 0; i < calendar.length; i++) {
		if (calendar[i] = "BEGIN:VEVENT") {
			event = new Event;
			while (calendar[i] != "END:VEVENT") {
				if (calendar[i].search("DTSTART" == 0)) event.startDateTime = splitTime(calendar[i]);
				if (calendar[i].search("DTEND" == 0)) event.endDateTime = splitTime(calendar[i]);
				if (calendar[i].search("DESCRIPTION" == 0)) event.description = splitStandard(calendar[i]);
				if (calendar[i].search("SUMMARY" == 0)) event.title = splitStandard(calendar[i]);
				i++;
			}
		}
	}
	return calendarArr;
}

function splitTime(time) {
	console.log(time);
	var rawTime = time.split(":");
	var dt = rawTime[1].split("T");
	var date = dt[0];
	var time = dt[1];

	let d = new Date(date.slice(0, 4), date.slice(4, 6), date.slice(6), time(0, 2), time(2, 4));
	console.log(d);
	return d;
}





// BEGIN: VEVENT
// DTSTART; TZID = America / Chicago: 20200912T150000
// DTEND; TZID = America / Chicago: 20200912T163000
// RRULE: FREQ = WEEKLY; WKST = SU; BYDAY = MO, SA, TH, TU, WE
// DTSTAMP: 20200912T035058Z
// UID: 1fs62vn9gf2shp6ifrr0eq9bgm@google.com
// CREATED: 20200912T033135Z
// DESCRIPTION: Spend this time however you choose! Playing\, spending time wit
// h family\, going outside\, catching up on your shows\, exercising\, helping
// out around the house\, napping\, etc!
// LAST - MODIFIED: 20200912T033526Z
// LOCATION:
// SEQUENCE: 1
// STATUS: CONFIRMED
// SUMMARY: Choice Time
// TRANSP: OPAQUE
// END: VEVENT

console.log(parseEvents(calendarFile));