import React, { Component } from 'react'
import { connect } from 'react-redux'
import Nav from './Nav'
import { Button, Input, Row, Col } from 'react-materialize'
import { getInformation, updateInformation } from '../actions'

const bio = "Stephen Rawls earned a BFA from Pratt Institute and an MA St John's College. He lives in Philadelphia, PA."

class AboutArtist extends Component {

  constructor(){
    super()

    this.state = {
      about: '',
      editMode: false,
      response: ''
    }
  }

  async componentDidMount(){
    await this.props.fetchInformation()
    const {about} = this.props.information 
    about ? this.setState({ about }) : this.setState({about: bio})
  }

  renderBio = (about) => (
    <div className='flex-center'>      
      <p>{about}</p>
    </div>
  )

  renderBioInput = () => (
    <Row>
      <Col s={3}/>
      <Input  label={'Collection Description'} 
              s={6}
              defaultValue={this.state.about}
              onChange={(e) => this.setState({about: e.target.value})}
              placeholder="Stephen Rawls earned a BFA from Pratt Institute and an MA St John's College. He lives in Philadelphia, PA."
              type='textarea' />
    </Row>
  )

  success = () => {
    this.setState({response: 'Success!'})
    setTimeout(() => {
      this.setState({editMode: false})
    }, 1000);
  }

  render(){
    const { editMode, about } = this.state
    return (
    <div>
       <Nav />
        <div className='flex-center header'>
          <h5 style={{fontWeight: '300'}}>About the Artist</h5>
        </div>
        <div className='flex-center header'>{this.state.response}</div>
        {this.state.editMode ? 
          this.renderBioInput() 
          : 
          this.renderBio(about)
        }
        {localStorage.getItem('token') &&
        <div className='flex-center' style={{marginTop: '2rem'}}>
          <Button
            className='#03a9f4 light-blue'
            onClick={() => this.setState({ editMode: !editMode})}
          >{editMode ? 'CANCEL' : 'CHANGE BIO'} 
          </Button> 
        </div>
        }
        {editMode && <div className='flex-center' style={{marginTop: '2rem'}}>
          <Button
            className='#03a9f4 light-blue'
            onClick={() => this.props.updateInformation({about}, this.success)}
          >SAVE
          </Button> 
        </div>}
        
    </div>
    )
  }
}

const mapStateToProps = state => {
  return { 
    information : state.information 
  }
}

const mapDispatchToProps = dispatch => (
  {
    fetchInformation: () => dispatch(getInformation()),
    updateInformation: (information, cb) => dispatch(updateInformation(information, cb))
  }
)


export default connect(mapStateToProps, mapDispatchToProps)(AboutArtist)