import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import SetUpModal from './SetUpModal'
import ActiveLiveGame from './ActiveLiveGame'
import AnswerModal from './AnswerModal'
import { addQuestions, beginGameSession, getResponses, scorePlayer, nextRound, getGameDetail, getSpins, getGamePlayers } from '../../api/gamesession'
import { getByDisplayValue } from '@testing-library/react'

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
    const [finalPlayer, setFinalPlayer] = useState(null)
    // const [showPasswordModal, setShowPasswordModal] = useState(false)
    // Disable handle close for setup if game is not active!!! Close it when it is set to active
    const [showSetUpModal, setShowSetUpModal] = useState(false)
    // console.log('live game gameSession', gameSession)
    // console.log('live game players', players)
    // console.log('live game users', users)
    // console.log('live game questions', questions)
    // console.log('live game activequestion', activeQuestion)
    // console.log('live game responses', responses)
    // console.log('firstplace player', firstPlace)
    // console.log('secondplace player', secondPlace)
    console.log('MEGA STATE', 'live game gameSession', gameSession, 'live game players', players, 'live game users', users, 'live game questions', questions, 'live game activequestion', activeQuestion, 'live game responses', responses, 'firstplace player', firstPlace, 'secondplace player', secondPlace, 'updated', updated, 'currentQuestionNum', currentQuestionNum, 'host', host, 'finalRound', finalRound, 'liveRound', liveRound, 'finalPlayer', finalPlayer)
    // console.log('live game gameSession.active_question', `${ gameSession.active_question ? gameSession.active_question : null }`)
    // Upon loading this page, game whose gameId matches the state gameId needs to be set to active if it is NOT already, game status to also change to in progress
    useEffect(()=> {
        // Grab all the game's details
        console.log('use effect 1')
        getGameDetail(user, gameId)
            .then((res) => {
                // If it's active - set it up
                console.log('get game detail res', res)
                if (res.data.gameSession.is_active) {
                    console.log('Set Game Session 1')
                    // let resQuestions = res.data.gameQuestions
                    // for (let i = 0; i < res.data.gameQuestions.length; i++) {
                    //     // Adjust URL Pattern
                    //     let url = resQuestions[i]["image"].split('https://')
                    //     let url_adjusted = 'https://target' + url[1] + '?qlt=85&fmt=webp&hei=253&wid=253'
                    //     let url_final = url_adjusted.split('image//').join('image/Target/')
                    //     resQuestions[i] = {...resQuestions[i], image: url_final}
                    // }
                    // console.log('############## getGameDetail', res.data)
                    setQuestions(res.data.gameQuestions)
                    setPlayers(res.data.players)
                    // console.log('player data!', res.data['players'])
                    // console.log('player data!', res.data.players)
                    // console.log('player data!', [...res.data.players])
                    // console.log('this one was hit 9', res.data.players)
                    // setPlayers(res.data.players)
                    setUsers(res.data.users)
                    for (let i = 0; i <res.data.players; i++){
                        if (res.data.players[i].role === "h" && res.data.players[i].id === user.id) {
                            setHost(true)
                        }
                    }
                    setGameSession(res.data.gameSession)
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
                                console.log('this one was hit 10', res.data.players)
                                setPlayers(res.data.players)
                                setUsers(res.data.users)
                                console.log('Set Game Session 2')
                                setGameSession(res.data.gameSession)
                            })
                        .then(()=>setShowSetUpModal(true))
                        .then(()=> setUpdated(prev=>!prev))
                        }
            
    }})},[])

    function stringify(object){
        var Prototype = window.Prototype
        if (Prototype && Prototype.Version < '1.7' &&
            Array.prototype.toJSON && Object.toJSON){
                return Object.toJSON(object)
        }
        return JSON.stringify(object)
    }
    console.log('PLAYERS', players)
    useEffect(()=> {
        console.log('use effect 2')
        getGamePlayers(user, gameId)
            .then(async res => {
                console.log('RES', res)
                console.log("res'", res.data.playerData)
                let data = [...res.data.playerData]
                console.log('!!!!!', data)
                console.log(data[0])
                console.log(data[1])
                await setPlayers(data)
                let newArray = []
                data.forEach(player => newArray.push(player))
                console.log(newArray)
                return newArray
                // console.log('Xxxxx', res.data.playerData)
                // setPlayers(res.data.playerData)
                // let data = JSON.parse(res.data)
                // console.log(data)
                // setPlayers(res.data.playerData)
                // console.log(' RESSS', res)
                // console.log('res players', res.data)
                // let info = res.request.response
                // console.log('info', info)
                // let parsed_info = JSON.parse(info)
                // console.log('parsedinfo', parsed_info)
                // console.log('parsed player info', parsed_info.playerData)
                // let parsed_player_info = parsed_info.playerData
                // setPlayers(parsed_player_info)
                // let info_str = JSON.stringify(info)
                // console.log('info_str', info_str)
                // let info_parse = JSON.parse(info_str)
                // console.log('info_parse', info_parse)
                // function tranferType(data) {
                //     return {
                //         "player": Number()
                //       "game": String(data.code),
                //       "displayOrder": Number(data.displayOrder),
                //       "name": String(data.name),
                //       "version": Number(data.version),
                //       "isActive": Boolean(data.isActive),
                //       "createdAt": new Date(data.createdAt),
                //       "updatedAt": new Date(data.updatedAt)
                //     };
                //   }
                  
                // let data = JSON.stringify(res.request.response)
                // let data_str = JSON.parse(data)
                // let data_str_parse = JSON.parse(data_str).players
                // let data_str_parse_thing = data_str_parse
                // console.log('data', data)
                // console.log('data str', data_str)
                // // console.log('parse', JSON.parse(res.request.response))
                // console.log('datastrparse', data_str_parse)
                // console.log('datastrparsething', data_str_parse_thing)
                // console.log('data.players', data.players)
                // console.log('res.request.response', res.request.response)
                // console.log('res FLATT', res.request.response.flat())
                // console.log('HOPEFULLY IT', parsed_player_info)
                // return parsed_player_info
            })
            .then(res => {
                console.log('NOW HERES THE DATA', res)
                setPlayers(res)
            })
            // .then(data => setPlayers(data))
            // .then(res => setPlayers(res.data))
            .catch(err => console.log('err', err))
            // .then(res => {
                // console.log('11', )
                // setPlayers(JSON.parse(res.request.response))})
        // console.log('!!!!!!!!!!!!live game useeffect with updated as dependency')
    },[])
    useEffect(()=> {
        console.log('PLAYERS HEY', players)
    }, [players])

    const startGame = () => {
        beginGameSession(user, gameSession.id)
            .then(res => {
                // console.log('live game startgame second res', res)
                // console.log('!!!!!!!!!', res.data.gameSession)
                console.log('Set Game Session 3')
                setGameSession(res.data.gameSession)
            })
            .then(()=>setShowSetUpModal(false))
            // .then(()=> setUpdated(prev=>!prev))
            .catch(err => console.log(err))
    }
    useEffect(() => {
        // Grab the active question ID and splice that question from the array to set it accordingly
        // console.log("XxxxxxxxUse Effect triggered from gamesession")
        console.log('use effect 3')
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
        console.log('use effect 4')
        if(questions) {
            // console.log('quest num', 5-questions.length)
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
        console.log('use effect 5')
        if(finalRound) {
            if (firstPlaceSpins > 1 && secondPlaceSpins > 1) {
                // They both lost the final round, but may win by points
                if (firstPlace.score === secondPlace.score) {
                    scorePlayer(user, firstPlace.player, gameSession.id, 'win')
                        .then(res => {
                            scorePlayer(user, secondPlace.player, gameSession.id, 'win')
                                .then(res => {
                                    console.log('this one was hit 1', res.data)
                                    setPlayers(res.data.playerData)
                                    // THEN END THE GAME
                                })
                        })
                } else if (firstPlace.score > secondPlace.score) {
                    scorePlayer(user, firstPlace.player, gameSession.id, 'win')
                        .then(res => {
                            scorePlayer(user, secondPlace.player, gameSession.id, 'lose')
                                .then(res => {
                                    console.log('this one was hit 2', res.data)
                                    setPlayers(res.data.playerData)
                                    // THEN END THE GAME
                                })
                        })
                } else if (secondPlace.score > firstPlace.score) {
                    scorePlayer(user, firstPlace.player, gameSession.id, 'lose')
                        .then(res => {
                            scorePlayer(user, secondPlace.player, gameSession.id, 'win')
                                .then(res => {
                                    console.log('this one was hit 3', res.data)
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
                                console.log('this one was hit 4', res.data)
                                setPlayers(res.data.playerData)
                                // THEN END THE GAME
                            })
                    })
            } else if(secondPlaceSpins > 1) {
                scorePlayer(user, firstPlace.player, gameSession.id, 'win')
                .then(res => {
                    scorePlayer(user, secondPlace.player, gameSession.id, 'lose')
                        .then(res => {
                            console.log('this one was hit 5', res.data)
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
                console.log('finished', finished)
                if(finished >= 2) {
                    if (firstPlaceSpins > secondPlaceSpins) {
                        scorePlayer(user, firstPlace.player, gameSession.id, 'win')
                            .then(res => {
                                scorePlayer(user, secondPlace.player, gameSession.id, 'lose')
                                    .then(res => {
                                        console.log('this one was hit 6', res.data)
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
                                        console.log('this one was hit 7', res.data)
                                        setPlayers(res.data.playerData)
                                        // THEN END THE GAME
                                    })
                            })
                    }
                } else if(finished === 1) {
                    setFinalPlayer(secondPlace)
                }
            }
        }
    }, [firstPlaceSpins, secondPlaceSpins])


    useEffect(() => {
        console.log('use effect 6')
        if (finalRound && responses) {
            console.log('FINAL ROUND!!!', responses)
            let firstSpins = 0
            let secondSpins = 0
            for(let i = 0; i < responses.length; i++) {
                if (responses[i].player === firstPlace.player && responses[i].response !== 'done') {
                    // console.log('float', parseFloat(responses[i].delta))
                    firstSpins += parseFloat(responses[i].delta)
                } else if (responses[i].player === secondPlace.player && responses[i].response !== 'done')(
                    secondSpins += parseFloat(responses[i].delta)
                )
            }
            setFirstPlaceSpins(firstSpins)
            setSecondPlaceSpins(secondSpins)
        } else if(responses) {
            // Check responses if number of players recieved or timer is up
            if(!liveRound || responses.length === players.length){ //! OR TIMER IS UP -> LIVE ROUND FALSE
                console.log('RESSSIES', responses)
                let correctResponses = []
                responses.forEach(response => {
                    if (parseInt(response.delta) >= 0) {
                        correctResponses.push(response)
                    }
                })
                // console.log('correct responses after first for', correctResponses)
                // https://stackoverflow.com/questions/979256/sorting-an-array-of-objects-by-property-values
                if (correctResponses.length > 1) {
                    correctResponses.sort((a,b) => parseFloat(a.response) - parseFloat(b.response)
                    )
                    // console.log('correct responses after sort', correctResponses)
                    let arrayLength = correctResponses.length
                    for(let o = 0; o < arrayLength; o++){
                        if (correctResponses[o] && correctResponses[o+1] &&correctResponses[o].response < correctResponses[o+1].response){
                            // console.log('this was hit')
                            correctResponses.shift()
                        }
                    } 
                    // console.log('correct responses after shift', correctResponses)
                }
                // console.log('correct responses before last for each', correctResponses)
                if (correctResponses.length > 0){
                    correctResponses.forEach(response => {
                        scorePlayer(user, response.player, gameSession.id, 100)
                            .then(res => {
                                console.log('this one was hit 8', res)
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
        console.log('use effect 7')
        // find the top 1-2 players
        if(finalRound && players) {
            console.log('UseEffect 7 Players', players)
            let allPlayers = players.sort((a,b) => 
                // sort in ascending order
                parseFloat(a.score) - parseFloat(b.score)
            )
            let topPlayers = [...allPlayers]
            console.log('*******playersAFTER', players)
            setFirstPlace(topPlayers.pop())
            setSecondPlace(topPlayers.pop())
        }
    }, [players, finalRound])

    // const setWinner = () => {

    // }

    const changeRound = () => {
        nextRound(user, gameSession.id, activeQuestion.id)
            .then(res => {
                // console.log('nextround res', res)
                if(res.data.gameSession.game_result !== 'final_round') {
                    console.log('Set Game Session 4')
                    setGameSession(res.data.gameSession)
                } else if (res.data.gameSession.game_result === 'final_round') {
                    setFinalRound(true)                    
                    setGameSession(res.data.gameSession)
                }
            })
    }

    const startRound = () => {
        setShowAnswersModal(false)
        changeRound()
    }

    const checkResponses = () => {
        console.log('AT CHECK RESPONSES')
        if(finalRound ) {
            getSpins(user, gameSession.id)
                .then(res => {
                    console.log('check responses final round', res)
                    if (res.data.player_responses.length > 0) {
                        setResponses(res.data.player_responses)
                    }
                })
        } else {
            getResponses(user, gameSession.id, activeQuestion.id)
                .then(res => {
                    console.log('check responses regular', res)
                    if (res.data.player_responses.length > 0) {
                        setResponses(res.data.player_responses)
                    }
                })
        }
    }

    // const checkFinalRound = () => {
    //     getResponses(user, gameSession.id, null)
    //         .then(res => {
    //             console.log('check final', res)
    //             setResponses(res.data.player_responses)
    //         })
    // }

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
            finalPlayer={finalPlayer}
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