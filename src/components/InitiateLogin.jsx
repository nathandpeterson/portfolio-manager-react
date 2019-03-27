import React, { useState, Fragment } from 'react'
import { Transition } from "react-transition-group"
import Modal from 'react-modal'
import Login from './Login'
import Nav from './Nav'
import '../styles/Modal.css'

Modal.setAppElement('#root')

const duration = 200

export const InitiateLogin = () => {
  const [modalState, setModalState] = useState(false)
  const handleModalClose = () => setModalState(false)
    
    return (
      <Fragment>
        <Nav />
        <br />
        <div className='flex-center'>
         {!modalState && 
          <button 
            className='btn #03a9f4 light-blue waves-light waves-effect'
            onClick={() => setModalState(true)}
          > LOG IN
          </button>
          }
        </div>
        <Transition 
          in={modalState}
          timeout={duration}>
          {state => {
            return (
              <Modal  
                contentLabel={'Log in'}
                isOpen={modalState}
                closeTimeoutMS={duration}
                className={`modal-container modal-container-${state}`}
              >
                <Login closeModal={handleModalClose} />
              </Modal>
          )}
        }
        </Transition> 
      </Fragment>
    )
  }
