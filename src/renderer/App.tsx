import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import './App.css';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { EncoderOption } from '../types';

const DEFAULT_ENCODER_OPTION: EncoderOption = 'HD 720p 30fps';

const options: EncoderOption[] = [
  'HD 1080p 30fps',
  'HD 1080p 60fps',
  'HD 720p 30fps',
  'HD 720p 60fps',
  'HD 480p 30fps',
  'HD 480p 60fps',
  'HD 360p 30fps',
  'HD 360p 60fps',
] as const;

function Encoder() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [encoderOption, setEncoderOption] = useState<EncoderOption>(
    DEFAULT_ENCODER_OPTION,
  );
  const [isEncoding, setIsEncoding] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const path = e.target.files?.[0].path;
    if (!path) return;
    try {
      setIsEncoding(true);
      setFileName(path);
      await window.electron.ipcRenderer.sendMessage(
        'file',
        path,
        encoderOption,
      );
      alert('Done!');
    } catch (err) {
      alert('Error!');
      const message = (err as any)?.message;
      if (message) alert(message.slice(0, 100));
    } finally {
      setIsEncoding(false);
    }
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

  const handleEncoderOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setEncoderOption(e.target.value as EncoderOption);
  };

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Container {...getRootProps()}>
      <PullDown
        defaultValue={encoderOption}
        onChange={handleEncoderOptionChange}
      >
        {options.map((option) => (
          <Option>{option}</Option>
        ))}
      </PullDown>
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
      <Messages>
        {isEncoding ? (
          <>
            <Message fontSize={36}>Encoding...</Message>
            <Message fontSize={24}>{fileName}</Message>
          </>
        ) : (
          <Message fontSize={26}>Drop a video file here</Message>
        )}
      </Messages>
    </Container>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Encoder />} />
      </Routes>
    </Router>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
  background-color: black;
  transition: opacity 0.1s ease-in-out;

  &:hover {
    opacity: 0.4;
  }

  &:active {
    opacity: 0.2;
  }
`;

const FileLabel = styled.label`
  position: absolute;
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

const Messages = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.6;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const Message = styled.div<{ fontSize: number }>`
  font-size: ${({ fontSize }) => fontSize}px;
  text-align: center;
  color: white;
`;

const PullDown = styled.select`
  position: absolute;
  bottom: 48px;
  right: 50%;
  transform: translate(50%, 0);
  z-index: 100;
  font-size: 18px;
  padding: 8px;
  width: 200px;
  color: white;
  background-color: black;
`;

const Option = styled.option``;
