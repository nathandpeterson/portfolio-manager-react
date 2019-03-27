import React, { Component } from 'react'
import Nav from '../Nav'
import { sendEmail } from '../../actions'
import { connect } from 'react-redux'
import MailOutline from 'rmdi/lib/MailOutline'

class EmailForm extends Component {

  constructor() {
    super()

    this.state = {
      emailContent: '',
      email: '',
      name: '',
      message: '',
      error: false,
      messageSent: false,
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.emailResponse.message && !prevProps.emailResponse.message) {
      this.handleEmailSubmission()
    }
  }

  handleEmailSubmission() {
    if (this.props.emailResponse.message === 'success') {
      this.setState({ message: 'Your email was sent. Thank you.', messageSent: true })
    } else {
      this.setState({ error: true })
      setTimeout(() => {
        this.setState({ error: false })
      }, 2500)
    }
  }

  renderContactForm = () => (
    <div style={{padding: '3rem 10rem'}}>
        <input
          placeholder={'Your name'}
          value={this.state.name}
          onChange={(e) => this.setState({ name: e.target.value })}
          />
        <input
          placeholder="Your Email"
          type='email'
          value={this.state.email}
          onChange={(e) => this.setState({ email: e.target.value })}
        />
        <textarea
          className='materialize-textarea'
          onChange={(e) => this.setState({ emailContent: e.target.value })}
          placeholder='Write your message here...'
          type='textarea' />
    </div>
  )

  renderError = () => (
    <div className='flex-center'>
      <h5 style={{ fontWeight: 400 }}>
        There was an error sending your message. Please try again.
        <button className='btn #03a9f4 light-blue'
          onClick={() => this.setState({ error: false, messageSent: false })}
        >TRY AGAIN
        </button>
      </h5>
    </div>
  )

  render() {
    const { messageSent, message } = this.state
    return (
      <div>
        <Nav />
        {!messageSent && this.renderContactForm()}
        {message && <div className='header flex-center'>
          <h5 style={{ fontWeight: 400 }}>{this.state.message}</h5>
        </div>}
        {this.state.error && this.renderError()}
        <div className='flex-center'>
          {!messageSent && 
            <button className='btn #03a9f4 light-blue'
              onClick={() => {
                const { emailContent, email, name } = this.state
                this.props.sendEmail({ emailContent, email, name, messageSent: true, message: '' })
                }
              }><MailOutline mt={'20%'}/>
            </button>
          }
        </div>
      </div>

    )
  }
}

const mapStateToProps = state => (
  { emailResponse: state.emailResponse }
)

const mapDispatchToProps = dispatch => (
  { sendEmail: (data) => { dispatch(sendEmail(data)) } }
)

export default connect(mapStateToProps, mapDispatchToProps)(EmailForm)