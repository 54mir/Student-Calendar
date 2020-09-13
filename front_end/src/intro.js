import React from 'react'
import logo from './logo.svg'
import './index.css'

class Intro extends React.Component {
	componentWillMount() {
		document.getElementById('body').classList.add('bg-teal')
	}
	render() {
		return <div className="text-center intro-text v-center">
			<h1 className="light-blue intro-font">Welcome to <br /> Your Classroom</h1>
			<a className="btn btn-outline-light" href="index.html">Sign-up</a>
			<a className="btn btn-outline-light" href="index.html">Sign-in</a>
		</div>
	}
}

export default Intro
