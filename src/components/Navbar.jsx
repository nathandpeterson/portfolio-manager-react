import React, { PureComponent, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import AccountCircle from 'rmdi/lib/AccountCircle'
import ExitToApp from 'rmdi/lib/ExitToApp'
import ViewModule from 'rmdi/lib/ViewModule'
import MailOutline from 'rmdi/lib/MailOutline'

const navBorderStyles = {
  display: "block",
  height: "1px",
  border: 0,
  borderTop: "1px solid #ccc",
  padding: 0
}

const navStyle = {
  height: '25px',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
}

const iconStyle = {
  padding: '0 1rem',
  color: '#707070',
  display: 'flex',
  alignItems: 'center'
}

const backArrow = {
  padding: '0 1rem',
  display: 'inline',
  color: '#707070',
  flexGrow: '5',
  fontSize: '20px'
}

class Navbar extends PureComponent {

  renderMailOrLogout(){
    const token = localStorage.getItem('token')
    if(token){
      return (
        <Link style={iconStyle} to='/' 
              onClick={() => localStorage.removeItem('token')}>
          <ExitToApp />
        </Link>
      )
    } else {
      return (
          <Link style={iconStyle} to='/contact'>
            <MailOutline />
          </Link>
      )
    }
  }

  renderInfo(){
    return (
      <Link style={iconStyle} to='/about'>
          <AccountCircle/>
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
              <ViewModule />
          </Link>
          {this.renderMailOrLogout()}
        </div>
        <hr style={{...navBorderStyles } } />

      </Fragment>
      
    )
  }

}

export default withRouter(Navbar)