/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';
import { app } from 'electron';
import { EncoderOption } from '../types';

export function resolveHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}

export const encoderOptionToCommandOptions = (option: EncoderOption) => {
  switch (option) {
    case 'Default':
      return '-movflags +faststart -c:v libx264 -profile:v high -level:v 4.0 -b_strategy 2 -bf 2 -flags cgop -coder ac -pix_fmt yuv420p -crf 18 -maxrate 10M -bufsize 20M -c:a aac -ac 2 -ar 48000 -b:a 384k';
    case 'HD 1080p 30fps':
      return '-movflags +faststart -c:v libx264 -profile:v high -level:v 4.0 -b_strategy 2 -bf 2 -flags cgop -coder ac -pix_fmt yuv420p -crf 18 -maxrate 10M -bufsize 20M -c:a aac -ac 2 -ar 48000 -b:a 384k -vf scale=1080:-2:flags=lanczos';
    case 'HD 1080p 60fps':
      return '-movflags +faststart -c:v libx264 -profile:v high -level:v 4.0 -b_strategy 2 -bf 2 -flags cgop -coder ac -pix_fmt yuv420p -crf 18 -maxrate 10M -bufsize 20M -c:a aac -ac 2 -ar 48000 -b:a 384k -vf scale=1080:-2:flags=lanczos';
    case 'HD 720p 30fps':
      return '-movflags +faststart -c:v libx264 -profile:v high -level:v 3.1 -b_strategy 2 -bf 2 -flags cgop -coder ac -pix_fmt yuv420p -crf 18 -maxrate 10M -bufsize 20M -c:a aac -ac 2 -ar 48000 -b:a 384k -vf scale=720:-2:flags=lanczos';
    case 'HD 720p 60fps':
      return '-movflags +faststart -c:v libx264 -profile:v high -level:v 3.1 -b_strategy 2 -bf 2 -flags cgop -coder ac -pix_fmt yuv420p -crf 18 -maxrate 10M -bufsize 20M -c:a aac -ac 2 -ar 48000 -b:a 384k -vf scale=720:-2:flags=lanczos';
    case 'HD 480p 30fps':
      return '-movflags +faststart -c:v libx264 -profile:v high -level:v 3.1 -b_strategy 2 -bf 2 -flags cgop -coder ac -pix_fmt yuv420p -crf 18 -maxrate 10M -bufsize 20M -c:a aac -ac 2 -ar 48000 -b:a 384k -vf scale=480:-2:flags=lanczos';
    case 'HD 480p 60fps':
      return '-movflags +faststart -c:v libx264 -profile:v high -level:v 3.1 -b_strategy 2 -bf 2 -flags cgop -coder ac -pix_fmt yuv420p -crf 18 -maxrate 10M -bufsize 20M -c:a aac -ac 2 -ar 48000 -b:a 384k -vf scale=480:-2:flags=lanczos';
    case 'HD 360p 30fps':
      return '-movflags +faststart -c:v libx264 -profile:v high -level:v 3.1 -b_strategy 2 -bf 2 -flags cgop -coder ac -pix_fmt yuv420p -crf 18 -maxrate 10M -bufsize 20M -c:a aac -ac 2 -ar 48000 -b:a 384k -vf scale=360:-2:flags=lanczos';
    case 'HD 360p 60fps':
      return '-movflags +faststart -c:v libx264 -profile:v high -level:v 3.1 -b_strategy 2 -bf 2 -flags cgop -coder ac -pix_fmt yuv420p -crf 18 -maxrate 10M -bufsize 20M -c:a aac -ac 2 -ar 48000 -b:a 384k -vf scale=360:-2:flags=lanczos';
    default:
      throw new Error('Invalid encoder option');
  }
};

const encoderOptionToFileNameOption = (option: EncoderOption) => {
  return option.replace(' ', '-');
};

export const createOutputPath = (
  inputPath: string,
  encoderOption: EncoderOption,
): string => {
  const { name } = path.parse(inputPath);
  const outputFileName = `${name}_${encoderOptionToFileNameOption(
    encoderOption,
  )}_${Date.now()}.mp4`;
  const desktopPath = app.getPath('desktop');
  return path.join(desktopPath, outputFileName);
};

export const getAssetsPath = async (): Promise<string> => {
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');
  return RESOURCES_PATH;
};
