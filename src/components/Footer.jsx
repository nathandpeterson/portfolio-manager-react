import React, { Component } from 'react'
import { Icon } from 'react-materialize'
import { Link } from 'react-router-dom'

class Footer extends Component {

  render() {
    return (
      <div className='header flex-center'>
        <Link to='/email'>
         <h6>CONTACT</h6> 
        </Link>
      </div>
    )
  }
}

export default Footer