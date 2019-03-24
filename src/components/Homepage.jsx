import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Image, Transformation } from 'cloudinary-react'
import Nav from './Nav'
import { getInformation } from '../actions'
import { Preloader } from 'react-materialize'
import { withRouter } from 'react-router-dom'

class Homepage extends PureComponent {

  async componentDidMount(){
    await this.props.fetchInformation()
  }

  renderSpinner = () => (
    <div className='flex-center'>
      <Preloader />
    </div>
  )
  

  render(){
    const { homepage_image } = this.props.information
    if(!homepage_image) return this.renderSpinner()
    return (
      <div>
      <Nav/>
      <div  className='flex-center animated fadeIn' 
            style={{marginTop: '3rem'}} 
            onClick={() => this.props.history.push('/collections')}>
        <Image
            className='full-image'  
            width='500px'
            alt={'Painting by Stephen Rawls'}
            style={{alignSelf: 'center'}}
            publicId={homepage_image}>
            <Transformation width="500" height="auto" dpr="auto" />
            <Transformation quality="60" />
        </Image>
       
      </div>
      {/* <div  className='flex-center animated fadeIn heading-secondary'
            onClick={() => this.props.history.push('/collections')}>
          Click to view paintings
      </div> */}
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