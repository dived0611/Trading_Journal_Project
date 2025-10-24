import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks';
import Button from '../ui/Button';
import Input from '../ui/Input';

const RegisterForm = ({ onSuccess }) => {
    const navigate = useNavigate();
    const { register, loading, error } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            onSuccess?.();
            navigate('/dashboard');
        } catch (err) {
            // Error is handled by the auth context
            console.error('Registration failed:', err);
        }
    };

    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-gray-900">Start your journey</h3>
                <p className="text-sm text-gray-600">Create an account to track and analyze your trades</p>
            </div>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        label="Full Name"
                        autoComplete="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        error={error}
                    />

                    <Input
                        id="email"
                        name="email"
                        type="email"
                        label="Email address"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <Input
                        id="password"
                        name="password"
                        type="password"
                        label="Password"
                        autoComplete="new-password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <Input
                        id="password_confirmation"
                        name="password_confirmation"
                        type="password"
                        label="Confirm Password"
                        autoComplete="new-password"
                        required
                        value={formData.password_confirmation}
                        onChange={handleChange}
                    />
                </div>

                <div className="space-y-4">
                    <Button
                        type="submit"
                        className="w-full"
                        isLoading={loading}
                        disabled={loading}
                    >
                        Create Account
                    </Button>
                    
                    <p className="text-center text-sm text-gray-600">
                        By creating an account, you agree to our{' '}
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Privacy Policy
                        </a>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
