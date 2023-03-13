import { Modal, Row, Col, Button } from 'react-bootstrap'

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
                    <Col xs={6}>{screenname}</Col>
                    <Col xs={3} mb={2}>{ans.response}</Col>
                    <Col xs={3} mb={2}>{ans.delta}</Col>
                </Row>
            )})
        }
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <Row>Correct Answer: {answer}</Row>
                <Row>
                    <Col xs={6}>Player</Col>
                    <Col xs={3} mb={2}>Answer</Col>
                    <Col xs={3} mb={2}>Delta (-1 for invalid guesses)</Col>
                </Row>
                {answers}
            </Modal.Body>
            {
                isHost
                ?
                <Button onClick={()=> startRound()}>Start Next Round</Button>
                :
                null
            }
        </Modal>
    )
}

export default AnswerModal