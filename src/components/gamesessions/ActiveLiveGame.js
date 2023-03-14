import { Container, Row, Col, Button } from 'react-bootstrap'
import { useEffect, useState } from 'react'

const ActiveLiveGame = (props) => {
    const { setShowSetUpModal, isHost, checkResponses, gameSession, question, question_num, users, finalRound, firstPlace, secondPlace, firstPlaceSpins, secondPlaceSpins } = props
    
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
                <Row key={i}>
                    <Col xs={6}>{screenname}</Col>
                    <Col xs={3} mb={2}>{player.score}</Col>
                </Row>
            )})
    }

    return (
        <>
            <Container className="mx-auto">
                <Row className="justify-content-md-center">
                    <Col id="active-game-header">
                        <h1>Fare Is Fair!</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={3} md={3} id="active-game-scores" className="d-flex flex-column align-content-center justify-content-center">
                        <Container className='mb-3'>
                            <Button className='w-100 gamebutton' onClick={() => setShowSetUpModal(true)}>Instructions</Button>
                        </Container>
                        <Container>
                            <h6>Scores</h6>
                        </Container>
                        {player_scores}
                        { 
                            isHost 
                            ? 
                            <Container className='mb-3 mt-5'>
                                <Button onClick={()=>checkResponses()} className='w-100 gamebutton'>Check Responses</Button>
                            </Container>
                            :
                            null
                        }
                        <Container><small>Sources:</small></Container>
                        <Container>
                            <small><ul className="source-list">
                                <li>Products, Product Images, Descriptions, Price Tags: <a href="www.target.com"  style={{textDecoration: 'none'}}>Target</a></li>
                                <li>Product API: <a href="www.redcircleapi.com" style={{textDecoration: 'none'}}>RedCircle API</a></li>
                                <li>SMS Exchange: <a href="www.twilio.com" style={{textDecoration: 'none'}}>Twilio</a></li>
                            </ul></small>
                        </Container>
                    </Col>
                    {
                        finalRound
                        ?
                        <>
                            <Col xs={8} md={8} id="active-game-area">
                                Text spin to see if you win!
                                The player that gets the closest to $1.00 wins!
                            </Col>
                        </>
                        :
                        null
                    }
                    <Col xs={1} md={1} style={{padding: '0', marginRight: '-45px'}}>
                    </Col>
                    {
                        question && !finalRound
                        ?
                        <Col xs={8} md={8} id="active-game-area">
                            <Row>
                                <Col md={4} className='timer'>Timer: </Col>
                                <Col md={4} className='text-center question-num'>Question {question_num}</Col>
                            </Row>
                            <Container className="questionarea w-100">
                                <Row className="justify-content-center">
                                    <Col md="auto" className='product-img justify-content-center' style={{backgroundImage: `url(${question.image})`}}>
                                        {/* <img src={question.image} alt={question.prompt} className='product-imgurl'/> */}
                                    </Col>
                                </Row>
                                <Row className="justify-content-center">
                                    <Col md="auto" className='product-prompt justify-content-center text-center'>{question.prompt}</Col>
                                </Row>
                                <Row className="justify-content-center">
                                    <Col md="auto" className='product-additional justify-content-center text-center'>{question.additional}</Col>
                                </Row>
                            </Container>
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