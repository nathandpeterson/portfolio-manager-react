import React, { Component, Fragment } from 'react'
import { Row, Col, Input, Button, Icon } from 'react-materialize'
import Nav from '../Nav'
import { sendEmail } from '../../actions'
import { connect } from 'react-redux'

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
    <Fragment>
      <Row>
        <Col s={3} />
        <Input
          s={6}
          value={this.state.name}
          onChange={(e) => this.setState({ name: e.target.value })}
          label={'Your Name'} />
      </Row>
      <Row>
        <Col s={3} />
        <Input
          s={6}
          label="Your Email"
          type='email'
          validate
          value={this.state.email}
          onChange={(e) => this.setState({ email: e.target.value })}
        />
      </Row>
      <Row>
        <Col s={3} />
        <Input label={'Message'}
          s={6}
          onChange={(e) => this.setState({ emailContent: e.target.value })}
          placeholder='Write your message here...'
          type='textarea' />
      </Row>
    </Fragment>
  )

  renderError = () => (
    <div className='flex-center'>
      <h5 style={{ fontWeight: 400 }}>
        There was an error sending your message. Please try again.
        <Button className='#03a9f4 light-blue'
          onClick={() => this.setState({ error: false, messageSent: false })}
        >TRY AGAIN
        </Button>
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
          {!messageSent && <Button className='#03a9f4 light-blue'
            onClick={() => {
              const { emailContent, email, name } = this.state
              this.props.sendEmail({ emailContent, email, name, messageSent: true, message: '' })
            }
            }> <Icon>
              email
                </Icon>
          </Button>
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