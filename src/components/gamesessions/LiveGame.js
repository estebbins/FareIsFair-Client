import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import SetUpModal from './SetUpModal'

//  Passing props to a link: https://ui.dev/react-router-pass-props-to-link

const LiveGame = (props) => {
    const { user } = props
    // Bring in the game data from Home.js
    const gameProps = useLocation()
    const { gameId, isHost } = gameProps.state

    const [showPasswordModal, setShowPasswordModal] = useState(false)
    // Disable handle close for setup if game is not active!!! Close it when it is set to active
    const [showSetUpModal, setShowSetUpModal] = useState(false)

    // Upon loading this page, game whose gameId matches the state gameId needs to be set to active if it is NOT already, game status to also change to in progress

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


    return (
        <><p>You're in a live game!!</p>
        
        <Modal show={false}>
        <Modal.Header>Enter Your Password!</Modal.Header>

        </Modal>

        <SetUpModal 
            show={showSetUpModal}
            handleClose={()=>setShowSetUpModal(false)}
            isHost={isHost}
        />
        </>
        
    )
}

export default LiveGame