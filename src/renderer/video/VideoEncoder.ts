import { EncoderOption } from '../../types';

class VideoEncoder {
  static async encode(
    inputPath: string,
    uuid: string,
    encoderOption: EncoderOption,
  ): Promise<{ inputPath: string; res: string; uuid: string }> {
    return window.electron.ipcRenderer.sendMessage(
      'encode',
      inputPath,
      encoderOption,
      uuid,
    );
  }
}

export default VideoEncoder;
