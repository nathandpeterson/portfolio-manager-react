import React, { Component } from 'react'
import { connect } from 'react-redux'
import Nav from './Nav'
import { getInformation } from '../actions'

class AboutArtist extends Component {

  render(){
    return (
    <div>
        <div >
          <Nav />
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

const mapDispatchToProps = dispatch => (
  {
    fetchInformation: () => dispatch(getInformation())
  }
)


export default connect(mapStateToProps, mapDispatchToProps)(AboutArtist)