import React, { Component } from 'react'
import { Row, Input, Icon, Button } from 'react-materialize'
import axios from 'axios'

class Login extends Component {

  constructor(){
    super()

    this.state = {
      email: '',
      password: '',
      error: ''
    }
  }

  componentDidMount() {
    const isVerified = this.hasToken()
    this.setState({isVerified})
  }

  hasToken = () => {
    return localStorage.getItem('token') ? true : false
  }

  setToken = (data) => {
    const {token} = data
    localStorage.setItem('token', token)
  }

  handleLogin = async () => {
    const {email, password} = this.state
    if(!email || !password) {
      this.showError()
      return
    }
    try {
      const { data } = await axios.post(`http://localhost:4000/api/login`, {email, password})
      this.setToken(data)
    } catch(err){
      this.setState({error: 'Something went wrong'})
    }
  }

  showError(){
    setTimeout(() => {
      this.setState({error: ''})
    }, 1500)
    return (
      <Row>
        <div className='flex-center'>
          Something went wrong
        </div>
      </Row>
    )
  }

  render(){

    return (
      this.state.error ? this.showError() : 
      <div>
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
      </div>
    )
  }
}

export default Login