import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import EnhancedEncryption from 'rmdi/lib/EnhancedEncryption'
import AccountCircle from 'rmdi/lib/AccountCircle'
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
            <AccountCircle size={40}/>
            <input
                  style={{marginTop: '1rem'}}
                  placeholder="Email" 
                  type='email' 
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value})} />
          </div>
          <div className='flex-space-between flex-align' style={{width: '100%'}}>
            <EnhancedEncryption size={40}/>
            <input
                    style={{marginTop: '1rem'}}
                    placeholder="Password" 
                    type='password'
                    value={this.state.password}
                    onChange={(e) => this.setState({password: e.target.value})}/>
          </div>
        </div>
        <div>
          <div className='flex-center'>
            <button className='btn' onClick={this.handleLogin}>SUBMIT</button>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Login)