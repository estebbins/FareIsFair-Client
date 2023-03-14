import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { gameSessionIndex, addQuestions, gameDelete, abandonActiveGame } from '../api/gamesession.js'
import { Button, Modal, Card, Container } from 'react-bootstrap'
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
    const abandonGame = (e) => {
        abandonActiveGame(user, e.target.value)
            .then(res => setUpdated(prev=>!prev))
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
        return (
            <>
                <p>You have no games!</p>
                <Button onClick={() => setCreateModalShow(true)} className='create'>Create New Game</Button>
            </>
        )
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
            let winner = false
            gameSessions.playerdata.forEach(player => {
                if (player.player === user.id && player.role === 'h' && player.game === game.id) {
                    host = true
                }
                if (player.player === user.id & player.winner) {
                    winner = true
                }
            })
            return (
                <Card className='indexcard' key={i}>
                    { game.is_active ? <Link to="/livegame" state={{ gameId: game.id, isHost: host }} className="livejoin btn">Click Here to Join Live Game Now!!</Link> : null }
                    <Card.Header className='indexcard-header d-flex justify-items-center'>
                        {game.session_name} &nbsp; &nbsp; &nbsp;| &nbsp; &nbsp; &nbsp;
                        {players} players &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp;
                        Status: {game.game_result} &nbsp; &nbsp; &nbsp;| &nbsp; &nbsp; &nbsp;
                        { host ? <>&#9989;</> : null }
                    </Card.Header>
                    <Card.Body className="d-flex indexcard-body">
                    { 
                        host ? 
                        <>
                            {
                                players > 0 && game.game_result === 'pending'
                                ?
                                <Button variant="primary" className='indexcard-button' onClick={()=> {
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
                                <>
                                    <Button className='indexcard-button' onClick={onClick} value={game.id}>Edit</Button>
                                    <Button onClick={deleteGame} value={game.id} className='delete'>Delete</Button>
                                </>
                                :
                                null
                            }
                            {
                                game.is_active
                                ?
                                <Button onClick={abandonGame} value={game.id} className='delete'>End Game</Button>:
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
            <Container className='d-flex flex-column justify-items-center'>
                <br></br>
                <h2 className='text-center'>Dashboard</h2>
                <br></br>
                <Button onClick={() => setCreateModalShow(true)} className='create'>Create New Game</Button>
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
            </Container>
		</>
	)
}

export default Home
