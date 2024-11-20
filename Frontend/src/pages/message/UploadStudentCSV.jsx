import React, { useState } from 'react';
import styled from 'styled-components';
import toast, { Toaster } from 'react-hot-toast';

const Container = styled.div`
  height: fit-content;
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
  background-color: #fcfcfc;
`;

const Card = styled.div`
  border-radius: 10px;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.3);
  width: 600px;
  height: 260px;
  background-color: #ffffff;
  padding: 10px 30px 40px;
  width: 40%;
`;

const CardHeader = styled.h3`
  font-size: 22px;
  font-weight: 600;
  color: #929090;
`;

const DropBox = styled.div`
  margin: 10px 0;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 3px dotted #929090;
  border-radius: 5px;
`;

const DropBoxHeader = styled.h4`
  font-size: 16px;
  font-weight: 400;
  color: #000;
`;

const DropBoxText = styled.p`
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 12px;
  color: #929090;
`;

const FileInput = styled.input`
  display: none;
`;

const Button = styled.button`
  text-decoration: none;
  background-color: #929090;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  outline: none;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #ffffff;
    color: #929090;
    border: 1px solid #010101;
  }
`;

const UploadStudentCSV = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/api/students/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast.success('File uploaded and processed successfully');
      } else {
        toast.error('Error uploading and processing file');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error uploading and processing file');
    }
  };

  const handleButtonClick = () => {
    if (!file) {
      document.getElementById('fileID').click();
    } else {
      handleSubmit(new Event('submit'));
    }
  };

  return (
    <Container>
      <Card>
        <CardHeader>Upload Files</CardHeader>
        <DropBox>
          <DropBoxHeader>Select File here</DropBoxHeader>
          <DropBoxText>Files Supported: CSV</DropBoxText>
          <FileInput type="file" accept=".CSV" id="fileID" onChange={handleFileChange} />
          <Button onClick={handleButtonClick}>
            {file ? 'Upload' : 'Choose File'}
          </Button>
          {fileName && <h4>{fileName}</h4>}
        </DropBox>
      </Card>
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
    </Container>
  );
};

export default UploadStudentCSV;
