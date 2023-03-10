import { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import GameSessionForm from '../shared/GameSessionForm'
import AddPlayerModal from '../players/AddPlayerModal'
import { createGameSession } from '../../api/gamesession'

const CreateGameSessionModal = (props) => {
    const { user, msgAlert, show, handleClose, triggerRefresh, gameSession, setGameSession } = props

    const [showPlayerModal, setPlayerModalShow] = useState(false)
    const [newGameSession, setNewGameSession] = useState(null)

    console.log('create', gameSession)
    const onChange = (e) => {
        // On change on label form, set the label to the new information
        e.persist()
        
        setGameSession(prevLabel => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            const updatedGameSession = {
                is_active: false,
                [updatedName] : updatedValue
            }
            // console.log('the label', updatedLabel)
            // console.log('the label (state)', label)
            return {
                ...prevLabel, ...updatedGameSession
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        createGameSession(user, gameSession)
            // close the modal
            .then((res) => {
                setGameSession(res.data)
                setNewGameSession(res.data)
            })
            .then(() => {
                setPlayerModalShow(true)
                handleClose()
            })
            // send a success message
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: "Oh No! Something went wrong!",
                    message: 'Try again!',
                    variant: 'danger'
                })
            })
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton closeVariant='white' id='new-file-header'>
                    <Modal.Title id='new-file-title'>Create A New Game!</Modal.Title>
                </Modal.Header>
                <Modal.Body id='new-file-body'>
                    <GameSessionForm
                        handleChange={onChange}
                        handleSubmit={onSubmit}
                    />
                </Modal.Body>
            </Modal>
            <AddPlayerModal 
                user={user}
                show={showPlayerModal} 
                gameSession={newGameSession}
                handleClose={() => setPlayerModalShow(false)}
                triggerRefresh={triggerRefresh} 
                msgAlert={msgAlert}
            />
        </>
    )

}

export default CreateGameSessionModal