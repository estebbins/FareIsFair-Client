import { Form, Container, Button } from 'react-bootstrap'
// import { gameSessionIndex } from '../../api/gamesession'
import { v4 as uuid } from 'uuid'
import { useEffect, useState } from 'react'

const GameSessionForm = (props) => {
    const { handleChange, handleSubmit } = props 
    // console.log('GS AT FORM', gameSession)
    // let unique_id = uuid()
    // let small_id = unique_id.slice(0,6)
    // const [gameName, setGameName] = useState(null)

    // useEffect(() => {
    //     if(gameSession) {
    //         setGameName(gameSession.session_name)
    //     } else {
    //         setGameName(small_id)
    //     }
    // }, [])
    // console.log('gamename', gameName)

    return(
        <Form onSubmit={handleSubmit}>
            <Form.Group className='m-2'>
                <Form.Control
                    type='hidden'
                    name='is_active'
                    value='false'
                />
            </Form.Group>
            <Form.Group className='m-2'>
                <Form.Label>Name that Game! (5-20 Characters)
                    <p>Players you invite will see this name!</p>
                </Form.Label>
                {
                    props.gameSession
                    ?
                <Form.Control
                    className='edit-form-control'
                    // placeholder='name will be generated randomly if not assigned'
                    name='session_name'
                    minLength={5}
                    maxLength={20}
                    onChange={handleChange}
                    value={props.gameSession.session_name || ''}
                />
                    :
                    <Form.Control
                    className='edit-form-control'
                    name='session_name'
                    minLength={5}
                    maxLength={20}
                    onChange={handleChange}
                />
                }   
            </Form.Group>
            <Container className='d-flex justify-content-end p-0'>
                <Button className='m-2' id='edit-file-submit' type='submit'>Submit</Button>
            </Container>
        </Form>
    )
}

export default GameSessionForm