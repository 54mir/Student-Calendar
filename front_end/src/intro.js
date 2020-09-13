import React from 'react'
import logo from './logo.svg'
import './index.css'
import { Link } from 'react-router-dom'

class Intro extends React.Component {
	componentWillMount() {
		document.getElementById('body').classList.add('bg-teal')
	}
	render() {
		return <div className="text-center intro-text v-center">
			<h1 className="light-blue intro-font">Welcome to <br /> Now This</h1>
			<Link className="btn btn-outline-light" to="/student">For Students</Link>
			<Link className="btn btn-outline-light" to="/teacher" style={{marginLeft: "3.5rem"}}>For Teachers</Link>
		</div>
	}
}

export default Intro
