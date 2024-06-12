import React, { useState } from 'react';
import axios from 'axios';

const ResetPassword = ({ match }) => {
    const [password, setPassword] = useState('');
    const token = match.params.token;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/reset-password', { token, password });
            alert('Password has been reset');
        } catch (error) {
            alert('Error resetting password');
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;
