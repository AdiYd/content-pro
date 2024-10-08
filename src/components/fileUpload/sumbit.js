'use server';

const { NextResponse } = require('next/server');
const { uploadFileToDrive, getAuthUrl, initializeOAuthClient } = require('src/utils/fileUploads');

export const handleSubmitFile = async ({ formData }) => {
  try {
    console.log('Starting upload with handleSubmit API...');
    // Check if tokens are already saved
    const isAuthenticated = initializeOAuthClient();
    if (!isAuthenticated) {
      // If not authenticated, redirect user to get permission
      const authUrl = getAuthUrl();
      return {
        message: 'Authorization required. Please visit this URL to authorize the app:',
        authUrl,
      };
    }

    // Handle file upload after user has authenticated
    const file = formData.get('file');
    console.log('This is the data: ', formData);
    const email = formData.get('email');
    const number = formData.get('number');

    if (!file) {
      return {
        status: 404,
        message: 'No file provided!',
      };
    }

    // Upload the file to Google Drive
    const uploadedFile = await uploadFileToDrive(file, email, number);
    if (!uploadedFile) {
      return {
        status: 400,
        message: 'file did not save to drive',
      };
    }

    return {
      status: 200,
      message: 'Successfuly uploaded the file',
    };
  } catch (error) {
    console.error('Error handling request:', error);

    if (error.message.includes('invalid_grant')) {
      // If there's an issue with the token, prompt for re-authorization
      const authUrl = getAuthUrl();
      return {
        status: 500,
        message: 'Need to authoraize the api',
        authUrl,
      };
    }

    return {
      status: 500,
      message: 'Something went wrong',
    };
  }
};
