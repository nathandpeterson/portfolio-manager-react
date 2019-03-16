import React, { Component, Fragment } from 'react'
import { Modal } from 'react-materialize'
import Login from './Login'
import Nav from './Nav'

class InitiateLogin extends Component {

  render(){

  return (
    <Fragment>
      <Nav />
      <br />
      <Modal header='Login in to manage photos'
                trigger={
                <div className='flex-center'>
                  <btn className='btn #03a9f4 light-blue waves-light waves-effect'>
                    LOG IN
                  </btn>
                </div>
                }
        >
            <Login />
        </Modal>

    </Fragment>
    
  )
  }
}

export default InitiateLogin

