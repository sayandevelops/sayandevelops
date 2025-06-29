
'use server';

import { v2 as cloudinary } from 'cloudinary';

// --- IMPORTANT ---
// This function relies on environment variables.
// Ensure your .env.local file (for local development) and your
// Vercel project settings (for production) have the correct values for:
// CLOUDINARY_CLOUD_NAME
// CLOUDINARY_API_KEY
// CLOUDINARY_API_SECRET
// CLOUDINARY_UPLOAD_PRESET

function configureCloudinary() {
    const isConfigured = 
        !!process.env.CLOUDINARY_CLOUD_NAME &&
        !!process.env.CLOUDINARY_API_KEY &&
        !!process.env.CLOUDINARY_API_SECRET &&
        !!process.env.CLOUDINARY_UPLOAD_PRESET;

    if (!isConfigured) {
        console.warn(
            'Cloudinary credentials or upload preset are not set. Image uploads will fail. Please check your environment variables.'
        );
        return false;
    }

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true,
    });
    return true;
}

// Initial configuration check
configureCloudinary();


export async function uploadImage(formData: FormData) {
  if (!configureCloudinary()) {
      return { success: false, error: 'Cloudinary is not configured on the server. Please check server logs.' };
  }

  const file = formData.get('file') as File;

  if (!file || file.size === 0) {
    return { success: false, error: 'No file provided.' };
  }
  
  console.log('Attempting to upload image:', file.name);

  try {
    const fileBuffer = await file.arrayBuffer();
    const mime = file.type;
    const encoding = 'base64';
    const base64Data = Buffer.from(fileBuffer).toString('base64');
    const fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;

    const result = await cloudinary.uploader.upload(fileUri, {
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
    });
    
    console.log('Cloudinary Upload Result:', JSON.stringify(result, null, 2));

    if (result.secure_url) {
      return { success: true, url: result.secure_url };
    } else {
      // This case should ideally not happen if an error wasn't thrown
      return { success: false, error: 'Cloudinary upload succeeded but no secure_url was returned.' };
    }
  } catch (error: any) {
    console.error('Cloudinary Upload Error Caught:', JSON.stringify(error, null, 2));
    
    let errorMessage = 'An unknown error occurred during upload.';
    // Cloudinary errors often have a message and an http_code property.
    if (error && error.message) {
      errorMessage = error.message;
    }

    return { success: false, error: `Upload failed: ${errorMessage}` };
  }
}
