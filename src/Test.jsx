import React from 'react'
import { Modal } from 'react-bootstrap'

const Test = () => {
  return (
    <div>
        <Modal show={ true }>
            <Modal.Body>
                <h1>Hello World !</h1>
            </Modal.Body>
        </Modal>
    </div>
  )
}

export default Test;