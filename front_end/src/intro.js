import React from 'react'
import logo from './logo.svg'
import './index.css'

class Intro extends React.Component {
	render() {
		return <div className="bg-teal">
			<div class="text-center intro-text v-center">
				<h1 class="light-blue grandstand-font">Welcome to <br /> Your Classroom</h1>
				<a class="btn btn-outline-light" href="index.html">Sign-up</a>
				<a class="btn btn-outline-light" href="index.html">Sign-in</a>
			</div>
		</div>
	}
}

export default Intro
