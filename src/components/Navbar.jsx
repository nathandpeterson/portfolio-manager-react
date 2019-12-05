import React, { PureComponent, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import {ReactComponent as MailOutline} from '../images/EmailOutline.svg'
import {ReactComponent as ViewModule} from '../images/ViewModule.svg'
import {ReactComponent as AccountCircle} from '../images/AccountCircle.svg'
import {ReactComponent as ExitToApp} from '../images/ExitToApp.svg'
import { ICON_COLOR_GRAY as ICON_COLOR } from '../utils/Constants'

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
          <ExitToApp fill={ICON_COLOR} />
        </Link>
      )
    } else {
      return (
          <a target="_blank" href={`mailto:s2rawls@gmail.com`} style={iconStyle}>
            <MailOutline fill={ICON_COLOR} />
          </a>
      )
    }
  }

  renderInfo(){
    return (
      <Link style={iconStyle} to='/about'>
          <AccountCircle fill={ICON_COLOR} />
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
        <div className='nav-icon-container' style={navStyle}>
          {this.renderBackArrow()}
          {this.renderInfo()}
          <Link style={iconStyle} to='/collections'>
              <ViewModule fill={ICON_COLOR} />
          </Link>
          {this.renderMailOrLogout()}
        </div>
        <hr style={{...navBorderStyles } } />

      </Fragment>
      
    )
  }

}

export default withRouter(Navbar)