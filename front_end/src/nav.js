import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

class NavigationBar extends React.Component {
	render() {
		return <Navbar bg="light" expand="lg">
			<Navbar.Brand href="/">NowThis</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link href="/classes">Classes</Nav.Link>
						<Nav.Link href="/teacher">Teacher</Nav.Link>
					</Nav>
				</Navbar.Collapse>
		</Navbar>
	}
}

export default NavigationBar
