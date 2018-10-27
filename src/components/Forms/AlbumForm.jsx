import React, { Component } from 'react'
import { Row, Col, Input, Button } from 'react-materialize'
import Nav from '../Nav'
import { saveAlbum } from '../../actions'
import { connect } from 'react-redux'


class AlbumForm extends Component {

  constructor(){
    super()

    this.state = {
      album_name: '',
      album_description: ''
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.album !== prevProps.album) {
      
    }
  }

  handleUpload = async () => {
    await this.props.handleUpload(this.state)
  }

  render(){
    return (
      <div>
        <Nav />
        <br />
        <Row>
          <Col s={3}/>
          <Input 
                  s={6}
                  onChange={(e) => this.setState({album_name: e.target.value})}
                  placeholder={'Year or Theme'}
                  label={'Collection Name'}/>
        </Row>
        <Row>
          <Col s={3}/>
          <Input  label={'Collection Description'} 
                  s={6}
                  onChange={(e) => this.setState({album_description: e.target.value})}
                  placeholder='You are not required to write a description.'  
                  type='textarea' />
        </Row>
        <Row>
          <Col s={10}></Col>
          <Col s={1}>
            <Button   large 
                      className='#80deea cyan lighten-1' 
                      waves='light'
                      id="upload_widget_opener"
                      onClick={this.handleUpload}
              >
                  SAVE
              </Button>
          </Col>
        </Row>       
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => (
  { handleUpload: (albumData) => dispatch(saveAlbum(albumData)) }
)

const mapStateToProps = state => (
  { album: state.albums }
)

export default connect(mapStateToProps, mapDispatchToProps)(AlbumForm)