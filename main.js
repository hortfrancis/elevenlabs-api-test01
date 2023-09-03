import fetch from 'node-fetch';
import fs from 'fs';
import { pipeline } from 'stream/promises';

// Manage API key
import dotenv from 'dotenv';
dotenv.config();

// The text prompt -- the words you want to be read out
const textToRead = 'Testing the ElevenLabs API. 1, 2, ... 6534534?';

// Voice = 'Alex Test 01'
const voiceId = 'ROlPylaanCnff2J1iEZX';

// Set arguments for the API call
const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`; 
const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'xi-api-key': process.env.ELEVENLABS_API_KEY
    },
    body: JSON.stringify({
        text: textToRead,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
            stability: 0.8,
            similarity_boost: 0.8,
            style: 0.8,
            use_speaker_boost: true
        }
    })
};

// create the audio directory if it doesn't exist
if (!fs.existsSync('./audio')){
    console.log("`./audio/` wasn't found, so created it.")
    fs.mkdirSync('./audio');

}

// Make the API call
fetch(url, options)
    .then(res => {

        if (!res.ok) {
            // Error handling for non-200 HTTP responses 
            throw new Error('Network response was not ok');
        }

        // Write the audio file returned from the API to a locally saved mp3
        const dest = fs.createWriteStream('./audio/test-output.mp3');
        return pipeline(res.body, dest);
    })
    .then(() => console.log('Audio file saved.'))
    .catch(err => console.error('error:' + err));