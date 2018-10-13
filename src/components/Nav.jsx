import React, {Component} from 'react'
import {Navbar, NavItem, Icon} from 'react-materialize'
import {Link} from 'react-router-dom'

class Nav extends Component {

  render(){
    return (
    <Navbar className='#e0e0e0 grey lighten-2' brand='Stephen Rawls' right>
      <NavItem ><Icon>search</Icon></NavItem>
      <NavItem >
        <Link to='/photos'>
          <Icon>view_module</Icon>
        </Link>
      </NavItem>
      <NavItem ><Icon>refresh</Icon></NavItem>
      <NavItem ><Icon>more_vert</Icon></NavItem>
    </Navbar>
    )
  }
}

export default Nav