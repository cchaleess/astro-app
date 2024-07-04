import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:4321',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use(express.json());

app.post('/generate-image', async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                prompt,
                n: 1,
                size: '1024x1024',
            }),
        });

        const data = await response.json();

        if (response.ok) {
            res.json({ url: data.data[0].url });
        } else {
            res.status(response.status).json(data);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error generating image' });
    }
});

app.post('/generate-chat', async (req, res) => {

    console.log('generate-chat', req.body);

    const { prompt } = req.body;

    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo-instruct',
                prompt: prompt,
                max_tokens: 50
            }),
        });

        const data = await response.json();

        if (response.ok) {
            res.json({ completion: data.choices[0].text });
        } else {
            res.status(response.status).json(data);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error generating chat' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
