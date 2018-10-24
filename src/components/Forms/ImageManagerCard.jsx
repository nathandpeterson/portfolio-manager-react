import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, Transformation } from 'cloudinary-react'
import { Button, Icon } from 'react-materialize'


class ImageManagerCard extends Component {

  constructor(){
    super()

    this.state = {
      editMode: false
    }
  }

  renderButtonGroup = () => {
    const { editMode } = this.state
    if(!editMode) {
      return (
      <div className='flex-center'>
        <Button onClick={() => this.setState({editMode: true})}>
          <Icon>
            edit
          </Icon>
        </Button>
      </div> 
    )} else return (
      <div className='flex-space-between'>
        <Button onClick={() => this.setState({editMode: false})}>
          CANCEL
        </Button>
        <Button onClick={() => console.log('save')}>
          SAVE
        </Button>
      </div> 
    )
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

  render(){
    
    const { publicId, angle, id } = this.props.imageData
    return (
      <div key={`image-thumbnail-${publicId}`} className='image-card-manage'>
        
          <Image publicId={publicId} width='200px'>
            <Transformation angle={angle}/>
          </Image>
          <div style={{marginTop: '1rem'}}>
            {this.fieldConfig.map(field => {
              return this.renderImageData(field, this.props.imageData)
            })}
          </div>
          {this.renderButtonGroup()}
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