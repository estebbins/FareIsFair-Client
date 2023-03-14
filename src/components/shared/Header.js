import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    margin: '.0 .25rem',
    paddingTop: '0.5rem!important',
    paddingBottom: '0.5rem',

}
const authenticatedOptions = (
	<>
		<Nav.Item>
			<Link to='change-password' style={linkStyle} className='navheader-link'>
				Change Password
			</Link>
		</Nav.Item>
		<Nav.Item>
			<Link to='sign-out' style={linkStyle} className='navheader-link'>
				Sign Out
			</Link>
		</Nav.Item>
	</>
)

const unauthenticatedOptions = (
	<>
        <Nav.Item>
		    <Link to='sign-up' style={linkStyle} className='navheader-link'>Sign Up</Link>
        </Nav.Item>
        <Nav.Item>
		    <Link to='sign-in' style={linkStyle} className='navheader-link'>Sign In</Link>
        </Nav.Item>
	</>
)

const alwaysOptions = (
	<>
		<Nav.Item>
			<Link to='/' style={linkStyle} className='navheader-link'>
				Home
			</Link>
		</Nav.Item>
	</>
)

const Header = ({ user }) => (
	<Navbar className='navheader' variant='dark' expand='md'>
		<Navbar.Brand>
            <Link to='/' className='logoheader' style={linkStyle}>
                Fare Is Fair
            </Link>
            {/* <img src='https://cdn.pixabay.com/photo/2022/04/11/16/14/cat-7126130_960_720.png' alt='scraggly party cat' className='headercat'/> */}
        </Navbar.Brand>
		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Navbar.Collapse id='basic-navbar-nav'>
			<Nav className='ms-auto me-2 d-flex align-items-center'>
				{user && (
					<span className='navbar-text me-2'>Welcome, {user.screenname}</span>
				)}
				{alwaysOptions}
				{user ? authenticatedOptions : unauthenticatedOptions}
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)

export default Header
