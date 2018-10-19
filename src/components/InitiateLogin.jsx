import React, { Component } from 'react'
import { Modal, Button, Icon } from 'react-materialize'
import Login from './Login'

class InitiateLogin extends Component {

  render(){

  return (
    <Modal header='login-modal'
                trigger={
                <Button><Icon>person</Icon></Button>}>
            <Login />
    </Modal>
  )
  }
}

export default InitiateLogin

