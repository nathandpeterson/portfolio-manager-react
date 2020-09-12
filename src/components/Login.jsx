import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {ReactComponent as LockPlus} from '../images/LockPlus.svg'
import {ReactComponent as AccountCircle} from '../images/AccountCircle.svg'
import { ICON_COLOR_GRAY as ICON_COLOR } from '../utils/Constants'
// TODO : migrate to redux...
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
      this.props.closeModal()
    }, 1500)
    return (
      <div>
        <div className='flex-center'>
          {this.renderMessageContent()}
        </div>
      </div>
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
      <div className='modal-container'>
        <div className='close-modal-container'>
          <button
            className='close-modal'
            onClick={() => this.props.closeModal()}>
            X
          </button>
        </div>
        <div className='flex-space-between'>
          <div className='flex-space-between flex-align' style={{width: '100%'}}>
            <AccountCircle fill={ICON_COLOR} size={40}/>
            <div className='input-field'>
              <input
                    type='email'
                    id='email_input' 
                    value={this.state.email}
                    onChange={(e) => this.setState({ email: e.target.value})} />
              <label htmlFor="email_input">Email</label>
            </div>
            
          </div>
          <div className='flex-space-between flex-align' style={{width: '100%'}}>
            <LockPlus fill={ICON_COLOR} size={40}/>
            <div className='input-field'>
              <input
                      id={'password_input'}                    
                      type='password'
                      value={this.state.password}
                      onChange={(e) => this.setState({password: e.target.value})}/>
              <label htmlFor="password_input">Password</label>
            </div>
          </div>
        </div>
        <div>
          <div className='flex-center'>
            <button 
              className='btn #03a9f4 light-blue waves-light waves-effect' 
              onClick={this.handleLogin}>SUBMIT</button>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Login)