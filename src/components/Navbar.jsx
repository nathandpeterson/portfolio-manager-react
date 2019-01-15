import React, { PureComponent, Fragment } from 'react'
import { Icon } from 'react-materialize'
import { Link, withRouter } from 'react-router-dom'

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

const backArrow = {
  padding: '0 1rem',
  display: 'inline',
  color: '#989898',
  flexGrow: '5'
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

  renderBackArrow(){
    // check if we are on a nested route
   const { id, albumId } = this.props.match.params
   if(id && albumId){
     return (
     <Link style={backArrow} to={`/collections/${albumId}`}>
        &larr;
     </Link>
     )
   } else if (id) {
    return (
      <Link style={backArrow} to={`/collections`}>
         &larr;
      </Link>
      )
   }
  }

  render(){
    return (
      <Fragment>
        <hr style={navBorderStyles}/>
        <div style={navStyle}>
          {this.renderBackArrow()}
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

export default withRouter(Navbar)