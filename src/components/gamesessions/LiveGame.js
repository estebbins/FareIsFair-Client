import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import SetUpModal from './SetUpModal'
import ActiveLiveGame from './ActiveLiveGame'
import AnswerModal from './AnswerModal'
import { addQuestions, beginGameSession, getResponses, scorePlayer, nextRound, getGameDetail, getSpins } from '../../api/gamesession'

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
    const [showAnswerModal, setShowAnswersModal] = useState(false)
    const [host, setHost] = useState(isHost)
    const [finalRound, setFinalRound] = useState(false)
    const [firstPlace, setFirstPlace] = useState(null)
    const [secondPlace, setSecondPlace] = useState(null)
    const [firstPlaceSpins, setFirstPlaceSpins] = useState(0)
    const [secondPlaceSpins, setSecondPlaceSpins] = useState(0)
    const [liveRound, setLiveRound] = useState(true)
    // const [showPasswordModal, setShowPasswordModal] = useState(false)
    // Disable handle close for setup if game is not active!!! Close it when it is set to active
    const [showSetUpModal, setShowSetUpModal] = useState(false)
    console.log('live game gameSession', gameSession)
    console.log('live game players', players)
    console.log('live game users', users)
    console.log('live game questions', questions)
    console.log('live game activequestion', activeQuestion)
    console.log('live game responses', responses)
    console.log('firstplace player', firstPlace)
    console.log('secondplace player', secondPlace)
    // console.log('live game gameSession.active_question', `${ gameSession.active_question ? gameSession.active_question : null }`)
    // Upon loading this page, game whose gameId matches the state gameId needs to be set to active if it is NOT already, game status to also change to in progress
    useEffect(()=> {
        // Grab all the game's details
        getGameDetail(user, gameId)
            .then((res) => {
                // If it's active - set it up
                if (res.data.gameSession.is_active) {
                    // let resQuestions = res.data.gameQuestions
                    // for (let i = 0; i < res.data.gameQuestions.length; i++) {
                    //     // Adjust URL Pattern
                    //     let url = resQuestions[i]["image"].split('https://')
                    //     let url_adjusted = 'https://target' + url[1] + '?qlt=85&fmt=webp&hei=253&wid=253'
                    //     let url_final = url_adjusted.split('image//').join('image/Target/')
                    //     resQuestions[i] = {...resQuestions[i], image: url_final}
                    // }
                    console.log('##############', res.data)
                    setQuestions(res.data.gameQuestions)
                    // console.log('player data!', res.data['players'])
                    console.log('player data!', res.data.players)
                    console.log('player data!', [...res.data.players])
                    setPlayers([...res.data.players])
                    setUsers(res.data.users)
                    setGameSession(res.data.gameSession)
                    for (let i = 0; i <res.data.players; i++){
                        if (res.data.players[i].role === "h" && res.data.players[i].id === user.id) {
                            setHost(true)
                        }
                    }
                } else {  
                    // If it isn't active & there's no active question, make the call to add questions
                    if(!activeQuestion){
                        addQuestions(user, gameId)
                            .then(res => {
                                console.log('####?????????', res)
            
                                // let resQuestions = res.data.gameQuestions
                                // for (let i = 0; i < res.data.gameQuestions.length; i++) {
                                //     // Adjust URL Pattern
                                //     let url = resQuestions[i]["image"].split('https://')
                                //     let url_adjusted = 'https://target' + url[1] + '?qlt=85&fmt=webp&hei=253&wid=253'
                                //     let url_final = url_adjusted.split('image//').join('image/Target/')
                                //     resQuestions[i] = {...resQuestions[i], image: url_final}
                                // }
                                setQuestions(res.data.gameQuestions)
                                console.log('res.data.players#', res.data.players)
                                setPlayers(res.data.players)
                                setUsers(res.data.users)
                                setGameSession(res.data.gameSession)
                            })
                        .then(()=>setShowSetUpModal(true))
                        .then(()=> setUpdated(prev=>!prev))
                        }
    }})},[])

    // ! Don't think I need this.
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
        if(gameSession && gameSession.game_result === 'final_round'){
            setFinalRound(true)
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

    // useEffect(() => {
    //     setShowPasswordModal(true)
    // }, [])
    console.log('firstplacespins', firstPlaceSpins)
    console.log('secondplacespins', secondPlaceSpins)

    useEffect(() => {
        // CHECK SPINS IN FINAL ROUND
        if(finalRound) {
            if (firstPlaceSpins > 1 && secondPlaceSpins > 1) {
                // They both lost the final round, but may win by points
                if (firstPlace.score === secondPlace.score) {
                    scorePlayer(user, firstPlace.player, gameSession.id, 'win')
                        .then(res => {
                            scorePlayer(user, secondPlace.player, gameSession.id, 'win')
                                .then(res => {
                                    setPlayers(res.data.playerData)
                                    // THEN END THE GAME
                                })
                        })
                } else if (firstPlace.score > secondPlace.score) {
                    scorePlayer(user, firstPlace.player, gameSession.id, 'win')
                        .then(res => {
                            scorePlayer(user, secondPlace.player, gameSession.id, 'lose')
                                .then(res => {
                                    setPlayers(res.data.playerData)
                                    // THEN END THE GAME
                                })
                        })
                } else if (secondPlace.score > firstPlace.score) {
                    scorePlayer(user, firstPlace.player, gameSession.id, 'lose')
                        .then(res => {
                            scorePlayer(user, secondPlace.player, gameSession.id, 'win')
                                .then(res => {
                                    setPlayers(res.data.playerData)
                                    // THEN END THE GAME
                                })
                        })
                }
            } else if (firstPlaceSpins > 1) {
                scorePlayer(user, firstPlace.player, gameSession.id, 'lose')
                    .then(res => {
                        scorePlayer(user, secondPlace.player, gameSession.id, 'win')
                            .then(res => {
                                setPlayers(res.data.playerData)
                                // THEN END THE GAME
                            })
                    })
            } else if(secondPlaceSpins > 1) {
                scorePlayer(user, firstPlace.player, gameSession.id, 'win')
                .then(res => {
                    scorePlayer(user, secondPlace.player, gameSession.id, 'lose')
                        .then(res => {
                            console.log('^^^^players', players)
                            setPlayers(res.data.playerData)
                            // THEN END THE GAME
                        })
                })
            } else {
                let finished = 0
                for(let i = 0; i < responses.length; i++) {
                    if (responses[i].player === firstPlace.id && responses[i].response === 'done') { 
                        finished += 1
                    }
                    else if (responses[i].player === secondPlace.id && responses[i].response === 'done') {
                        finished += 1
                    }
                }
                if(finished >= 2) {
                    if (firstPlaceSpins > secondPlaceSpins) {
                        scorePlayer(user, firstPlace.player, gameSession.id, 'win')
                            .then(res => {
                                scorePlayer(user, secondPlace.player, gameSession.id, 'lose')
                                    .then(res => {
                                        setPlayers(res.data.playerData)
                                        // THEN END THE GAME
                                    })
                            })
                    }
                    else if (secondPlaceSpins > firstPlaceSpins) {
                        scorePlayer(user, firstPlace.player, gameSession.id, 'lose')
                            .then(res => {
                                scorePlayer(user, secondPlace.player, gameSession.id, 'win')
                                    .then(res => {
                                        setPlayers(res.data.playerData)
                                        // THEN END THE GAME
                                    })
                            })
                    }
                }
            }
        }
    }, [firstPlaceSpins, secondPlaceSpins])


    useEffect(() => {
        if (finalRound && responses) {
            console.log('FINAL ROUND!!!', responses)
            let firstSpins = 0
            let secondSpins = 0
            for(let i = 0; i < responses.length; i++) {
                if (responses[i].player === firstPlace.player && responses[i].response !== 'done') {
                    console.log('float', parseFloat(responses[i].delta))
                    firstSpins += parseFloat(responses[i].delta)
                } else if (responses[i].player === secondPlace.player && responses[i].response !== 'done')(
                    secondSpins += parseFloat(+responses[i].delta)
                )
            }
            setFirstPlaceSpins(firstSpins)
            setSecondPlaceSpins(secondSpins)
        } else if(responses) {
            // Check responses if number of players recieved or timer is up
            if(!liveRound || responses.length === players.length){ //! OR TIMER IS UP -> LIVE ROUND FALSE
                console.log('RESSSIES', responses)
                console.log('length matches length or liveRound = False')
                let correctResponses = []
                responses.forEach(response => {
                    if (parseInt(response.delta) >= 0) {
                        correctResponses.push(response)
                    }
                })
                console.log('correct responses after first for', correctResponses)
                // https://stackoverflow.com/questions/979256/sorting-an-array-of-objects-by-property-values
                if (correctResponses.length > 1) {
                    correctResponses.sort((a,b) => parseFloat(a.response) - parseFloat(b.response)
                    )
                    console.log('correct responses after sort', correctResponses)
                    let arrayLength = correctResponses.length
                    for(let o = 0; o < arrayLength; o++){
                        if (correctResponses[o] && correctResponses[o+1] &&correctResponses[o].response < correctResponses[o+1].response){
                            console.log('this was hit')
                            correctResponses.shift()
                        }
                    } 
                    console.log('correct responses after shift', correctResponses)
                }
                console.log('correct responses before last for each', correctResponses)
                if (correctResponses.length > 0){
                    correctResponses.forEach(response => {
                        scorePlayer(user, response.player, gameSession.id, 100)
                            .then(res => {
                                console.log('score player', res)
                                setPlayers(res.data.playerData)
                            })
                            .then(() => setShowAnswersModal(true))
                    })
                } else {
                    setShowAnswersModal(true)
                }
            }
        }
    },[responses])

    useEffect(() => {
        // find the top 1-2 players
        if(finalRound) {
            console.log('*******players', players)
            let allPlayers = players.sort((a,b) => 
                // sort in ascending order
                parseFloat(a.score) - parseFloat(b.score)
            )
            console.log('*******playersAFTER', players)
            setFirstPlace(allPlayers.pop())
            setSecondPlace(allPlayers.pop())
        }
    }, [finalRound])

    const setWinner = () => {

    }

    const changeRound = () => {
        nextRound(user, gameSession.id, activeQuestion.id)
            .then(res => {
                console.log('nextround res', res)
                if(res.data.gameSession.game_result !== 'final_round') {
                    setGameSession(res.data.gameSession)
                } else if (res.data.gameSession.game_result === 'final_round') {
                    setFinalRound(true)
                }
            })
    }

    const startRound = () => {
        setShowAnswersModal(false)
        changeRound()
    }

    const checkResponses = () => {
        console.log('AT CHECK RESPONSES')
        if(finalRound) {
            getSpins(user, gameSession.id)
                .then(res => {
                    console.log('check responses', res)
                    if (res.data.player_responses.length > 0) {
                        setResponses(res.data.player_responses)
                    }
                })
        } else {
            getResponses(user, gameSession.id, activeQuestion.id)
                .then(res => {
                    console.log('check responses', res)
                    if (res.data.player_responses.length > 0) {
                        setResponses(res.data.player_responses)
                    }
                })
        }
    }

    const checkFinalRound = () => {
        getResponses(user, gameSession.id, null)
            .then(res => {
                console.log('check final', res)
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
            finalRound={finalRound}
            firstPlace={firstPlace}
            secondPlace={secondPlace}
            firstPlaceSpins={firstPlaceSpins}
            secondPlaceSpins={secondPlaceSpins}
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
        {
            responses && !finalRound
            ?
            <AnswerModal
                show={showAnswerModal}
                responses={responses}
                handleClose={() => setShowAnswersModal(false)}
                users={users}
                startRound={startRound}
                isHost={isHost}
                answer={activeQuestion.answer}
            />
            :
            null
        }
        </>
        
    )
}

export default LiveGame