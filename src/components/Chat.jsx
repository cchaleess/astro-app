import React, { useState } from 'react';
import Loader from './Loader';
import '../styles/chat.css';

const Chat = () => {
    const [loading, setLoading] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [completion, setCompletion] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/generate-chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            const data = await response.json();

            if (response.ok) {
                setCompletion(data.completion);
            } else {
                console.error('Error generating chat:', data);
            }
        } catch (error) {
            console.error('Error generating chat:', error);
        }

        setLoading(false);
    };

    return (
        <div className="chat">
            <div className="chat__header">
                <h1>Chat Generator</h1>
            </div>
            <form className="chat__form" onSubmit={handleSubmit}>
                <textarea
                    placeholder="Enter a prompt..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <button type="submit">Generate</button>
            </form>
            <div className="chat__spinner">
                {loading && <Loader />}
            </div>
            <div className="chat__completion">
                <pre>{completion}</pre>
            </div>
        </div>
    );
};

export default Chat;
