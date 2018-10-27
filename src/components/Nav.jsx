import React, { Component, Fragment } from 'react'
import Navbar from './Navbar'
import { withRouter } from 'react-router-dom'

class Nav extends Component {

  render(){
    return (
      <Fragment>
        <div className='flex-center'>
          <h4 className='heading'
            onClick={() => this.props.history.push('/')}>
            STEPHEN RAWLS
        </h4>
        </div>
        <Navbar />
      </Fragment>
     
    )
  }
}

export default withRouter(Nav)
