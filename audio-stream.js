import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000; // Running on http://localhost:3000/audio

const app = express();

app.get('/audio', async (req, res) => {
    const textToRead = "Start of text prompt. Lorum ipsum, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In mollis nunc sed id semper risus in hendrerit. Turpis egestas pretium aenean pharetra. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Id eu nisl nunc mi ipsum faucibus vitae aliquet. Aenean pharetra magna ac placerat vestibulum lectus. Sit amet nulla facilisi morbi tempus. Dolor magna eget est lorem. Fringilla urna porttitor rhoncus dolor purus non enim. Risus quis varius quam quisque id.";
    const voiceId = 'ROlPylaanCnff2J1iEZX'; // Voice = 'Alex Test 01'
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

    try {
        const response = await fetch(url, options);
        console.log("Called ElevenLabs API.")
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        res.setHeader('Content-Type', 'audio/mpeg');
        response.body.pipe(res);
        console.log('Audio file sent.');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send(error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
