import React, { Component } from 'react'
import { Row, Col, Input } from 'react-materialize'

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
                 label="Email" 
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
                  placeholder='You are not required to write a description.'  
                  type='textarea' />
        </Row>
      </div>
      
    )
  }
}

export default EmailForm