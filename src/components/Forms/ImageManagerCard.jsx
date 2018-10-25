import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, Transformation } from 'cloudinary-react'
import { Button, Icon } from 'react-materialize'
import ImageForm from './ImageForm';


class ImageManagerCard extends Component {

  constructor(){
    super()

    this.state = {
      editMode: false
    }
  }

  fieldConfig = [
    {label: 'TITLE', fieldName: 'name'},
    {label: 'DESCRIPTION', fieldName: 'description'},
    {label: 'DATE', fieldName: 'date'},
    {label: 'SIZE', fieldName: 'size'}
  ]

  renderImageData = (field, data) => {
    const { fieldName, label } = field
    return (
      <div key={`${data.publicId}-${fieldName}`} className='image-field'>
        <label>{label}</label>
        <span>{data[fieldName]}</span>
      </div>
    )
  }

  toggleEditMode = (boolean) => {
    this.setState({editMode: boolean})
  }

  render(){
    const { editMode } = this.state
    const { publicId, angle, id } = this.props.imageData
    return (
      <div key={`image-thumbnail-${publicId}`} className='image-card-manage'>
        
          <Image publicId={publicId} width='200px'>
            {angle ? <Transformation angle={angle}/> : ''}
          </Image>
          <div style={{marginTop: '1rem'}}>
            {editMode ?
            <ImageForm  exists={true}
                        editMode={editMode}
                        toggleEditMode={this.toggleEditMode}
                        imageData={this.props.imageData}/> : 
            this.fieldConfig.map(field => this.renderImageData(field, this.props.imageData))}
          </div>
          {editMode ? '' :   
      <div className='flex-center'>
        <Button onClick={() => this.toggleEditMode(true)}>
          <Icon>
            edit
          </Icon>
        </Button>
      </div> 
    }
      </div>
      
    )
  }
}

// const mapDispatchToProps = dispatch => (
//   { fetchOneAlbum: (id) => { dispatch(fetchOneAlbum(id)) } }
// )

const mapStateToProps = state => (
  { album: state.album }
)

export default connect(null, mapStateToProps )(ImageManagerCard)