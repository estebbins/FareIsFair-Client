import { useEffect, useState } from 'react'
import { gameSessionIndex } from '../api/gamesession.js'

const Home = (props) => {
	const { msgAlert, user } = props

    const [gameSessions, setGameSessions] = useState(null)

	console.log('props in home', props)
    console.log('gameSessions', gameSessions)
    useEffect(()=> {
        gameSessionIndex(user)
            .then(res => setGameSessions(res.data))
    }, [])

    if(gameSessions == null) {
        return <p>Loading</p>
    }
    if(gameSessions.length == 0) {
        return <p>You have no games!</p>
    }
    let games 
    if(gameSessions.length > 0) {
        games = gameSessions.gamesessions.map((game, i) => {
            console.log('game', game)
            return <p key={i}>{game.session_code}</p>
    })
    }


	return (
		<>
			<h2>Home Page</h2>
            { games }
		</>
	)
}

export default Home
