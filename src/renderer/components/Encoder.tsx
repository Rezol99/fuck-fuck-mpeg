/* eslint-disable react/jsx-props-no-spreading */
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useDropzone } from 'react-dropzone';
import { EncoderOption } from '../../types';
import { getAssetsPath, joinPaths } from '../utils';

const DEFAULT_ENCODER_OPTION: EncoderOption = 'Default';

const options: EncoderOption[] = [
  'Default',
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
  const [glitchUrl, setGlitchUrl] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const assetsPath = await getAssetsPath();
        const videoUrl = joinPaths(
          'file://',
          assetsPath,
          'videos',
          'glitch.mp4',
        );
        setGlitchUrl(videoUrl);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const path = e.target.files?.[0]?.path;
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noClick: true,
  });

  const handleEncoderOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setEncoderOption(e.target.value as EncoderOption);
  };

  return (
    <>
      <div style={{ display: glitchUrl && isEncoding ? 'block' : 'none' }}>
        {glitchUrl && (
          <Glitch {...getRootProps()} src={glitchUrl} loop autoPlay />
        )}
        <Overlay />
      </div>
      <Container {...getRootProps()} glitch>
        <FileLabel>
          <FileInput
            ref={fileInputRef}
            {...getInputProps()}
            onChange={handleFileChange}
            onClick={handleClick}
            accept={'video/*'}
          />
          <Messages>
            <Circle>
              {isEncoding ? (
                <>
                  <Message style={{ marginBottom: 8 }} fontSize={28}>
                    Encoding...
                  </Message>
                  <Message fontSize={20}>{fileName}</Message>
                </>
              ) : (
                <Message fontSize={26}>Drop a video file here</Message>
              )}
            </Circle>
          </Messages>
        </FileLabel>
        <PullDown
          defaultValue={encoderOption}
          onChange={handleEncoderOptionChange}
        >
          {options.map((option) => (
            <Option key={option}>{option}</Option>
          ))}
        </PullDown>
      </Container>
    </>
  );
}

export default Encoder;

const Glitch = styled.video`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  opacity: 0.3;
  z-index: 100;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background-color: #00000020;
  z-index: 90;
`;

const Container = styled.div<{ glitch: boolean }>`
  height: 100vh;
  width: 100vw;
  position: relative;
  background-color: black;
  overflow: hidden;

  ${(props) =>
    props.glitch &&
    css`
      * {
        animation-duration: 0.01s;
        animation-name: textflicker;
        animation-iteration-count: infinite;
        animation-direction: alternate;
      }
    `}

  @keyframes textflicker {
    from {
      text-shadow:
        1px 0 0 #ea36af,
        -2px 0 0 #75fa69;
    }
    to {
      text-shadow:
        3px 1.5px 6px #ea36af,
        -1px -0.5px 2px #75fa69;
    }
  }

  animation: flickerAnimation 0.01s infinite;
  @keyframes flickerAnimation {
    0% {
      opacity: 0.2;
    }

    25% {
      opacity: 0.4;
    }

    100% {
      opacity: 0.9;
    }
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

const Circle = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background-color: transparent;
  border: 0.5px solid white;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.4;
  }
`;

const Messages = styled.div`
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
  max-width: 80%;
`;

const PullDown = styled.select`
  position: absolute;
  top: 24px;
  right: 48px;
  z-index: 100;
  font-size: 14px;
  padding: 10px 16px;
  width: 200px;
  color: white;
  background-color: black;
  opacity: 0.55;
  cursor: pointer;
  border-radius: 16px;
  appearance: none;
  text-align: center;
  border: 1.4px solid white;

  &:hover {
    opacity: 0.68;
  }

  &:focus {
    outline: none;
  }

  &:active {
    opacity: 0.65;
  }
`;

const Option = styled.option``;
