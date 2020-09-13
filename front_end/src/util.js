export function parseEvents(calendar) {
	let events = []
	let calendarArr = calendar.split(/\r?\n/)
	for (let i = 0; i < calendarArr.length; i++) {
		if (calendarArr[i].includes("BEGIN:VEVENT")) {
			let e = {}
			while (!calendarArr[i].startsWith("END:VEVENT")) {
				if (calendarArr[i].startsWith("DTSTART")) {
					e['startDateTime'] = splitTime(calendarArr[i])
				} else if (calendarArr[i].startsWith("DTEND")) {
					e['endDateTime'] = splitTime(calendarArr[i])
				} else if (calendarArr[i].startsWith("SUMMARY")) {
					e['title'] = splitSummary(calendarArr[i])
				} else if (calendarArr[i].startsWith("DESCRIPTION")) {
					let joined = calendarArr[i++]
					while (!calendarArr[i].startsWith("LAST-MODIFIED:")) {
						joined += calendarArr[i++].slice(1)
					}
					e['description'] = splitDescription(joined)
				}
				i++
			}
			events.push(e)
		}
	}
	return events
}

export function splitTime(rTime) {
	let rawTime = rTime.split(':')
	let dt = rawTime[1].split("T")
	let date = new Date()
	let time = dt[1]
	date.setHours(time.slice(0, 2))
	date.setMinutes(time.slice(2, 4))
	return date
}

export function splitDescription(entry) {
	let text = entry.slice(12)
	text = text.replace("\\,", ",")
	return text 
}
export function splitSummary(entry) {
	return entry.split(":", 2)[1]
}
