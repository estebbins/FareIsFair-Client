import { Form, Container, Button } from 'react-bootstrap'

const GameSessionForm = (props) => {
    const { handleChange, handleSubmit } = props

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
                <Form.Label>Session Password(5-10 Characters)
                    <p>You will need to share this with participants</p>
                </Form.Label>
                <Form.Control
                    className='edit-form-control'
                    placeholder='password'
                    name='session_password'
                    minLength={5}
                    maxLength={10}
                    onChange={handleChange}
                />
            </Form.Group>
            <Container className='d-flex justify-content-end p-0'>
                <Button className='m-2' id='edit-file-submit' type='submit'>Submit</Button>
            </Container>
        </Form>
    )
}

export default GameSessionForm