import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Intro from './intro'
import Classes from './classes'
import Teacher from './teacher'
import Nav from './nav'

class App extends React.Component {
	render() {
		let account = ""
		return <Router>
			<Nav account={account}/>
			<Switch>
				<Route exact path='/'>
					<Intro />
				</Route>
				<Route exact path='/classes'>
					<Classes />
				</Route>
				<Route exact path='/teacher' >
					<Teacher />
				</Route>
			</Switch>
		</Router>
	}
}

export default App
