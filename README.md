# elevenlabs-api-test01

This project
- uses Node to create a text-to-speech audio stream from a text file (`prompt.txt`) which can be played within a web browser. 
- was made to test how to use the ElevenLabs API.
- could thereotically be run on any Node server -- locally or in the cloud.

_Author:_ Alex Hort-Francis 

## Instructions for use

### Install dependencies

In the terminal: 
`npm i`

### Start the server

`node audio-stream.js`

### Open the webpage

Open `index.html` and press play on the audio element. 

The web browser should play a continuous stream of audio for the length of the text in `prompt.txt`. 

### Debugging

Check the console to see whether
- the text prompt was found
- the request to the ElevenLabs API was successful
- the audio was succesfully streamed to the web browser

## Dependenciea

Node modules:
- dotenv
- express
- fs
- node-fetch
