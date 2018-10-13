import React, {Component} from 'react'
import {Navbar, NavItem, Icon} from 'react-materialize'
import {withRouter} from 'react-router-dom'

class Nav extends Component {

  render(){
    return (
    <Navbar className='#e0e0e0 grey lighten-2' brand='Rawls' right>
      <NavItem onClick={() => this.props.history.push('/manage')}>
        <Icon>add</Icon>
      </NavItem>
      <NavItem onClick={() => this.props.history.push('/photos')} >
        <Icon>view_module</Icon>
      </NavItem>
      <NavItem ><Icon>more_vert</Icon></NavItem>
    </Navbar>
    )
  }
}

export default withRouter(Nav)