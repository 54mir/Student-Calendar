import React from 'react'
import axios from 'axios'
import Carousel from 'react-bootstrap/Carousel'
import './index.css'


class Classes extends React.Component {
	constructor(props) {
		super(props)
		this.state = {events: [], loading: true}
	}
	componentDidMount() {
		let options = {
			method: 'GET',
			headers: {"Access-Control-Allow-Origin": "*"},
			url: 'https://cors-anywhere.herokuapp.com/https://calendar.google.com/calendar/ical/supervirtualteacher%40gmail.com/public/basic.ics'
		}
		axios(options)
			.then(res => {
				console.log(res)
				let events = this.getEvents(res.data)
				this.setState({events: events, loading: false})
			})
			.catch(res => {
				console.log(res)
			})
	}
	getEvents(calendarData) {
		let currentTime = new Date()
		let events = this.parseEvents(calendarData)
		events.sort((a, b) => (a.startDateTime > b.startDateTime))
		return events
	}
	parseEvents(calendar) {
		let events = []
		let calendarArr = calendar.split(/\r?\n/)
		console.log(calendarArr)
		for (let i = 0; i < calendarArr.length; i++) {
			if (calendarArr[i].includes("BEGIN:VEVENT")) {
				let e = {}
				while (!calendarArr[i].startsWith("END:VEVENT")) {
					if (calendarArr[i].startsWith("DTSTART")) {
						e['startDateTime'] = this.splitTime(calendarArr[i])
					} else if (calendarArr[i].startsWith("DTEND")) {
						e['endDateTime'] = this.splitTime(calendarArr[i])
					} else if (calendarArr[i].startsWith("SUMMARY")) {
						e['title'] = this.splitSummary(calendarArr[i])
					} else if (calendarArr[i].startsWith("DESCRIPTION")) {
						let joined = ""
						while (!calendarArr[i].startsWith("LAST-MODIFIED:")) {
							joined += calendarArr[i++]
						}
						e['description'] = this.splitDescription(joined)
					}
					i++
				}
				events.push(e)
			}
		}
		return events
	}
	splitTime(rTime) {
		let rawTime = rTime.split(':')
		let dt = rawTime[1].split("T")
		let date = new Date()
		let time = dt[1]
		date.setHours(time.slice(0, 2))
		date.setMinutes(time.slice(2, 4))
		return date
	}
	splitDescription(entry) {
		return entry.slice(12)
	}
	splitSummary(entry) {
		return entry.split(":", 2)[1]
	}
	populateClasses() {
		const { events } = this.state
		if (events.length == 0) {
			return "No Events"
		} else {
			console.log(events)
			return events.map((e, i) => {
				return <Carousel.Item key={i}>
					<div className="">
						<div className="slideshow text-center">
							<div className="slide-header">
								<h1 className="title">{e.title}</h1>
							</div>
							<div className="slide-time">
								<h5 className="d-inline float-left mx-2">Start Time: {String(e.startDateTime)}</h5>
								<h5 className="d-inline float-right mx-2">End Time: {String(e.endDateTime)}</h5>
							</div>
							<div className="slide-description">
								<h3 className="description">
									<div dangerouslySetInnerHTML={{'__html': e.description}} />
								</h3>
							</div>
						</div>
					</div>
				</Carousel.Item>
			})
		}
	}
	render() {
		return <div>
			<div className="container carousel-position">
				<Carousel>
					{this.populateClasses()}
				</Carousel>
			</div>
		</div>
	}
}


class Slide extends React.Component {
	render() {
		console.log('here')
		return <Carousel.Item>
			<div className="w-100 h-100">
				<div className="slideshow text-center">
					<div className="slide-header">
						<h1 className="title">math</h1>
					</div>
					<div className="slide-time">
						<h5 className="d-inline float-left mx-2">Start Time:</h5>
						<h5 className="d-inline float-right mx-2">End Time:</h5>
					</div>
					<div className="slide-description">
						<h3 className="description">Description here</h3>
					</div>
				</div>
			</div>
			{/*
			<Carousel.Caption>
				<h3>Third slide label</h3>
				<p>
					Praesent commodo cursus magna, vel scelerisque nisl consectetur.
				</p>
			</Carousel.Caption>
			*/}
		</Carousel.Item>
	}
}

export default Classes
