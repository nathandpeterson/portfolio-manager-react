import React, { useState, Fragment } from 'react'
import Modal from 'react-modal'
import Login from './Login'
import Nav from './Nav'

Modal.setAppElement('#root')

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    width                 : '60%',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export const InitiateLogin = () => {
  const [modalState, setModalState] = useState(false)

    return (
      <Fragment>
        <Nav />
        <br />
        <div className='flex-center'>
         {!modalState && <button 
            className='btn #03a9f4 light-blue waves-light waves-effect'
            onClick={() => setModalState(!modalState)}
          > LOG IN
          </button>}
        </div>
        <Modal
          isOpen={modalState} 
          contentLabel={'Log in'}
          style={customStyles}
        >
          <Login closeModal={() => setModalState(false)}/>
        </Modal>
      </Fragment>
    )
  }



