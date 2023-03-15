import { Modal, Row, Col, Button, Container } from 'react-bootstrap'

const AnswerModal = (props) => {
    const { show, handleClose, responses, users, startRound, isHost, answer } = props

    let answers
    if(responses && users) {
        let screenname
        answers = responses.map((ans, i) => {
            users.forEach(user => {
                if (user.id === ans.player) {
                    screenname = user.screenname
                }
            })
            return (
                <Row key={i}>
                    <Col xs={4}>{screenname}</Col>
                    <Col xs={3} mb={2}>{ans.response}</Col>
                    <Col xs={3} mb={2}>{ans.delta}</Col>
                </Row>
            )})
        }
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body >
                <Row className='text-center w-75' style={{fontSize: '30px', marginLeft:'30px', color: '#A32CC4'}}>Correct Answer: {answer}</Row>
                <hr></hr>
                <Container style={{fontSize: '20px'}}>
                    <Row>
                        <Col xs={4}>Player</Col>
                        <Col xs={3} mb={2}>Answer</Col>
                        <Col xs={3} mb={2}>Delta (-1 for invalid guesses)</Col>
                    </Row>
                    <hr></hr>
                {answers}
                </Container>
            </Modal.Body>
            {
                isHost
                ?
                <Button className='create' onClick={()=> startRound()}>Start Next Round</Button>
                :
                null
            }
        </Modal>
    )
}

export default AnswerModal