import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { gameSessionIndex, addQuestions, getResponses, getQuestion, gameDelete } from '../api/gamesession.js'
import { Button, Modal, Card } from 'react-bootstrap'
import CreateGameSessionModal from './gamesessions/CreateGameSessionModal.js'
import AddPlayerModal from './players/AddPlayerModal.js'

const Home = (props) => {
	const { msgAlert, user, triggerRefresh } = props

    const [gameSessions, setGameSessions] = useState(null)
    const [gameSession, setGameSession] = useState(null)
    const [newGameSession, setNewGameSession] = useState(null)
    const [showCreateModal, setCreateModalShow] = useState(false)
    const [confirmModal, setConfirmModal] = useState(false)

    const [updated, setUpdated] = useState(null)

	// console.log('props in home', props)
    console.log('gameSessions', gameSessions)
    console.log('user in home', user)

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

    const deleteGame = (e) => {
        console.log('e', e)
        gameDelete(user, e.target.value)
            .then(res => console.log(res))
            .then(()=>setUpdated(prev=>!prev))
            .catch(err=>console.log(err))
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
            let players = game.players.length
            // console.log('game players', game.players.len)
            console.log(players)
            // Determine if current player is host by quering array
            let host = false
            gameSessions.playerdata.forEach(player => {
                if (player.player === user.id && player.role === 'h' && player.game === game.id){
                    host = true
                }
            })
            return (
                <Card className='m-2' key={i}>
                    { game.is_active ? <Link to="/livegame" state={{ gameId: game.id, isHost: host }} className="btn" variant="danger">Join Live Game Now!!</Link> : null }
                    <Card.Header>
                        Game ID: {game.session_name} | 
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
                            <Button onClick={onClick} value={game.id}>Edit</Button>
                            {
                                players > 0
                                ?
                                <Button variant="primary" onClick={()=> {
                                    setConfirmModal(true)
                                    setGameSession(game)
                                    }}
                                >Start</Button> 
                                :
                                null
                            }
                            {
                                game.game_result === 'pending'
                                ?
                                <Button onClick={deleteGame} value={game.id} variant="danger">Delete</Button>
                                :
                                null
                            }
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
            <Modal show={confirmModal} onHide={()=>setConfirmModal(false)}>
                <Modal.Header>Are you sure you want to start this game now?</Modal.Header>
                { gameSession ? 
                <Link to="/livegame" state={{ gameId: gameSession.id, isHost: true }}  className="btn" variant="danger">Start Live Game Now!!</Link> : null }
                <Button onClick={()=>setConfirmModal(false)}>No</Button>
            </Modal>
		</>
	)
}

export default Home
