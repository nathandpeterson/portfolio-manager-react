import React, { PureComponent, Fragment } from 'react'
import { Icon } from 'react-materialize'
import { Link } from 'react-router-dom'

const navBorderStyles = {
  display: "block",
  height: "1px",
  border: 0,
  borderTop: "1px solid #ccc",
  padding: 0
}

const navStyle = {
  height: '10px',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
}

const iconStyle = {
  padding: '0 1rem',
  color: '#989898'
}

const invisible = {
  padding: '0 1rem',
  color: 'white',
  alignSelf: 'flex-start',
}

class Navbar extends PureComponent {

  renderMailOrLogout(){
    const token = localStorage.getItem('token')
    if(token){
      return (
        <Link style={iconStyle} to='/' 
              onClick={() => localStorage.removeItem('token')}>
          <Icon tiny>exit_to_app</Icon>
        </Link>
      )
    } else {
      return (
          <Link style={iconStyle} to='/contact'>
            <Icon tiny>mail_outline</Icon>
          </Link>
      )
    }
  }

  renderInfo(){
    return (
      <Link style={iconStyle} to='/about'>
          <Icon tiny >account_circle</Icon>
      </Link>
    )
  }

  render(){
    return (
      <Fragment>
        <hr style={navBorderStyles}/>    
        <div style={navStyle}>
          {this.renderInfo()}
          <Link style={iconStyle} to='/collections'>
              <Icon tiny>view_module</Icon>
          </Link>
          {this.renderMailOrLogout()}
        </div>
        <hr style={{...navBorderStyles } } />

      </Fragment>
      
    )
  }

}

export default Navbar