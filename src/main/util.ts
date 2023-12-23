/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';
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
    case 'HD 1080p 30fps':
      return '-movflags +faststart -c:v libx264 -profile:v high -level:v 4.0 -b_strategy 2 -bf 2 -flags cgop -coder ac -pix_fmt yuv420p -crf 23 -maxrate 8M -bufsize 16M -c:a aac -ac 2 -ar 48000 -b:a 384k -vf scale=1080:-2';
    case 'HD 1080p 60fps':
      return '-movflags +faststart -c:v libx264 -profile:v high -level:v 4.0 -b_strategy 2 -bf 2 -flags cgop -coder ac -pix_fmt yuv420p -crf 23 -maxrate 8M -bufsize 16M -c:a aac -ac 2 -ar 48000 -b:a 384k -vf scale=1080:-2';
    case 'HD 720p 30fps':
      return '-movflags +faststart -c:v libx264 -profile:v high -level:v 3.1 -b_strategy 2 -bf 2 -flags cgop -coder ac -pix_fmt yuv420p -crf 23 -maxrate 4M -bufsize 8M -c:a aac -ac 2 -ar 48000 -b:a 384k -vf scale=720:-2';
    case 'HD 720p 60fps':
      return '-movflags +faststart -c:v libx264 -profile:v high -level:v 3.1 -b_strategy 2 -bf 2 -flags cgop -coder ac -pix_fmt yuv420p -crf 23 -maxrate 4M -bufsize 8M -c:a aac -ac 2 -ar 48000 -b:a 384k -vf scale=720:-2';
    case 'HD 480p 30fps':
      return '-movflags +faststart -c:v libx264 -profile:v high -level:v 3.1 -b_strategy 2 -bf 2 -flags cgop -coder ac -pix_fmt yuv420p -crf 23 -maxrate 2M -bufsize 4M -c:a aac -ac 2 -ar 48000 -b:a 384k -vf scale=480:-2';
    case 'HD 480p 60fps':
      return '-movflags +faststart -c:v libx264 -profile:v high -level:v 3.1 -b_strategy 2 -bf 2 -flags cgop -coder ac -pix_fmt yuv420p -crf 23 -maxrate 2M -bufsize 4M -c:a aac -ac 2 -ar 48000 -b:a 384k -vf scale=480:-2';
    case 'HD 360p 30fps':
      return '-movflags +faststart -c:v libx264 -profile:v high -level:v 3.1 -b_strategy 2 -bf 2 -flags cgop -coder ac -pix_fmt yuv420p -crf 23 -maxrate 1M -bufsize 2M -c:a aac -ac 2 -ar 48000 -b:a 384k -vf scale=360:-2';
    case 'HD 360p 60fps':
      return '-movflags +faststart -c:v libx264 -profile:v high -level:v 3.1 -b_strategy 2 -bf 2 -flags cgop -coder ac -pix_fmt yuv420p -crf 23 -maxrate 1M -bufsize 2M -c:a aac -ac 2 -ar 48000 -b:a 384k -vf scale=360:-2';
    default:
      throw new Error('Invalid encoder option');
  }
};
