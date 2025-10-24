import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';
import { useAuth } from '../features/auth/hooks';

function Register() {
    const navigate = useNavigate();
    const { user } = useAuth();

    // If user is already logged in, redirect to dashboard
    React.useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-blue-500 py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                    className="mx-auto h-16 w-auto transform transition-transform duration-500 hover:scale-110"
                    src="/src/assets/LogoWhite.png"
                    alt="Trading Journal"
                />
                <div className="mt-8">
                    <div className="bg-white/90 backdrop-blur-sm py-8 px-4 shadow-xl ring-1 ring-gray-900/10 sm:rounded-xl sm:px-10">
                        <RegisterForm />
                        <div className="mt-6 text-center">
                            <button
                                onClick={() => navigate('/')}
                                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                Already have an account? Sign in
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
