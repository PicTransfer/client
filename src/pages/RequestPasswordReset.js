import React, { useState } from 'react';
import axios from 'axios';

const RequestPasswordReset = () => {
    const [username, setUsername] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/request-password-reset', { username });
            alert('Password reset link sent to your email');
        } catch (error) {
            alert('Error sending password reset link');
        }
    };

    return (
        <div>
            <h2>Request Password Reset</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button type="submit">Request Password Reset</button>
            </form>
        </div>
    );
};

export default RequestPasswordReset;
