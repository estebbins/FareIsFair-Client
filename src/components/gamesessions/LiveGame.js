import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import SetUpModal from './SetUpModal'
import ActiveLiveGame from './ActiveLiveGame'
import { addQuestions, beginGameSession, getResponses, scorePlayer, nextRound } from '../../api/gamesession'

//  Passing props to a link: https://ui.dev/react-router-pass-props-to-link

const LiveGame = (props) => {
    const { user } = props
    // Bring in the game data from Home.js
    const gameProps = useLocation()
    const { gameId, isHost } = gameProps.state

    const [gameSession, setGameSession] = useState(null)
    const [players, setPlayers] = useState(null)
    const [users, setUsers] = useState(null)
    const [questions, setQuestions] = useState(null)
    const [activeQuestion, setActiveQuestion] = useState(null)
    const [responses, setResponses] = useState(null)
    const [updated, setUpdated] = useState(false)
    const [currentQuestionNum, setCurrentQuestionNum] = useState(1)

    const [showPasswordModal, setShowPasswordModal] = useState(false)
    // Disable handle close for setup if game is not active!!! Close it when it is set to active
    const [showSetUpModal, setShowSetUpModal] = useState(false)
    console.log('live game gameSession', gameSession)
    console.log('live game players', players)
    console.log('live game users', users)
    console.log('live game questions', questions)
    console.log('live game activequestion', activeQuestion)
    console.log('live game responses', responses)
    // console.log('live game gameSession.active_question', `${ gameSession.active_question ? gameSession.active_question : null }`)
    // Upon loading this page, game whose gameId matches the state gameId needs to be set to active if it is NOT already, game status to also change to in progress
    useEffect(()=> {
        if(!activeQuestion){
            console.log('FIRST USEEFFECT RAN')
            addQuestions(user, gameId)
                .then(res => {
                    console.log('live game useeffect first res', res)
                    setGameSession(res.data.gameSession)
                    let resQuestions = res.data.gameQuestions
                    for (let i = 0; i < res.data.gameQuestions.length; i++) {
                        // Adjust URL Pattern
                        let url = resQuestions[i]["image"].split('https://')
                        let url_adjusted = 'https://target' + url[1] + '?qlt=85&fmt=webp&hei=253&wid=253'
                        let url_final = url_adjusted.split('image//').join('image/Target/')
                        resQuestions[i] = {...resQuestions[i], image: url_final}
                    }
                    setQuestions(resQuestions)
                    setPlayers(res.data.players)
                    setUsers(res.data.users)
                })
            .then(()=>setShowSetUpModal(true))
            .then(()=> setUpdated(prev=>!prev))
        }
    },[])

    useEffect(()=> {
        console.log('!!!!!!!!!!!!live game useeffect with updated as dependency')
    },[updated])

    const startGame = () => {
        beginGameSession(user, gameSession.id)
            .then(res => {
                console.log('live game startgame second res', res)
                console.log('!!!!!!!!!', res.data.gameSession)
                setGameSession(res.data.gameSession)
            })
            // .then(() => getFirstQuestion())
            // .then(()=>{
            //     console.log('start game gamesession', gameSession)
            //     let q
            //     for (let i = 0; i < questions.length; i++) {
            //         console.log(i, questions[i].id, gameSession.active_question)
            //         console.log(i, questions[i])
            //         console.log(i, questions)
            //         if(questions[i].id === gameSession.active_question) {
            //             q = questions[i]
            //             setQuestions(questions.splice(i,1))
            //         }
            //     }
            //     console.log('q', q)
            //     setActiveQuestion(q)
            //     // setQuestions(questions)
            // })
            .then(()=>setShowSetUpModal(false))
            // .then(()=> setUpdated(prev=>!prev))
            .catch(err => console.log(err))
    }
    useEffect(() => {
        // Grab the active question ID and splice that question from the array to set it accordingly
        console.log("XxxxxxxxUse Effect triggered from gamesession")
        if(gameSession && gameSession.active_question && questions){
                // for (let i = 0; i < questions.length; i++) {
                //     // Adjust URL Pattern
                //     let url = questions[i]["image"].split('https://')
                //     let url_adjusted = 'https://target' + url[1] + '?qlt=85&fmt=webp&hei=253&wid=253'
                //     let url_final = url_adjusted.split('image//').join('image/Target/')
                //     questions[i] = {...questions[i], image: url_final}
                questions.forEach(question => {
                    if(question.id === gameSession.active_question) {
                        setActiveQuestion(question)
                        questions.splice(questions.indexOf(question),1)
                        return questions
                    }
                })
                setQuestions(questions)
            }
        }, [gameSession])

    useEffect(()=> {
        if(questions) {
            console.log('quest num', 5-questions.length)
            setCurrentQuestionNum(5-questions.length)
        } else {
            setCurrentQuestionNum(5)
        }
    }, [activeQuestion])
    // Questions need to be added (duplicate requests handled on backend, but might be ideal to handle here to prevent more API calls than are necessary)

    // First question needs to be set in as the active question in the game session

    // Active question needs to be obtained from DB and set as the question state
    // useEffect(() => {
    //     // Adjust URL pattern
    //     if(activeQuestion){
    //         let url = activeQuestion["image"].split('https://')
    //         let url_adjusted = 'https://target' + url[1] + '?qlt=85&fmt=webp&hei=253&wid=253'
    //         let url_final = url_adjusted.split('image//').join('image/Target/')
    //         setActiveQuestion({...activeQuestion, image: url_final})
    //     }}, [])


    // Game Phases need to commence
        // Set Up
        // Round 1
            // question 1
                // Score
            // question 2
                // Score 
            // SEND SCORE TO DB??
        // Round 2
            // question 3
                // Score
            // question 4
            // SEND SCORE TO DB??
            // question 5
        // Final Round
            // Top 2 players Only
            // Wheel??????
        // Finish Scoring Game!

    // Questions

    useEffect(() => {
        setShowPasswordModal(true)
    }, [])

    useEffect(() => {
        // Check responses if number of players recieved or timer is up
        if(responses) {
            if(responses.length === players.length){ //! OR TIMER IS UP
                console.log('length matches length')
                let correctResponses = []
                for(let i = 0; i < responses.length; i++)
                responses.forEach(response => {
                    if (response.delta >= 0) {
                        correctResponses.push(response)
                    }
                })
                console.log('correct responses after first for', correctResponses)
                // https://stackoverflow.com/questions/979256/sorting-an-array-of-objects-by-property-values
                if (correctResponses.length > 1) {
                    correctResponses.sort(function(a,b) {
                        return parseFloat(a.response) - parseFloat(b.response)
                    })
                    console.log('correct responses after sort', correctResponses)
                    let arrayLength = correctResponses.length
                    for(let o = 0; o < arrayLength; o++){
                        if (correctResponses[o] < correctResponses[o+1]){
                            correctResponses.unshift()
                        }
                    } 
                    console.log('correct responses after unshift', correctResponses)
                }
                console.log('correct responses before last for each', correctResponses)
                if (correctResponses.length > 0){
                    correctResponses.forEach(response => {
                        scorePlayer(user, response.player, gameSession.id, 100)
                            .then(res => {
                                console.log('score player', res)
                                setPlayers(res.data.playerData)
                            })
                            .then(() => {
                                nextRound(user, gameSession.id, activeQuestion.id)
                                    .then(res => {
                                        console.log('nextround res', res)
                                        if(res.data !== 'endgame') {
                                            setGameSession(res.data.gameSession)
                                        }
                                    })
                            })
                    })
                } else {
                    nextRound(user, gameSession.id, activeQuestion.id)
                                    .then(res => {
                                        console.log('nextround res', res)
                                        if(res.data !== 'endgame') {
                                            setGameSession(res.data.gameSession)
                                        }
                                    })
                }
            }
        }
    },[responses])

    const checkResponses = () => {
        getResponses(user, gameSession.id, activeQuestion.id)
            .then(res => {
                console.log('check responses', res)
                setResponses(res.data.player_responses)
            })
    }
    return (
        <><p>You're in a live game!! Do not Refresh Page</p>
        <ActiveLiveGame
            setShowSetUpModal={setShowSetUpModal}
            isHost={isHost}
            players={players}
            checkResponses={checkResponses}
            gameSession={gameSession}
            question={activeQuestion}
            question_num={currentQuestionNum}
            users={users}
        />
        <Modal show={false}>
        <Modal.Header>Enter Your Password!</Modal.Header>
        </Modal>
        {
            gameSession
            ?
            <SetUpModal 
                show={showSetUpModal}
                handleClose={()=>setShowSetUpModal(false)}
                isHost={isHost}
                gameSession={gameSession}
                startGame={startGame}
            />
            :
            null
        }
        </>
        
    )
}

export default LiveGame