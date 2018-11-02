import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Image } from 'cloudinary-react'
import Nav from './Nav'
import { getInformation } from '../actions'
import { Preloader } from 'react-materialize'

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
      <div  className='flex-center' >
        <Image
            className='full-image'  
            width='650px'
            style={{alignSelf: 'center'}}
            publicId={homepage_image}>
        </Image>

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

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)