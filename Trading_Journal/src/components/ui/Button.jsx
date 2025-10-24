import React from 'react';
import classNames from 'classnames';

const Button = ({ 
    children, 
    className = '', 
    variant = 'primary', 
    size = 'md',
    type = 'button',
    isLoading = false,
    disabled = false,
    ...props 
}) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    const variants = {
        primary: 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white hover:from-indigo-700 hover:to-blue-600 focus:ring-indigo-500 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/40 transform transition-all duration-200 hover:-translate-y-0.5',
        secondary: 'bg-gradient-to-r from-gray-200 to-gray-100 text-gray-900 hover:from-gray-300 hover:to-gray-200 focus:ring-gray-500 shadow-lg hover:shadow-xl transition-all duration-200',
        danger: 'bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-700 hover:to-red-600 focus:ring-red-500 shadow-lg shadow-red-500/30 hover:shadow-red-500/40',
        outline: 'border-2 border-indigo-500 bg-transparent text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500 transition-all duration-200'
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg'
    };

    const buttonClasses = classNames(
        baseClasses,
        variants[variant],
        sizes[size],
        isLoading && 'opacity-70 cursor-not-allowed',
        disabled && 'opacity-50 cursor-not-allowed',
        className
    );

    return (
        <button
            type={type}
            className={buttonClasses}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <>
                    <svg 
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24"
                    >
                        <circle 
                            className="opacity-25" 
                            cx="12" 
                            cy="12" 
                            r="10" 
                            stroke="currentColor" 
                            strokeWidth="4"
                        />
                        <path 
                            className="opacity-75" 
                            fill="currentColor" 
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    Loading...
                </>
            ) : children}
        </button>
    );
};

export default Button;
