import { useState } from 'react'

const AddPlayerModal = (props) => {
    // const { user, msgAlert, show, handleClose } = props

    // const [gameSession, setGameSession] = useState(null)

    // const onChange = (e) => {
    //     // On change on label form, set the label to the new information
    //     e.persist()
        
    //     setGameSession(prevLabel => {
    //         const updatedName = e.target.name
    //         let updatedValue = e.target.value

    //         const updatedLabel = {
    //             [updatedName] : updatedValue
    //         }
    //         // console.log('the label', updatedLabel)
    //         // console.log('the label (state)', label)
    //         return {
    //             ...prevLabel, ...updatedLabel
    //         }
    //     })
    // }

    // const onSubmit = (e) => {
    //     e.preventDefault()
    //     createGameSession(user, gameSession)
    //         // close the modal
    //         .then(() => handleClose())
    //         // send a success message
    //         .then(() => triggerRefresh())
    //         // if there is an error, tell the user about it
    //         .catch(() => {
    //             msgAlert({
    //                 heading: "Oh No! Something went wrong!",
    //                 message: 'Try again!',
    //                 variant: 'danger'
    //             })
    //         })
    // }

    // return (
    //     <>
    //         <Modal show={show} onHide={handleClose}>
    //             <Modal.Header closeButton closeVariant='white' id='new-file-header'>
    //                 <Modal.Title id='new-file-title'>Create A New Game!</Modal.Title>
    //             </Modal.Header>
    //             <Modal.Body id='new-file-body'>
    //                 <GameSessionForm
    //                     handleChange={onChange}
    //                     handleSubmit={onSubmit}
    //                 />
    //             </Modal.Body>
    //         </Modal>
    //     </>
    // )
    return (
        <></>
    )
}

export default AddPlayerModal