import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import './App.css';
import { ChangeEvent, useCallback, useRef } from 'react';

function Hello() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const path = e.target.files?.[0].path;
    if (!path) return;
    window.electron.ipcRenderer.sendMessage('file', path);
    console.log(e.target.files);
  };

  const handleClick = () => {
    // eslint-disable-next-line no-unused-expressions
    fileInputRef.current?.value && (fileInputRef.current.value = '');
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const changeEvent = {
      target: {
        files: acceptedFiles,
      },
    } as unknown as ChangeEvent<HTMLInputElement>;
    handleFileChange(changeEvent);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noClick: true,
  });

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Container {...getRootProps()}>
      <FileLabel>
        <FileInput
          ref={fileInputRef}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...getInputProps()}
          onChange={handleFileChange}
          onClick={handleClick}
          accept={'video/*'}
        />
      </FileLabel>
    </Container>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
`;

const FileLabel = styled.label`
  position: absolute;
  background-color: black;
  display: flex;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const FileInput = styled.input.attrs({ type: 'file' })`
  height: 100%;
  width: 100%;

  &[type='file'] {
    display: none;
  }
`;
