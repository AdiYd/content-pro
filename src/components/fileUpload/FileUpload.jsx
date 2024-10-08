import { Oval } from 'react-loader-spinner';
import { useRouter } from 'next/navigation';
import React, { useState, useContext } from 'react';

import { Box, Button, useTheme, Typography } from '@mui/material';

import { ColorContext } from 'src/context/colorMain';

import { handleSubmitFile } from './sumbit';

export default function UploadFile({ email, number = -1, callback = () => {} }) {
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

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('email', email);
    formData.append('number', number + 1);

    try {
      setUploadStatus('מעלה קובץ...');
      console.log('lsdkfjhkj');
      setLoading(true);
      console.log('sending upload request to server...', formData);
      const response = await handleSubmitFile({ formData });
      console.log('This is the response: ', response);
      //   const response = await fetch(`${process.env.URL}/api/uploadApi`, {
      //     method: 'POST',
      //     body: formData,
      //   });

      //   const response = await axios.post('/api/uploadApi', formData, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      //   });

      if (response.status === 200) {
        setUploadStatus('הקובץ נשמר בהצלחה!');
        setLoading(false);
        setUploadStatus('');
        callback();
      } else {
        if (response.authUrl) {
          router.push(response.authUrl);
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
      <input type="file" onChange={handleFileChange} style={{ marginTop: 16 }} />
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
