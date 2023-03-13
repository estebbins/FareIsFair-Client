import { Container, Row, Col, Button, Fade } from 'react-bootstrap'
import { useEffect, useState } from 'react'

const ActiveLiveGame = (props) => {
    const { setShowSetUpModal, isHost, checkResponses, gameSession, question, question_num, users, finalRound, firstPlace, secondPlace } = props
    
    const [players, setPlayers] = useState(props.players)
    const [open, setOpen] = useState(false)

    console.log('open', open)

    useEffect(() => {
        setTimeout(setOpen(true), 2000)
        
    }, [question])

    useEffect(() => {
        setPlayers(props.players)
    },[gameSession])

    console.log('active live gameplayers', players)
    console.log('active live game users', users)

    
    // useEffect(() => {
    //     if(players && users) {
    //         player_scores = players.map((player, i) => {
    //             console.log(player)
    //             let screenname
    //             users.forEach(user => {
    //                 if (user.id === player.player) {
    //                     screenname = user.screenname
    //                 }
    //             })
    //             return (
    //                 <Row key={i}>
    //                     <Col xs={6}>{screenname}</Col>
    //                     <Col xs={3} mb={2}>{player.score}</Col>
    //                 </Row>
    //             )})
    //     }
    // },[players])
    useEffect(()=> {

    }, [players])

    let player_scores
    if(players && players.length > 0 && users) {
        player_scores = players.map((player, i) => {
            console.log(player)
            let screenname
            users.forEach(user => {
                if (user.id === player.player) {
                    screenname = user.screenname
                }
            })
            return (
                <Row>
                    <Col xs={6}>{screenname}</Col>
                    <Col xs={3} mb={2}>{player.score}</Col>
                </Row>
            )})
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
                    {
                        finalRound
                        ?
                        <>
                            <Col xs={15} md={10} id="active-game-area">
                                Text spin to see if you win!
                                The player that gets the closest to $1.00 wins!
                            </Col>
                        </>
                        :
                        null
                    }
                    {
                        question && !finalRound
                        ?
                        <Col xs={15} md={10} id="active-game-area">
                            <Row>
                                <Col md={4}>Timer: </Col>
                                <Col md={4}>Question {question_num}</Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Fade in={open}>
                                    <Col md="auto"><img src={question.image} alt={question.prompt}/></Col>
                                </Fade>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col md="auto">{question.prompt}</Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col md="auto">{question.additional}</Col>
                            </Row>
                        </Col>
                        :
                        <Col>Waiting On Your Question....</Col>
                    }
                </Row>
            </Container>
        </>
    )
}

export default ActiveLiveGame