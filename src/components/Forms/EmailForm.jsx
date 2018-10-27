import React, { Component } from 'react'
import { Row, Col, Input, Button, Icon } from 'react-materialize'
import Nav from '../Nav'
import { sendEmail } from '../../actions'
import { connect } from 'react-redux'

class EmailForm extends Component {

  constructor(){
    super()

    this.state = {
      emailContent: '',
      email: '',
      name: ''
    }
  }

  render(){
    return (
      <div>
        <Nav />
        <Row>
          <Col s={3}/>
          <Input 
                  s={6}
                  value={this.state.name}
                  onChange={(e) => this.setState({name: e.target.value})}
                  label={'Your Name'}/>
        </Row>
        <Row>
          <Col s={3}/>
          <Input 
                 s={6} 
                 label="Your Email" 
                 type='email' 
                 validate 
                 value={this.state.email}
                 onChange={(e) => this.setState({ email: e.target.value})}
                 />
        </Row>
        <Row>
          <Col s={3}/>
          <Input  label={'Message'} 
                  s={6}
                  onChange={(e) => this.setState({emailContent: e.target.value})}
                  placeholder='Write your message here...'  
                  type='textarea' />
        </Row>
        <div className='flex-center'>
          <Button onClick={() => this.props.sendEmail(this.state)}>
            <Icon>
              email
            </Icon>
          </Button>
        </div>
      </div>
      
    )
  }
}

const mapStateToProps = state => (
  {emailRespose: state.emailResponse}
)

const mapDispatchToProps = dispatch => (
  { sendEmail: (data) => { dispatch(sendEmail(data)) } }
)

export default connect(mapStateToProps, mapDispatchToProps)(EmailForm)