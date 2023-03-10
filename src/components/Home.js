import { useEffect, useState } from 'react'
import { gameSessionIndex, addQuestions } from '../api/gamesession.js'
import { Button, Modal } from 'react-bootstrap'
import CreateGameSessionModal from './gamesessions/CreateGameSessionModal.js'
import AddPlayerModal from './players/AddPlayerModal.js'

const Home = (props) => {
	const { msgAlert, user } = props

    const [gameSessions, setGameSessions] = useState(null)
    const [gameSession, setGameSession] = useState(null)
    const [newGameSession, setNewGameSession] = useState(null)
    const [showCreateModal, setCreateModalShow] = useState(false)

    const [updated, setUpdated] = useState(null)

	// console.log('props in home', props)
    console.log('gameSessions', gameSessions)

    useEffect(()=> {
        gameSessionIndex(user)
            .then(res => setGameSessions(res.data))
    }, [updated])

    const onClick = (e) => {
        setGameSession(e.target.value)
        addQuestions(user, e.target.value)
    }

    // Show a different message if the user is not logged in
    if(!user) {
        return <p>Log in or Sign up to continue!</p>
    }
    // If the user is logged in, check to see if gameSessions are still loading
    if(gameSessions == null) {
        return <p>Loading</p>
    }
    // Or if they have no game sessions, show below
    if(gameSessions.length === 0) {
        return <p>You have no games!</p>
    }

    //! Map the gameSessions associated with that use to buttons
    let games 
    if(gameSessions.gamesessions.length > 0) {
        games = gameSessions.gamesessions.map((game, i) => {
            console.log('game', game)
            return <button key={i} onClick={onClick} value={game.id}>{game.session_code}</button>
    })
    }


	return (
		<>
			<h2>Home Page</h2>
            <Button onClick={() => setCreateModalShow(true)}>Create New Game</Button>
            { games }
            <CreateGameSessionModal 
                user={user}
                show={showCreateModal} 
                handleClose={() => {
                    setCreateModalShow(false)
                }} 
                triggerRefresh={() => setUpdated(prev => !prev)}
                gameSession={gameSession}
                setGameSession={setGameSession}
                setNewGameSession={setNewGameSession}
                msgAlert={msgAlert}
            />

		</>
	)
}

export default Home
