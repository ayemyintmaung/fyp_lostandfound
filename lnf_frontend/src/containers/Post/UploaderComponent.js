import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';
import axios from 'axios';

let uploading = false;

class UploaderComponent extends Component {

  state = {
    imagePath: null
  }
  handleUpload = (pictures) => {
    if (!pictures || pictures.length === 0) {
        
      this.setState({ imagePath: null });
    } else if (!uploading) {
      uploading = true;
      const data = new FormData();
      data.append('yourFieldHere', 'yourValueHere');
      data.append('image', pictures[0]);
      axios.post(`${'http://localhost:8081/api/image/'}upload`, data, { headers: {'Content-Type': 'multipart/form-data' }}).then(({ data }) => {
          this.props.parentCallback(data);
          uploading = false;
          if (data && data.length > 0) {
              this.setState({ imagePath: data[0] });
          } else {
              console.log('No URL returned');
          }
      }).catch(e => {
          uploading = false;
          console.log(e);
      });
    }
  }
  render() {
    return (
      <ImageUploader
          withPreview={true}
          buttonText='Upload image'
          onChange={this.handleUpload}
          imgExtension={['.jpg', '.gif', '.png', '.gif']}
          maxFileSize={5242880}
          singleImage={true}
      />
    )
  }
}

export default UploaderComponent;