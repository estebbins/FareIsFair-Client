import { Form, Button, Container } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { getPlayers } from '../../api/gamesession.js'

//////////// <----This component takes props from AddPlayerModal

const PlayerForm = (props) => {
    const { user, filterValueOne, filterValueTwo, filterValueThree, handleChangeOne, handleChangeTwo, handleChangeThree, handleSubmit, handleChoice, msgAlert } = props

    // Set list of users matching the filter
    const [userListOne, setUserListOne] = useState([])
    const [userListTwo, setUserListTwo] = useState([])
    const [userListThree, setUserListThree] = useState([])
    // Set the contributor from props
    console.log('filter', filterValueOne)
    useEffect(() => {
        console.log('useeffect filterValue', filterValueOne)
        // If there is a filterValue, then get a list of users that matches that filter value
        if (filterValueOne) {
            getPlayers(user, filterValueOne)
                .then(res => {
                    console.log('res', res)
                    setUserListOne(res.data.users)})
                .catch(err => {
                    msgAlert({
                        heading: 'Error!',
                        message: 'Error finding users!',
                        variant: 'danger'
                    })
                })
        }
    }, [filterValueOne])

    useEffect(() => {
        console.log('useeffect filterValue', filterValueTwo)
        // If there is a filterValue, then get a list of users that matches that filter value
        if (filterValueTwo) {
            getPlayers(user, filterValueTwo)
                .then(res => {
                    console.log('res', res)
                    setUserListTwo(res.data.users)})
                .catch(err => {
                    msgAlert({
                        heading: 'Error!',
                        message: 'Error finding users!',
                        variant: 'danger'
                    })
                })
        }
    }, [filterValueTwo])

    useEffect(() => {
        console.log('useeffect filterValue', filterValueThree)
        // If there is a filterValue, then get a list of users that matches that filter value
        if (filterValueThree) {
            getPlayers(user, filterValueThree)
                .then(res => {
                    console.log('res', res)
                    setUserListThree(res.data.users)})
                .catch(err => {
                    msgAlert({
                        heading: 'Error!',
                        message: 'Error finding users!',
                        variant: 'danger'
                    })
                })
        }
    }, [filterValueThree])


    const filteredUsersOne = userListOne.map((user, i) => (
        <option value={user._id} key={i}>{user.email}</option>
    ))
    const filteredUsersTwo = userListTwo.map((user, i) => (
        <option value={user._id} key={i}>{user.email}</option>
    ))
    const filteredUsersThree = userListThree.map((user, i) => (
        <option value={user._id} key={i}>{user.email}</option>
    ))

    return (
        <Container className='justify-content-center'>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='m-2'>
                    <Form.Label>Search for Players</Form.Label>
                    <Form.Control 
                        placeholder="What is the user's e-mail"
                        name='filterValueOne'
                        id='filterValueOne'
                        value={filterValueOne || ''}
                        onChange={handleChangeOne}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Label>Player One</Form.Label>
                    { props.player ? 
                        <></>
                        // <Form.Select 
                        //     className='auth-form-control'
                        //     aria-label='email'
                        //     name='userRef'
                        //     defaultValue={props.contributor.email}
                        //     onChange={handleChoice}
                        // >
                        //     <option>Open this select menu</option>
                        //     { filteredUsers }
                        // </Form.Select>
                        :
                        <Form.Select
                            className='auth-form-control'
                            aria-label='email'
                            name='player_one'
                            onChange={handleChoice}
                        >
                            <option>Open this select menu</option>
                            { filteredUsersOne }
                        </Form.Select>
                    }
                </Form.Group>
                <Form.Group className='m-2'>
                <Form.Group className='m-2'>
                    <Form.Label>Search for Players</Form.Label>
                    <Form.Control 
                        placeholder="What is the user's e-mail"
                        name='filterValueTwo'
                        id='filterValueTwo'
                        value={filterValueTwo || ''}
                        onChange={handleChangeTwo}
                    />
                </Form.Group>
                    <Form.Label>Player Two</Form.Label>
                    { props.player ? 
                        <></>
                        // <Form.Select 
                        //     className='auth-form-control'
                        //     aria-label='email'
                        //     name='userRef'
                        //     defaultValue={props.contributor.email}
                        //     onChange={handleChoice}
                        // >
                        //     <option>Open this select menu</option>
                        //     { filteredUsers }
                        // </Form.Select>
                        :
                        <Form.Select
                            className='auth-form-control'
                            aria-label='email'
                            name='player_two'
                            onChange={handleChoice}
                        >
                            <option>Open this select menu</option>
                            { filteredUsersTwo }
                        </Form.Select>
                    }
                </Form.Group>
                <Form.Group className='m-2'>
                <Form.Group className='m-2'>
                    <Form.Label>Search for Players</Form.Label>
                    <Form.Control 
                        placeholder="What is the user's e-mail"
                        name='filterValueThree'
                        id='filterValueThree'
                        value={filterValueThree || ''}
                        onChange={handleChangeThree}
                    />
                </Form.Group>
                    <Form.Label>Player Three</Form.Label>
                    { props.player ? 
                        <></>
                        // <Form.Select 
                        //     className='auth-form-control'
                        //     aria-label='email'
                        //     name='userRef'
                        //     defaultValue={props.contributor.email}
                        //     onChange={handleChoice}
                        // >
                        //     <option>Open this select menu</option>
                        //     { filteredUsers }
                        // </Form.Select>
                        :
                        <Form.Select
                            className='auth-form-control'
                            aria-label='email'
                            name='player_three'
                            onChange={handleChoice}
                        >
                            <option>Open this select menu</option>
                            { filteredUsersThree }
                        </Form.Select>
                    }
                </Form.Group>
                <Container className='d-flex justify-content-end p-0'>
                    <Button className='m-2' type='submit'>Submit</Button>
                </Container>
            </Form>
        </Container>
    )
}

export default PlayerForm