import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { gameSessionIndex, addQuestions } from '../api/gamesession.js'
import { Button, Modal, Card } from 'react-bootstrap'
import CreateGameSessionModal from './gamesessions/CreateGameSessionModal.js'
import AddPlayerModal from './players/AddPlayerModal.js'

const Home = (props) => {
	const { msgAlert, user } = props

    const [gameSessions, setGameSessions] = useState(null)
    const [gameSession, setGameSession] = useState(null)
    const [newGameSession, setNewGameSession] = useState(null)
    const [showCreateModal, setCreateModalShow] = useState(false)
    const [confirmModal, setConfirmModal] = useState(false)

    const [updated, setUpdated] = useState(null)

	// console.log('props in home', props)
    console.log('gameSessions', gameSessions)

    const navigate = useNavigate()

    useEffect(()=> {
        gameSessionIndex(user)
            .then(res => {
                console.log(res)
                setGameSessions(res.data)})
    }, [updated])

    const onClick = (e) => {
        setGameSession(e.target.value)
        addQuestions(user, e.target.value)
    }

    const onStart = () => {

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
            console.log('games', games)
            console.log('game', game)
            let players = game.players[0]
            console.log(players)
            // Determine if current player is host by quering array
            let host = false
            if(gameSessions.playerdata.some(function(players){return players["game"] === game.id})){
                host = true
            }
            return (
                <Card className='m-2' key={i}>
                    { game.is_active ? <Link to="/livegame" state={{ gameId: game.id, isHost: host }} className="btn" variant="danger">Join Live Game Now!!</Link> : null }
                    <Card.Header>
                        Game ID: {game.session_code} | 
                        Players: {players} |
                        Status: {game.game_result} |
                        { host ? <>&#9989;</> : null }
                    </Card.Header>
                    <Card.Body>
                    {/* <Card.Title>Special title treatment</Card.Title>
                    <Card.Text>
                        With supporting text below as a natural lead-in to additional content.
                    </Card.Text> */}
                    <Button variant="primary">View</Button> 
                    { 
                        host ? 
                        <>
                            <Button>Edit</Button>
                            <Button variant="primary" onClick={()=> {
                                setConfirmModal(true)
                                setGameSession(game)
                                }}
                            >Start</Button> 
                        </>
                        : 
                        null 
                    }
                    
                    </Card.Body>
                </Card>
            )
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
            <Modal show={confirmModal} onClose={()=>setConfirmModal(false)}>
                <Modal.Header>Are you sure you want to start this game now?</Modal.Header>
                { gameSession ? 
                <Link to="/livegame" state={{ gameId: gameSession.id, isHost: true }}  className="btn" variant="danger">Join Live Game Now!!</Link> : null }
                <Button onClick={()=>setConfirmModal(false)}>No</Button>
            </Modal>
		</>
	)
}

export default Home
