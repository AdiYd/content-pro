import { IncomingForm } from 'formidable';
import { NextResponse } from 'next/server';

import { uploadFileToDrive } from 'src/utils/fileUploads';

export async function POST(req) {
  const form = new IncomingForm();

  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        reject(new Error('Error parsing the form data'));
        return;
      }

      // Get the uploaded file
      const { file } = files;
      const { email } = fields;
      const { number } = fields;

      // Handle file upload logic here
      const uploadedFile = await uploadFileToDrive(file, email, number);
      if (!uploadedFile) {
        resolve(NextResponse.json({ message: 'Something went wrong' }, { status: 400 }));
      }

      resolve(
        NextResponse.json({ message: 'File uploaded successfully', fileId: uploadedFile.id })
      );
    });
  });
}
