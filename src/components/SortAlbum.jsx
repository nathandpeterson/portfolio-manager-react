import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image } from 'cloudinary-react'
import { Preloader } from 'react-materialize'
import Nav from './Nav'
import { fetchOneAlbum, updateSortOrder, saveSortOrder } from '../actions'
import { withRouter } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

class SortAlbum extends Component {

  state = {message: ''}

  async componentDidMount(){
    await this.props.fetchOneAlbum(this.props.match.params.id, true)
  }

  handleDragChange = ({ draggableId, destination }) => {
    const { sortList } = this.props
    const itemToMove = sortList.find(image => image.image_id === draggableId)
    let listToMutate = sortList.filter(image => image.image_id !== draggableId)
    listToMutate.splice(destination.index, 0, itemToMove)
    listToMutate = listToMutate.map((item, i) => ({...item, sortPosition: i+1}))
    this.props.updateSortOrder(listToMutate)
  }

  onDragEnd = (result) => {
    if (!result.destination) {
      // dragged outside the valid dragging context
      return
    } else {
      this.handleDragChange(result)
    }
  }

  renderImageItem = ({image_id, publicId, name}) => {
    return (
      <div className='drag-card' key={image_id}>
        <div>
          <Image publicId={publicId} width='100px'   />
        </div>
        <div className='drag-label'>
          {image_id}
        </div>
        <div className='drag-label'>
          {name}
        </div>
      </div>
    ) 
  }

  handleSave = () => {
    const imageArray = this.props.sortList.map(({image_id, album_id, sortPosition}) => {
      return {image_id , album_id , sortPosition }
    })
    this.props.saveSortOrder(imageArray, () => this.success())
  }

  success = () => {
    this.setState({message: 'Success!'})
    setTimeout(() => {
      this.setState({message: ''})
    }, 1000);
  }

  loading = () => {
    return (
      <div className='flex-center'>
        <Preloader size='big' /> 
        LOADING SORTER
        </div>
      )
  }


  render(){
    let { sortList } = this.props
    if(!sortList) return this.loading()
    sortList = sortList.sort((a, b) => a.sortPosition - b.sortPosition)
    return (
      <div>
        <Nav />
        <div className='flex-center header'>
          <h5 style={{fontWeight:'400'}}>Sort Images</h5>
        </div>
        <div className='flex-center header'>
          {this.state.message ? <h5>{this.state.message}</h5> :
            <button className='btn #03a9f4 light-blue waves-effect waves-light'
                  onClick={this.handleSave}>
                  SAVE CHANGES
            </button>   
          } 
        </div>
        <br />
       
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div ref={provided.innerRef}>
                {sortList.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.image_id} index={index}>
                    {(provided, snapshot) => (
                      <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {this.renderImageItem(item)}
                    </div>
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => (
  { 
    updateSortOrder: (imageArray) => dispatch(updateSortOrder(imageArray)),
    fetchOneAlbum: (id, boolean) => { dispatch(fetchOneAlbum(id, boolean)) },
    saveSortOrder: (imageArray, cb) => dispatch(saveSortOrder(imageArray, cb))
  }
)


const mapStateToProps = state => (
  { sortList: state.sortList, album: state.album }
)

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(SortAlbum))

