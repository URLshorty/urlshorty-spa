import React from 'react'
import Dropzone from 'react-dropzone'

export default class PictureUploadModal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      notification: '',
      files: [],
    }
  }

  // must bind
  onDrop(acceptedFiles, rejectedFiles) {
    if ( acceptedFiles.length > 0 ) {
      this.uploadPhoto(acceptedFiles[0])
      this.props.setCurrentModal(null)
    } else if ( rejectedFiles.length > 0 ) {
      this.setState({
        notification: 'Uh oh. Sorry about that. Something went wrong. Be sure to upload a picture format file that\'s less than 500KB.',
        files: acceptedFiles,
      })
    }
  }

  uploadPhoto(photo) {
    let fd = new FormData()
    fd.append('file', photo)
    fetch(`${process.env.API_URL}/api/users/${this.props.user.id}`, {
        method: 'PATCH', // must be caps
        credentials: 'include',
        body: fd,
      })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        console.log(JSON.stringify(json))
      })
      .catch((er) => console.log(er))
  }

  render() {
    return (
      <div className="modal-backdrop">
        <div className="modal">

          <div className="modal-header">
            <h1 className="login">Upload Picture</h1>
          </div>

          <div className="modal-content">

            <Dropzone
              className="dropzone"
              activeClassName="dropzone-active"
              onDrop={this.onDrop.bind(this)}
              multiple={false}
              maxSize={512000}
              accept="image/*" >
              <p>
                Drag a profile picture into this box.
              </p>
              <p>
                Or click to browse your computer.
              </p>


            </Dropzone>

          <div className="modal-notification">{this.state.notification}</div>

          </div>

          <div className="modal-footer"></div>

        </div>
      </div>
    );
  }
}
