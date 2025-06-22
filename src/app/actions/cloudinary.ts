
'use server';

import { v2 as cloudinary } from 'cloudinary';

// --- IMPORTANT ---
// Configure Cloudinary with your credentials.
// 1. Create a Cloudinary account at https://cloudinary.com/
// 2. Find your "Cloud Name", "API Key", and "API Secret" in your dashboard.
// 3. Add them to your .env.local file.
//
// .env.local
// CLOUDINARY_CLOUD_NAME=your_cloud_name
// CLOUDINARY_API_KEY=your_api_key
// CLOUDINARY_API_SECRET=your_api_secret

if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  console.warn(
    'Cloudinary credentials are not set. Image uploads will fail. Please check your .env.local file.'
  );
} else {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}


export async function uploadImage(formData: FormData) {
  const file = formData.get('file') as File;

  if (!file || file.size === 0) {
    return { success: false, error: 'No file provided.' };
  }
  
  console.log('Attempting to upload image. Cloudinary configured:', !!cloudinary.config().cloud_name);


  // Double-check config before upload attempt
  if (!cloudinary.config().cloud_name) {
    return { success: false, error: 'Cloudinary is not configured. Please check server logs for details.' };
  }

  try {
    const fileBuffer = await file.arrayBuffer();
    const mime = file.type;
    const encoding = 'base64';
    const base64Data = Buffer.from(fileBuffer).toString('base64');
    const fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;

    const result = await cloudinary.uploader.upload(fileUri, {
      folder: 'portfolio_experience_logos',
    });

    if (result.secure_url) {
      return { success: true, url: result.secure_url };
    } else {
      return { success: false, error: 'Cloudinary upload failed.' };
    }
  } catch (error: any) {
    console.error('Cloudinary Upload Error:', error);
    let errorMessage = 'An unknown error occurred during upload.';
    // Handle Cloudinary's specific error object structure or a standard Error
    if (error && error.message) {
      errorMessage = error.message;
    }
    return { success: false, error: errorMessage };
  }
}
