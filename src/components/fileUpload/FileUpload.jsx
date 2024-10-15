import { Oval } from 'react-loader-spinner';
import { useRouter } from 'next/navigation';
import React, { useState, useContext } from 'react';

import { Box, Button, useTheme, Typography } from '@mui/material';

import { updateItemParam } from 'src/utils/firebaseFunctions';

import { ColorContext } from 'src/context/colorMain';

import { handleSubmitFile } from './sumbit';

export default function UploadFile({ email, number = -1, user = {}, callback = () => {} }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const theme = useTheme();
  const { mainColor } = useContext(ColorContext);
  const router = useRouter();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('בחרו קובץ להעלות');
      return;
    }

    // const formData = new FormData();
    // formData.append('file', selectedFile);
    // formData.append('email', email);
    // formData.append('number', number + 1);

    try {
      setUploadStatus('מעלה קובץ...');
      setLoading(true);
      const rootId = await handleSubmitFile({ email, number: number + 1 });
      console.log('This is rootId: ', rootId);
      if (rootId?.authUrl) {
        // open(rootId.authUrl);
      }
      const metadata = {
        name: selectedFile.name, // Filename at Google Drive
        mimeType: selectedFile.type, // File type (e.g., video/mp4)
        parents: [rootId.id],
      };

      // Create FormData to hold the metadata and the file content
      const form = new FormData();
      form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
      form.append('file', selectedFile);
      // Make a request to upload the file
      const response = await fetch(
        'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${rootId.access_token}`,
          },
          body: form,
        }
      );
      const data = await response.json();

      if (!response.ok) {
        console.log(data);
        throw new Error(`Error uploading file: ${response.statusText}`);
      }

      if (response.status === 200) {
        setUploadStatus('הקובץ נשמר בהצלחה!');
        let videoList = [];
        if (user.videoList) {
          videoList = [...user.videoList];
        }
        videoList.push(data?.id);
        console.log('This is new videoList: ', videoList, 'This is user: ', user);
        await updateItemParam('users', user.id, 'videoList', videoList);
        setLoading(false);
        setUploadStatus('');
        callback();
      } else {
        if (rootId.authUrl) {
          router.push(rootId.authUrl);
        }
        setLoading(false);
        setUploadStatus('משהו השתבש, יש לנסות במועד אחר');
      }
    } catch (error) {
      setLoading(false);
      console.log(`Error uploading file: ${error.message}`);
      setUploadStatus('שגיאה, נסו במועד מאוחר יותר');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      {loading ? (
        <Oval
          wrapperClass="flex justify-center"
          height={25}
          color={theme.palette[mainColor]?.main}
          width={25}
          visible
        />
      ) : (
        <Button size="small" variant="contained" onClick={handleUpload} sx={{ mt: 2, mx: 2 }}>
          העלאת קובץ
        </Button>
      )}
      {uploadStatus && (
        <div className={loading ? 'animate-pulse' : ''}>
          <Typography variant="body2" color="text.secondary">
            {uploadStatus}
          </Typography>
        </div>
      )}
    </Box>
  );
}
