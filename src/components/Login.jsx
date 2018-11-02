import React, { Component } from 'react'
import { Row, Input, Icon, Button } from 'react-materialize'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
const SERVER = process.env.REACT_APP_SERVER

class Login extends Component {

  constructor(){
    super()

    this.state = {
      email: '',
      password: '',
      error: '',
      message: '',
      showMessage: false
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
      const { data } = await axios.post(`${SERVER}/login`, {email, password})
      this.setToken(data)
      this.setState({message: 'Success', showMessage: true})
    } catch(err){
      this.setState({error: 'You seem to have entered the wrong credentials...', showMessage: true})
    }
  }

  showMessage(){
    setTimeout(() => {
      this.setState({error: '', message: '', showMessage: false})
    }, 1500)
    return (
      <Row>
        <div className='flex-center'>
          {this.renderMessageContent()}
        </div>
      </Row>
    )
  }

  renderMessageContent(){
    const { error, message } = this.state
    if(error){
      return <h5 style={{color: 'red'}}>{error}</h5>
    } else {
      return <h5>{message}</h5>
    }
  }

  render(){

    return (
      this.state.showMessage ? this.showMessage() : 
      <div>
        <Row>
          <Input 
                s={6} 
                label="Email" 
                type='email' 
                validate 
                value={this.state.email}
                defaultValue=''
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

export default withRouter(Login)