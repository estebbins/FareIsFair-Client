import { Container, Row, Col, Button } from 'react-bootstrap'

const ActiveLiveGame = (props) => {
    const { setShowSetUpModal, players, isHost, checkResponses, gameSession, question } = props


    let player_scores
    if(players) {
        player_scores = players.map((player, i) =>{
            return (
                <Row>
                    <Col xs={6}>{/* <p>{player.screenname}</p> */}Hostname</Col>
                    <Col xs={3}>{/* <p>{players.host.score}</p> */}Score</Col>
                </Row>
            )
        })
    }

    return (
        <>
            <Container fluid>
                <Row className="justify-content-md-center">
                    <Col id="active-game-header">
                        <h1>Fare Is Fair!</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={3} md={2} id="active-game-scores" className="align-content-md-center">
                        <Row>
                            <Button onClick={() => setShowSetUpModal(true)}>Instructions</Button>
                        </Row>
                        <Row>
                            <h6>Scores</h6>
                        </Row>
                        {player_scores}
                        { 
                            isHost 
                            ? 
                            <Row>
                                <Button onClick={()=>checkResponses()}>Check Responses</Button>
                            </Row>
                            :
                            null
                        }
                        <Row><small>Sources:</small></Row>
                        <Row>
                            <small><ul className="source-list">
                                <li>Products, Product Images, Descriptions, Price Tags: <a href="www.target.com">Target</a></li>
                                <li>Product API: <a href="www.redcircleapi.com">RedCircle API</a></li>
                                <li>SMS Exchange: <a href="www.twilio.com">Twilio</a></li>
                            </ul></small>
                        </Row>
                    </Col>
                    <Col xs={15} md={10} id="active-game-area">
                        <Row>
                            <Col md={4}>Timer: </Col>
                            <Col md={4}>Question#</Col>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col md="auto"><img src="" alt=""/>Picture</Col>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col md="auto">Product Title</Col>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col md="auto">Product Description</Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        
        </>
    )
}

export default ActiveLiveGame