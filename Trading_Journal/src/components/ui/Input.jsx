import React, { forwardRef } from 'react';
import classNames from 'classnames';

const Input = forwardRef(({
    className = '',
    type = 'text',
    error,
    label,
    id,
    ...props
}, ref) => {
    const inputClasses = classNames(
        'block w-full rounded-lg border-gray-300 bg-gray-50/50 shadow-sm transition-all duration-200',
        'focus:border-indigo-500 focus:ring-indigo-500 focus:bg-white sm:text-sm',
        'placeholder-gray-400 hover:border-indigo-400',
        error && 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500 bg-red-50/50',
        className
    );

    return (
        <div>
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    ref={ref}
                    type={type}
                    id={id}
                    className={inputClasses}
                    {...props}
                />
                {error && (
                    <div className="mt-1 text-sm text-red-600">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
