import React from 'react'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';
import './teacher.css'

class Teacher extends React.Component {
	constructor(props) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	componentWillMount() {
		document.getElementById('body').classList.add('bg-body')
	}
	handleSubmit(e) {
		e.preventDefault()
		alert('Successful!')
	}
	render() {
		return <div className="content">
			<div className="header">
				<h1 className="t-title">Welcome Teachers!</h1>
				<h2 className="t-subtitle">Add your class calendar and a list of your students’ email addresses</h2>
			</div>
			<div className="form container">
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label htmlFor="publicCalendar">Link to your public calendar (ical):</label>
						<input type="email" className="form-control" id="publicCalendar" aria-describedby="emailHelp" placeholder="Enter email" />
					</div>
					<h5 className="text-center">- or -</h5>
					<a href="/">
						<img src="./google_calendar.png" className="google-calendar d-block mx-auto" />
					</a>
					<div className="form-group">
						<label htmlFor="studentEmails">Student Email Addresses</label>
						<CreatableSelect
							isMulti
							onChange={this.handleChange}
							options={[]}
						/>
					</div>
					<div className="form-group">
						<div className="text-center">
							<button type="submit" className="btn btn-teal">Submit</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	}
}

export default Teacher
