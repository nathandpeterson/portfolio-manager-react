import React, { Component, Fragment } from 'react'
import { Modal, Button, Icon } from 'react-materialize'
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
                  <Button>
                    LOG IN
                  </Button>
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

