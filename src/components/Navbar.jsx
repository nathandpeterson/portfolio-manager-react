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
  alignItems: 'center'
}

const iconStyle = {
  padding: '0 1rem',
  color: '#989898'
}

class Navbar extends PureComponent {

  render(){
    return (
      <Fragment>
        <hr style={navBorderStyles}/>
        <div style={navStyle}>
        <Link style={iconStyle} to='/'>
            <Icon tiny>view_module</Icon>
          </Link>
          <Link style={iconStyle} to='/email'>
            <Icon tiny>mail_outline</Icon>
          </Link>
         
        </div>
        <hr style={{...navBorderStyles } } />

      </Fragment>
      
    )
  }

}

export default Navbar