import React, { Component } from 'react'
import { Row, Col, Input, Button, Modal } from 'react-materialize'
import Nav from '../Nav'
import { saveAlbum, fetchOneAlbum, updateAlbum, deleteAlbum } from '../../actions'
import { connect } from 'react-redux'


class AlbumForm extends Component {

  constructor(){
    super()

    this.state = {
      album_name: '',
      album_description: '',
      id: null
    }
  }

  componentDidMount = async () => {
    const { id } = this.props.match.params
    if(id) {
      await this.props.fetchOneAlbum(id)
      const { album_name, album_description } = this.props.album
      this.setState({album_name, album_description, id})
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.album.id !== prevProps.album.id){
      const { album_name, album_description } = this.props.album
      this.setState({album_name, album_description})
    }
  }

  handleUpload = async () => {
    if(!this.state.id){
      const { album_name, album_description } = this.state
      await this.props.handleUpload({album_name, album_description})
    } else {
      await this.props.updateAlbum(this.state)
    }
  }

  renderDeleteButtonWrapper = () => {
    if(!this.state.id || this.props.album.images.length) { 
      return <div />
    } else {
      return (
          <Modal header='Are you sure you want to delete this collection?'
                trigger={this.renderDeleteButton()}>
                <div className='flex-center'>
                  <Button className='red'
                          onClick={() => {
                            this.props.deleteAlbum(this.state.id, () => this.props.history.push('/'))}}
                            >DELETE</Button>
                </div> 
          </Modal>
      )
    }
  }

  renderDeleteButton = () => {
    return (
      <Col s={1}>
        <Button     large 
                      className='red'
                      waves='light'
                      >DELETE
          </Button>
      </Col>
        
    )
  }

  render(){
    console.log('this state', this.state)
    console.log('props', this.props.album)
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
                  value={this.state.album_name}
                  label={'Collection Name'}/>
        </Row>
        <Row>
          <Col s={3}/>
          <Input  label={'Collection Description'} 
                  s={6}
                  value={this.state.description}
                  onChange={(e) => this.setState({album_description: e.target.value})}
                  placeholder='You are not required to write a description.'  
                  type='textarea' />
        </Row>
        <Row>
          {this.renderDeleteButtonWrapper()}
          <Col s={9}></Col>  
          <Col s={1}>
            <Button   large 
                      className='#03a9f4 light-blue'
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
  { handleUpload: (albumData) => dispatch(saveAlbum(albumData)),
    fetchOneAlbum: (id) => dispatch(fetchOneAlbum(id)),
    updateAlbum: (albumData) => dispatch(updateAlbum(albumData)),
    deleteAlbum: (id, cb) => dispatch(deleteAlbum(id, cb))
  }
)

const mapStateToProps = state => (
  { album: state.album }
)

export default connect(mapStateToProps, mapDispatchToProps)(AlbumForm)