import React, {Component} from 'react'
import {Navbar, NavItem, Icon} from 'react-materialize'

class Nav extends Component {

  render(){
    return (
    <Navbar className='#e0e0e0 grey lighten-2' brand='Stephen Rawls' right>
      <NavItem href='get-started.html'><Icon>search</Icon></NavItem>
      <NavItem href='get-started.html'><Icon>view_module</Icon></NavItem>
      <NavItem href='get-started.html'><Icon>refresh</Icon></NavItem>
      <NavItem href='get-started.html'><Icon>more_vert</Icon></NavItem>
    </Navbar>
    )
  }
}

export default Nav