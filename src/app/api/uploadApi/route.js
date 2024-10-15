import { NextResponse } from 'next/server';

import { getAuthUrl, uploadFileToDrive, initializeOAuthClient } from 'src/utils/fileUploads';

export default async function POST(req) {
  try {
    console.log('Starting upload API...');
    // Check if tokens are already saved
    const isAuthenticated = await initializeOAuthClient();
    console.log('This is isAuth: ', isAuthenticated);
    if (!isAuthenticated) {
      // If not authenticated, redirect user to get permission
      console.log('This is not auth: ', isAuthenticated);
      const authUrl = getAuthUrl();
      return NextResponse.json({
        message: 'Authorization required. Please visit this URL to authorize the app:',
        authUrl,
      });
    }

    // Handle file upload after user has authenticated
    const data = await req.formData();
    const file = data.get('file');
    console.log('This is the data: ', data);
    const email = data.get('email');
    const number = data.get('number');

    if (!file) {
      return NextResponse.json({ message: 'No file provided' }, { status: 400 });
    }

    // Upload the file to Google Drive
    const uploadedFile = await uploadFileToDrive(file, email, number);
    if (!uploadedFile) {
      return NextResponse.json({ message: 'Somthing went wrong' }, { status: 400 });
    }

    return NextResponse.json({
      message: 'File uploaded successfully',
      fileId: uploadedFile.id,
    });
  } catch (error) {
    console.error('Error handling request:', error);

    if (error.message.includes('invalid_grant')) {
      // If there's an issue with the token, prompt for re-authorization
      const authUrl = getAuthUrl();
      return NextResponse.json({
        message: 'Authorization expired or invalid. Please visit this URL to re-authorize the app:',
        authUrl,
      });
    }

    return NextResponse.json(
      { message: 'Error handling the request', error: error.message },
      { status: 500 }
    );
  }
}
