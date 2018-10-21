import { cloud_name, upload_preset } from '../config/config'

export const uploadWidget = () => {
  window.cloudinary.openUploadWidget({ cloud_name, upload_preset },
      function(error, result) {
          console.log(result);
      });
}