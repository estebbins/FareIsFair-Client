import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'

//  Passing props to a link: https://ui.dev/react-router-pass-props-to-link

const LiveGame = (props) => {
    const { user } = props
    // Bring in the game data from Home.js
    const gameProps = useLocation()
    const { gameId, isHost } = gameProps.state

    const [showPasswordModal, setShowPasswordModal] = useState(false)

    useEffect(() => {
        setShowPasswordModal(true)
    }, [])


    return (
        <><p>You're in a live game!!</p>
        
        <Modal show={showPasswordModal}>
        <Modal.Header>Enter Your Password!</Modal.Header>

        </Modal>
        </>
        
    )
}

export default LiveGame