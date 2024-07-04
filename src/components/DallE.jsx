import React, { useState } from 'react';
import Loader from './Loader';
import '../styles/DallE.css';

const DallE = () => {
    const [loading, setLoading] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/generate-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            const data = await response.json();

            if (response.ok) {
                setImage(data.url);
            } else {
                console.error('Error generating image:', data);
            }
        } catch (error) {
            console.error('Error generating image:', error);
        }

        setLoading(false);
    };

    return (
        <div className="dalle">
            <div className="dalle__header">
                <h1>Dall-E Generator</h1>
            </div>
            <form className="dalle__form" onSubmit={handleSubmit}>
                <textarea
                    placeholder="Enter a prompt..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <button type="submit">Generate</button>
            </form>
            <div className="dalle__spinner">
                {loading && <Loader />}
            </div>
            <div className="dalle__image">
                {image && <img src={image} alt="Generated" />}
            </div>
        </div>
    );
};

export default DallE;
