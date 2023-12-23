// eslint-disable-next-line import/prefer-default-export
export const getAssetsPath = async (): Promise<string> => {
  const dirname = window.electron.ipcRenderer.sendMessage('assets-path');
  return dirname;
};

export const joinPaths = (...paths: string[]): string => {
  return paths.join('/');
};
