// src/app/api/oauth2callback/route.js
// eslint-disable-next-line import/no-extraneous-dependencies
import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

// Load client secrets from a local file (credentials.json).

// Read the credentials.json file

// Create OAuth2 client with credentials.
const { client_id, client_secret, redirect_uris } = [
  process.env.NEXT_GGL_DRIVE_CLIENT_ID,
  process.env.NEXT_GGL_DRIVE_CLIENT_SEC,
  process.env.NEXT_GGL_DRIVE_CLIENT_URI,
];
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris);

export async function GET(req, res) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return res.status(400).json({ error: 'Authorization code is missing' });
  }

  try {
    // Exchange the authorization code for access and refresh tokens.
    const { tokens } = await oAuth2Client.getToken(code);
    console.log('Token: ', tokens);
    // Store the token in a file.
    process.env.NEXT_PUBLIC_DRIVE_ACC_TOKEN = tokens.access_token;
    process.env.NEXT_PUBLIC_DRIVE_REF_TOKEN = tokens.refresh_token;
    process.env.NEXT_PUBLIC_DRIVE_SCOPE = tokens.scope;
    process.env.NEXT_PUBLIC_DRIVE_TOKEN_TYPE = tokens.token_type;
    process.env.NEXT_PUBLIC_DRIVE_EXP_DATE = tokens.expiry_date;
    res.status(200).json({ message: 'Token successfully stored' });
  } catch (error) {
    console.error('Error retrieving access token', error);
    res.status(500).json({ error: 'Error retrieving access token' });
  }
}
