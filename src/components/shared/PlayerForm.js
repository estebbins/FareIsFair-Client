import { Form, Button, Container } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { getPlayers } from '../../api/gamesession.js'

//////////// <----This component takes props from AddPlayerModal

const PlayerForm = (props) => {
    const { user, filterValue, handleChange, handleSubmit, handleChoice, triggerRefresh, msgAlert } = props

    // Set list of users matching the filter
    const [userList, setUserList] = useState([])
    // Set the contributor from props
    console.log('filter', filterValue)
    useEffect(() => {
        console.log('useeffect filterValue', filterValue)
        // If there is a filterValue, then get a list of users that matches that filter value
        if (filterValue) {
            getPlayers(user, filterValue)
                .then(res => {
                    console.log('res', res)
                    setUserList(res.data.users)})
                .catch(err => {
                    msgAlert({
                        heading: 'Error!',
                        message: 'Error finding users!',
                        variant: 'danger'
                    })
                })
        }
    }, [filterValue])

    // useEffect(() => {
    //     // Refresh form if contributor changes
    //     // console.log('useeffect contributor(form)', contributor)
    //     // setContributor(contributor)
    // }, [contributor])

    const filteredUsers = userList.map((user, i) => (
        <option value={user._id} key={i}>{user.email}</option>
    ))

    return (
        <Container className='justify-content-center'>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='m-2'>
                    <Form.Label>Search for Players</Form.Label>
                    <Form.Control 
                        placeholder="What is the user's e-mail"
                        name='filterValue'
                        id='filterValue'
                        // value={filterValue || ''}
                        onChange={handleChange}
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
                            { filteredUsers }
                        </Form.Select>
                    }
                </Form.Group>
                <Form.Group className='m-2'>
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
                            { filteredUsers }
                        </Form.Select>
                    }
                </Form.Group>
                <Form.Group className='m-2'>
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
                            { filteredUsers }
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