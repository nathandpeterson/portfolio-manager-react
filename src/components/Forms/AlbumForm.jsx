import React, { Component } from 'react'
import Modal from 'react-modal'
import '../../styles/Modal.css'
import { Transition } from 'react-transition-group'
import Nav from '../Nav'
import { saveAlbum, fetchOneAlbum, updateAlbum, deleteAlbum } from '../../actions'
import { connect } from 'react-redux'

Modal.setAppElement('#root')

const duration = 250

class AlbumForm extends Component {

  constructor(){
    super()

    this.state = {
      album_name: '',
      album_description: '',
      id: null,
      message: '',
      showModal: false
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
      this.setState({message: 'SAVING'})
      await this.props.handleUpload({album_name, album_description}, this.success())
    } else {
      const {message, showModal, ...albumData} = this.state
      await this.props.updateAlbum(albumData, this.success())
    }
  }

  success = () => {
    this.setState({message: 'Success!'})
    setTimeout(() => {
      this.setState({message: ''})
    }, 1000);
  }

  renderModal = () => (
    <Transition
      in={this.state.showModal}
      timeout={duration}>
      {state => {
        return (
          <Modal  
            isOpen={this.state.showModal}
            shouldCloseOnOverlayClick={true}
            closeTimeoutMS={duration}
            className={`modal-container modal-container-${state}`}>
            <div className='close-modal-container'>
                <button
                  className='close-modal'
                  onClick={() => this.setState({showModal:false})}>
                  X
                </button>
              </div>
              <div className='flex-center'>
                <button 
                  className='btn red'
                  onClick={() => {
                    this.setState({showModal: false})
                    this.props.deleteAlbum(this.state.id, () => this.props.history.push('/'))}}
                    >DELETE</button>
              </div> 
            </Modal>
        )}}
      </Transition>
    )

  renderDeleteButton = () => {
    return (
      <button 
        onClick={() => this.setState({showModal: true})} 
        className='btn red'>
          DELETE
      </button>
    )
  }

  render(){
    return (
      <div>
        <Nav />
        <br />
        <div className='flex-center header'>
          <h4>{this.state.message}</h4>
        </div>
        <div className='padding-container'>
          <input    className='input_2'
                    value={this.state.album_name}
                    onChange={(e) => this.setState({album_name: e.target.value})}
                    placeholder={'Year or Theme'}
                    label={'Collection Name'}/>
        
          <input    className='materialize-textarea'
                    label={'Collection Description'} 
                    value={this.state.description}
                    onChange={(e) => this.setState({album_description: e.target.value})}
                    placeholder='You are not required to write a description.'  
                     />
            {this.renderDeleteButton()}
            {this.renderModal()}
            <button 
              className='btn #03a9f4 light-blue  waves-light waves-effect'
              id="upload_widget_opener"
              onClick={this.handleUpload}
            >SAVE</button>
        </div>
        
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