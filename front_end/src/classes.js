import React from 'react'
import axios from 'axios'
import Carousel from 'react-bootstrap/Carousel'
import { parseEvents } from './util'
import moment from 'moment'
import Loader from 'react-loader'
import './index.css'


const MIN5 = 5 * 1000 * 60
const bgClasses = ['index-bg-1', 'index-bg-2']

class Classes extends React.Component {
	constructor(props) {
		super(props)
		this.state = {events: [], loading: true, currentEvent: 0}
		this.timeout = null
		this.moveToCurrent = this.moveToCurrent.bind(this)
	}
	componentWillMount() {
		this.setBg()
	}
	componentDidMount() {
		this.fetchCalendar()
		this.timeout = setInterval(this.fetchCalendar, MIN5)
	}
	componentWillUnmount() {
		clearInterval(this.timeout)
	}
	setBg() {
		let x = Date.now() % 2
		document.getElementById('body').classList.add(bgClasses[x])
	}
	fetchCalendar() {
		let options = {
			method: 'GET',
			headers: {"Access-Control-Allow-Origin": "*"},
			url: 'https://cors-anywhere.herokuapp.com/https://calendar.google.com/calendar/ical/supervirtualteacher%40gmail.com/public/basic.ics'
		}
		axios(options)
			.then(res => {
				console.log(res)
				let events = this.getCalendarEvents(res.data)
				let currentEvent = this.findCurrentEvent(events)
				this.setState({
					events: events,
					loading: false,
					currentEvent: currentEvent
				})
			})
			.catch(res => {
				console.log(res)
			})
	}
	findCurrentEvent(events) {
		let current = null
		for (let i = 0; i < events.length; i += 1) {
			let e = events[i]
			if (moment().isBetween(moment(e.startDateTime), moment(e.endDateTime))) {
				current = i
				break
			}
		}
		return current || events.length - 1
	}
	getCalendarEvents(calendarData) {
		let currentTime = new Date()
		let events = parseEvents(calendarData)
		events = events.sort(function (a, b) {
			return a.startDateTime - b.startDateTime
		})
		return events
	}
	moveToCurrent(e) {
		this.setState({activeEvent: this.state.currentEvent})
	}
	statusBox(startTime, endTime) {

		if (moment().isBefore(moment(startTime))) {
			return <div className="status-current berrio-font">
				This is a future event. <a onClick={this.moveToCurrent}>Click here</a> to go back to current event.
			</div>
		} else if (moment().isAfter(moment(endTime))) {
			return <div className="status-current berrio-font">
				This is a past event. <a onClick={this.moveToCurrent}>Click here</a> to go back to current event.
			</div>
		}
	}
	populateClasses() {
		const { events } = this.state
		if (events.length == 0) {
			return "No Events"
		} else {
			return events.map((e, i) => {
				let startTime = moment(e.startDateTime).format("hh:mm a")
				let endTime = moment(e.endDateTime).format("hh:mm a")
				return <Carousel.Item key={i}>
					<div className="">
						<div className="slideshow text-center">
							{ this.statusBox(e.startDateTime, e.endDateTime) }
							<div className="slide-header">
								<h1 className="title">{e.title}</h1>
							</div>
							<div className="slide-time align-text-middle">
                <div className="time-left">
                  <h5 className="time" id="time-left-text">Start Time: {startTime}</h5>
                </div>
                <div className="time-right">
									<h5 className="time" id="time-right-text">End Time: {endTime}</h5>
                </div>
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
		console.log(this.state)
		const { currentEvent, loading } = this.state
		if (loading) {
			return <Loader />
		} else {
			return <div>
				<div className="container carousel-position">
					<Carousel>
						{this.populateClasses()}
					</Carousel>
				</div>
			</div>
		}
	}
}

export default Classes
