import React, {Component, Fragment} from 'react'
import {Navbar, NavItem, Icon, Modal} from 'react-materialize'
import {withRouter} from 'react-router-dom'

class Nav extends Component {

  render(){
    return (
    <Fragment>
      <Navbar className='#e0e0e0 grey lighten-2' brand='Rawls' right>
        <NavItem onClick={() => this.props.history.push('/manage')}>
          <Icon>add</Icon>
        </NavItem>
        <NavItem onClick={() => this.props.history.push('/photos')} >
          <Icon>view_module</Icon>
        </NavItem>
        <NavItem>
          <Icon >more_vert</Icon>
        </NavItem>
        
        
    </Navbar>          
    </Fragment>
    
    )
  }
}

export default withRouter(Nav)