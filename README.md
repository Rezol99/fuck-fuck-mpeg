# fuck-fuck-mpeg

**fuck-fuck-mpeg** is an application designed to simplify the video file encoding process, allowing users to effortlessly convert videos into the MP4 format. This project is built upon the Electron React Boilerplate, which can be found at [electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate).

## Features

- **Video Encoding**: Utilize drag-and-drop or file selection to encode video files into the MP4 format.
- **Dependency Management**: Install ffmpeg seamlessly through Homebrew.
- **Development Environment**: Set up the development environment by running `npm install` followed by `npm run start`.
- **Build Process**: Build the application using npm; execute `npm run package` to generate the executable. The resulting files can be found in `release/build/mac-{arch}`.
- **Platform Support**: Currently, only macOS is supported.

## Prerequisites

Before building and running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Homebrew](https://brew.sh/)

## Installation

1. Install ffmpeg via Homebrew:

   ```bash
   brew install ffmpeg
   ```

2. Set up the development environment:

   ```bash
   npm install
   npm run start
   ```

## Build and Run

To build the application, run the following commands:

```bash
npm run package
```

The executable will be located in `release/build/mac-{arch}`.

## Note

This application is designed exclusively for macOS. For additional information about the underlying boilerplate, refer to [electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate).

## License

**fuck-fuck-mpeg** is licensed under the [MIT License](LICENSE). Contributions and issue reports are welcome on [GitHub](https://github.com/Rezol99/fuck-fuck-mpeg).
