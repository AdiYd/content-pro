// 'use server';

import { Readable } from 'stream';
// eslint-disable-next-line import/no-extraneous-dependencies
import { google } from 'googleapis';

import { getUserByEmail, updateItemParam } from './firebaseFunctions';

const rootFolderId = process.env.NEXT_GGL_DRIVE_CLIENT_ROOT; // Set the root folder ID where files should be uploaded

const [client_id, client_secret, redirect_uris] = [
  process.env.NEXT_GGL_DRIVE_CLIENT_ID,
  process.env.NEXT_GGL_DRIVE_CLIENT_SEC,
  process.env.NEXT_GGL_DRIVE_CLIENT_URI,
];

// Set up OAuth 2.0 client
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris);

// Function to get authentication URL for user permission
export async function getAuthUrl() {
  return oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/drive.file'],
    redirect_uri: 'https://videopro.webly.digital/api/oauth2callback',
  });
}

// Function to handle the OAuth callback and store the tokens
// export async function storeTokens(code) {
//   const { tokens } = await oAuth2Client.getToken(code);
//   oAuth2Client.setCredentials(tokens);
//   fs.writeFileSync(tokenPath, JSON.stringify(tokens));
// }

// Function to initialize OAuth2Client with existing tokens
export async function initializeOAuthClient() {
  try {
    const tokens = {
      access_token: process.env.NEXT_PUBLIC_DRIVE_ACC_TOKEN,
      refresh_token: process.env.NEXT_PUBLIC_DRIVE_REF_TOKEN,
      scope: process.env.NEXT_PUBLIC_DRIVE_SCOPE,
      token_type: process.env.NEXT_PUBLIC_DRIVE_TOKEN_TYPE,
      expiry_date: process.env.NEXT_PUBLIC_DRIVE_EXP_DATE,
    };
    oAuth2Client.setCredentials(tokens);
    return true;
  } catch {
    return false;
  }
}

function bufferToStream(buffer) {
  const readable = new Readable();
  readable.push(buffer);
  readable.push(null); // Indicates the end of the stream
  return readable;
}

// Function to upload a file to Google Drive inside a specified folder
export async function uploadFileToDrive(file, email, number) {
  try {
    const drive = google.drive({ version: 'v3', auth: oAuth2Client });
    const userList = await getUserByEmail(email);
    if (!userList.length) {
      return false;
    }
    const user = userList[0];
    let rootFolder = rootFolderId;
    if (user.rootFolder) {
      rootFolder = user.rootFolder;
    } else {
      // Create a folder if it doesn't exist
      const folderMetadata = {
        name: user.name,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [rootFolder], // The root folder in which the new folder will be created
      };

      const folder = await drive.files?.create({
        resource: folderMetadata,
        fields: 'id',
      });

      rootFolder = folder.data?.id;
      await updateItemParam('users', user.id, 'rootFolder', rootFolder);
    }

    const folderMetadata = {
      name: number,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [rootFolder], // The root folder in which the new folder will be created
    };

    const folder = await drive.files?.create({
      resource: folderMetadata,
      fields: 'id',
    });
    if (!file) {
      return folder.data.id;
    }

    if (file) {
      // Upload the file to the created folder
      const fileMetadata = {
        name: file.name,
        parents: [folder.data?.id],
      };

      const buffer = Buffer.from(await file.arrayBuffer());

      const media = {
        mimeType: file.type,
        body: bufferToStream(buffer),
      };

      const response = await drive.files.create({
        resource: fileMetadata,
        media,
        fields: 'id, webViewLink',
      });
      let videoList = [];
      if (user.videoList) {
        videoList = [...user.videoList];
      }
      videoList.push(response.data?.id);
      await updateItemParam('users', user.id, 'videoList', videoList);
      return true;
    }
    return true;
  } catch (err) {
    console.log('Error in uploading file: ', err);
    return false;
  }
}

export async function refreshAccessToken() {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: process.env.NEXT_GGL_DRIVE_CLIENT_ID,
      client_secret: process.env.NEXT_GGL_DRIVE_CLIENT_SEC,
      refresh_token: process.env.NEXT_PUBLIC_DRIVE_REF_TOKEN,
      grant_type: 'refresh_token',
    }),
  });
  const data = await response.json();
  process.env.NEXT_PUBLIC_DRIVE_ACC_TOKEN = data.access_token;
  return data.access_token;
}
  