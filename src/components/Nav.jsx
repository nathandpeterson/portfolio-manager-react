import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'

class Nav extends Component {

  render(){
    return (
      <div  className='flex-center'>
        <h4 className='heading' 
            onClick={() =>this.props.history.push('/')}>
              STEPHEN RAWLS
        </h4>
      </div>
    )
  }
}

export default withRouter(Nav)
