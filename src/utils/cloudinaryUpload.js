// src/utils/cloudinaryUpload.js
import axios from 'axios';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dfmgvui9m/image/upload';
const UPLOAD_PRESET = 'profile_upload'; // Replace this with your preset

export const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);

  try {
    const response = await axios.post(CLOUDINARY_URL, formData);
    return response.data.secure_url; // This is the uploaded image URL
  } catch (error) {
    console.error('Upload Error:', error);
    return null;
  }
};
