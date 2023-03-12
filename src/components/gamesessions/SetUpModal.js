import { Modal, Button } from 'react-bootstrap'

const SetUpModal = (props) => {
    const { show, handleClose, isHost, gameSession, startGame } = props
    return (
        <>
            <Modal show={show} onHide={handleClose} fullscreen>
                <Modal.Header closeButton>
                    <Modal.Title>Set Up & Instructions</Modal.Title>
                    <span style={{marginLeft: "3px"}}>(This screen can be accessed anytime in between questions)</span>
                </Modal.Header>
                <Modal.Body>
                    { 
                        isHost 
                        ? 
                        <>
                            <h4>Thank You for hosting a Fare Is Fair Game Session!!</h4>
                            <h3>Host Instructions</h3>
                            <p>Ensure all the players know the Game ID <strong>{gameSession.session_code}</strong> and the password that you set up <strong>{gameSession.session_password}</strong> if they are watching from their devices</p>
                            <p>Once all the players understand the rules and are able to view the questions, click the Start button below</p>
                            <p>Responses will be checked at the half-way point and when the timer reaches zero, or the host can check for responses by clicking the Check Responses button on the gameplay screen</p>
                            <p>If all the responses are received before the end of the timer, the timer will end, responses will be scored, and the host can proceed to the next question</p>
                            <p><strong>Once you click Start, this window will close and the timer will start for the first question</strong></p>
                        </>
                        :
                        null
                    }
                    <h2>Gameplay</h2>
                    <p><strong>Important! Read Carefully!</strong></p>
                    <p><strong>By participating in this game, you agree to any charges incurred from your mobile provider or data used to play this game</strong></p>
                        <ul>
                            <li>Gameplay consists of 2 rounds of questions for all players to answer, and a final round for the top 2 players</li>
                            <li>When the host begins the game, players will see the name, image, and a short description of a product</li>
                            <li>Players guess the regular price of the product. The prices can range anywhere from $1 to $10000. The player(s) that guess the price closest to the correct answer <strong>without going over</strong>, will receive 100 points</li>
                            <li>Players will have <strong>45 seconds</strong> from the time the question begins to text their response to <strong>+1 (844) 238-4011</strong> (enter or save this number to your phone now!)</li>
                            <li>You will NOT receive a text message to confirm your response or participation in the game - please be sure you have the correct phone number!</li>
                            <li>The 2 players with the highest scores will go to the final round. In the event of a 3 or 4 way tie, the players selected to go to the final round will be chosen randomly.</li>
                            <li>Answers not received in the alloted time will not be accepted, and may be recorded as the answer to the next question - make sure to pay attention to the timer!</li>
                            <li>Anwser formats accepted, for example: <strong style={{backgroundColor: "blue", color: "white", borderRadius: "5px", margin: "2px", padding: "2px"}}>100</strong> or <strong style={{backgroundColor: "blue", color: "white", borderRadius: "5px", margin: "2px", padding: "2px"}}>3.89</strong> or<pre style={{overflow: "auto"}}><strong style={{backgroundColor: "blue", color: "white", borderRadius: "5px", margin: "2px", padding: "2px"}}> 3.89 </strong>(with spaces before or after)</pre></li>
                            <li>Answers received with any additional characters (ABCabc), punctuation, including commas and dollar signs (! ? @ , $, etc), or spaces in between numbers (3 .99) may not be accepted and the player will receive 0 points</li>
                        </ul>
                </Modal.Body>
                        { 
                            isHost && !gameSession.is_active
                            ? 
                            <>
                                <Modal.Footer>
                                    <Button onClick={() => startGame()} className="btn" variant="danger">Start Game</Button>
                                </Modal.Footer>
                            </>
                            :
                            null
                        }
            </Modal>
        </>
    )
}

export default SetUpModal