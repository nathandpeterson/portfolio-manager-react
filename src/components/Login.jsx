import React, { Component, Fragment } from 'react'
import { Row, Input, Icon, Button } from 'react-materialize'

class Login extends Component {

  constructor(){
    super()

    this.state = {
      email: '',
      password: ''
    }
  }

  handleLogin = () => {
    console.log('this state', this.state)
  }

  render(){

    return (
      <Fragment>
        <Row>
          <Input 
                s={6} 
                label="Email" 
                type='email' 
                validate 
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value})}>
            <Icon>account_circle</Icon>
          </Input>
          <Input  s={6} 
                  label="Password" 
                  validate 
                  type='password'
                  value={this.state.password}
                  onChange={(e) => this.setState({password: e.target.value})}>
            <Icon>enhanced_encryption</Icon>
          </Input>
        </Row>
        <Row>
          <div className='flex-center'>
            <Button onClick={this.handleLogin}>SUBMIT</Button>
          </div>
        </Row>
      </Fragment>
    )
  }
}

export default Login