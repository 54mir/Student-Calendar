import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'

class NavigationBar extends React.Component {
	constructor(props) {
		super(props)
		this.state = {showModal: false}
		this.toggleModal = this.toggleModal.bind(this)
	}
	messageTeacher() {
		const { location } = this.props
		if (location && location.pathname == "/classes") {
			return <button
				class="btn btn-outline-teal my-2 my-sm-0 mr-2"
				data-toggle="modal"
				data-target="#messageTeacher"
				type="button"
				onClick={this.toggleModal.bind(this)}
			>
				Message Teacher
			</button>
		}
	}
	toggleModal() {
		const { showModal } = this.state
		this.setState({showModal: !showModal})
	}
	showLogout() {
		const { location } = this.props
		if (location && location.pathname !== "/") {
			return <Nav className="justify-content-end">
				<Nav.Link href="/">Log Out</Nav.Link>
			</Nav>
		}
	}
	showTeacher() {
		const { location } = this.props
		if (location && location.pathname.split('/').length < 3) {
			return <Nav.Link href="/classes">Classes</Nav.Link>
		} else {
			return <Nav.Link href="/teacher">Teacher</Nav.Link>
		}
	}
	render() {
		const { showModal } = this.state
		return <React.Fragment>
			<Navbar bg="light" expand="lg" className="nav-bg">
				<Navbar.Brand href="/">NowThis</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						{this.messageTeacher()}
						{this.showTeacher()}
						{this.showLogout()}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
			<Modal show={showModal} onHide={this.toggleModal}>
				<Modal.Header closeButton>
					<Modal.Title>Modal Send Your Teacher a Message</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<label htmlFor="formControlteacherMessage">Type your message below:</label>
					<textarea class="form-control" id="formControlteacherMessage" rows="3"></textarea>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={this.toggleModal}>
						Close
					</Button>
					<Button variant="teal" onClick={this.toggleModal}>
						Send
					</Button>
				</Modal.Footer>
			</Modal>
		</React.Fragment>
	}
}

export default withRouter(NavigationBar)
