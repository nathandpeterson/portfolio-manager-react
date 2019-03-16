import React, { Component } from 'react'
import { connect } from 'react-redux'
import Nav from './Nav'
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
    <div className={'flex-center'}>
        <input
          className='materialize-textarea'
          value={this.state.about}
          onChange={(e) => this.setState({about: e.target.value})}
        />
    </div>
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
          <h5>About the Artist</h5>
        </div>
        <div className='flex-center header'>{this.state.response}</div>
        {this.state.editMode ? 
          this.renderBioInput() 
          : 
          this.renderBio(about)
        }
        {localStorage.getItem('token') &&
          <div className='flex-center' style={{marginTop: '2rem'}}>
            <button
              className='btn #03a9f4 light-blue waves-light waves-effect'
              onClick={() => this.setState({ editMode: !editMode})}
            >{editMode ? 'CANCEL' : 'CHANGE BIO'} 
            </button> 
          </div>
        }
        {editMode && <div className='flex-center' style={{marginTop: '2rem'}}>
          <button
            className='btn #03a9f4 light-blue'
            onClick={() => this.props.updateInformation({about}, this.success)}
          >SAVE
          </button> 
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