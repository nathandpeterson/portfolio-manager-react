import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, Transformation } from 'cloudinary-react'
import Nav from './Nav'
import { getInformation } from '../actions'
import { Preloader } from '../shared'
import { withRouter } from 'react-router-dom'

class Homepage extends Component {

  state = {
    exiting: false
  }

  async componentDidMount(){
    await this.props.fetchInformation()
  }

  renderSpinner = () => {
    return (
      <div className='flex-center'>
        <Preloader />
      </div>
  )}

  handleExit = () => {
    this.setState({ exiting: true })
    setTimeout(() => {
      this.setState({ exiting: false })
      this.props.history.push('/collections')
    }, 400)
  }
  

  render(){
    const { homepage_image } = this.props.information
    const { exiting } = this.state
    return (
      <div>
      <Nav/>
      <div  className='flex-center' 
            style={{marginTop: '1rem'}} 
            onClick={this.handleExit}>
        {homepage_image ?
          <Image
              className={`full-image ${exiting ? 'big-exit' : ''}`}  
              height='500px'
              alt={'Painting by Stephen Rawls'}
              style={{alignSelf: 'center'}}
              publicId={homepage_image}>
              <Transformation height="500" width="auto" dpr="auto" />
              <Transformation quality="60" />
          </Image> :
          this.renderSpinner()
        }
      </div>
    </div>
    )
  }
}

const mapStateToProps = state => {
  return { 
    information : state.information 
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchInformation: () => dispatch(getInformation())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Homepage))