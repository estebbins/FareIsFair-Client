import { useState, useEffect } from 'react'
import { addPlayers } from '../../api/gamesession'
import { Modal } from 'react-bootstrap'
import PlayerForm from '../shared/PlayerForm'
// ! NOT WORKING/NOT USED - FOR DEV

const AddPlayerModal = (props) => {
    const { msgAlert, show, handleClose, triggerRefresh } = props
    console.log('add player', props.gameSession)
    const [filterValueOne, setFilterValueOne] = useState(null)
    const [filterValueTwo, setFilterValueTwo] = useState(null)
    const [filterValueThree, setFilterValueThree] = useState(null)

    const [players, setPlayers] = useState([
        {player_one: ''},
        {player_two: ''},
        {player_three: ''}
    ])


    useEffect(() => {
        // When component is shown or hidden, reset the states 
        setPlayers([
            {player_one: ''},
            {player_two: ''},
            {player_three: ''}
        ])
        setFilterValueOne('')
        setFilterValueTwo('')
        setFilterValueThree('')
    }, [show])
    

    const onChoice = (e) => {
        e.persist()
        
        setPlayers(prevPlayer => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            const updatedPlayer = {
                [updatedName] : updatedValue
            }
            
            // console.log('the contributor', updatedContributor)
            // console.log('the contributor (state)', contributor)

            return {
                ...prevPlayer, ...updatedPlayer
            }
        })
    }
    
    const onChangeOne = (e) => {
        // On typing user's email, update the filter value
        e.preventDefault()
        console.log('this is e', e)
        setFilterValueOne(e.target.value)
    }

    const onChangeTwo = (e) => {
        // On typing user's email, update the filter value
        e.preventDefault()
        console.log('this is e', e)
        setFilterValueTwo(e.target.value)
    }

    const onChangeThree = (e) => {
        // On typing user's email, update the filter value
        e.preventDefault()
        console.log('this is e', e)
        setFilterValueThree(e.target.value)
    }

    console.log('players', players)
    const onSubmit = (e) => {
        e.preventDefault()
        // On form submit, API Call to create the contributor
        addPlayers(props.user, props.gameSession.gamesession.id, players)
            // close the modal
            .then((res) => console.log('res players', res))
            .then(() => handleClose())
            // send a success message
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Something went wrong',
                    variant: 'danger'
                })
            })
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton closeVariant='white' id='new-file-header'>
                    <Modal.Title id='new-file-title'>Add Players to Game: 
                    { props.gameSession ? props.gameSession.gamesession.session_code : "blank" }</Modal.Title>
                </Modal.Header>
                <Modal.Body id='new-file-body'>
                    <PlayerForm
                        filterValueOne={filterValueOne}
                        filterValueTwo={filterValueTwo}
                        filterValueThree={filterValueThree}
                        handleChangeOne={onChangeOne}
                        handleChangeTwo={onChangeTwo}
                        handleChangeThree={onChangeThree}
                        handleSubmit={onSubmit}
                        handleChoice={onChoice}
                        triggerRefresh={triggerRefresh}
                        msgAlert={msgAlert}
                        // players={players}
                    />
                </Modal.Body>
            </Modal>
        </>
    )

}

export default AddPlayerModal