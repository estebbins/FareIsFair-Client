import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import SetUpModal from './SetUpModal'
import ActiveLiveGame from './ActiveLiveGame'
import { addQuestions, beginGameSession, getResponses } from '../../api/gamesession'

//  Passing props to a link: https://ui.dev/react-router-pass-props-to-link

const LiveGame = (props) => {
    const { user } = props
    // Bring in the game data from Home.js
    const gameProps = useLocation()
    const { gameId, isHost } = gameProps.state

    const [gameSession, setGameSession] = useState(null)
    const [players, setPlayers] = useState(null)
    const [questions, setQuestions] = useState(null)
    const [activeQuestion, setActiveQuestion] = useState(null)
    const [responses, setResponses] = useState(null)
    const [updated, setUpdated] = useState(false)

    const [showPasswordModal, setShowPasswordModal] = useState(false)
    // Disable handle close for setup if game is not active!!! Close it when it is set to active
    const [showSetUpModal, setShowSetUpModal] = useState(false)
    console.log('live game gameSession', gameSession)
    console.log('live game players', players)
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
                    setQuestions(res.data.gameQuestions)
                    setPlayers(res.data.players)
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
        console.log('USE EFFECT TO RESOLVE', gameSession)
                let q
        if(gameSession && gameSession.active_question){
                for (let i = 0; i < questions.length; i++) {
                    console.log(i, questions[i].id, gameSession.active_question)
                    console.log(i, questions[i])
                    console.log(i, questions)
                    if(questions[i].id === gameSession.active_question) {
                        setActiveQuestion(questions[i])
                        questions.splice(i,1)
                        return questions
                    }
                }
                setQuestions(questions)
            }
    }, [gameSession])
    // Questions need to be added (duplicate requests handled on backend, but might be ideal to handle here to prevent more API calls than are necessary)

    // First question needs to be set in as the active question in the game session

    // Active question needs to be obtained from DB and set as the question state



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

    const checkResponses = () => {
        getResponses(user, gameSession.id)
            .then(res => {
                setResponses(res.data.player_responses)
            })
    }
    return (
        <><p>You're in a live game!!</p>
        <ActiveLiveGame
            setShowSetUpModal={setShowSetUpModal}
            isHost={isHost}
            players={players}
            checkResponses={checkResponses}
            gameSession={gameSession}
            question={activeQuestion}
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