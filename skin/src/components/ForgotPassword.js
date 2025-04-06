import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/main.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [resetToken, setResetToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [step, setStep] = useState(1); // 1: email, 2: reset token, 3: new password
    const navigate = useNavigate();

    const handleRequestReset = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/password/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Reset token has been generated. Please check your email.');
                setStep(2);
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('Failed to request password reset');
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/password/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, resetToken, newPassword })
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Password reset successful! Please login with your new password.');
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('Failed to reset password');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Reset Password</h2>
                {error && <div className="error-message">{error}</div>}
                {message && <div className="success-message">{message}</div>}

                {step === 1 && (
                    <form onSubmit={handleRequestReset}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="auth-btn">Request Reset Token</button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleResetPassword}>
                        <div className="form-group">
                            <label htmlFor="resetToken">Reset Token</label>
                            <input
                                type="text"
                                id="resetToken"
                                value={resetToken}
                                onChange={(e) => setResetToken(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="newPassword">New Password</label>
                            <input
                                type="password"
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="auth-btn">Reset Password</button>
                    </form>
                )}

                <div className="auth-links">
                    <p>Remember your password? <a href="/login">Login</a></p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword; 