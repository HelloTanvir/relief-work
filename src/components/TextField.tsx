import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface Props {
    label: string;
    type: string;
    name: string;
    placeholder: string;
    error?: string;
    className?: string;
    register: UseFormRegister<FieldValues>;
}

const TextField = ({ label, type, name, placeholder, error, className, register }: Props) => (
    <div className={className}>
        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor={name}>
            {label}
        </label>

        {name === 'description' ? (
            <textarea
                className={`bg-white text-gray-700 focus:outline-none focus:shadow-outline border rounded-lg py-2 px-4 block w-full appearance-none leading-normal focus:shadow-outline ${
                    error ? 'border-red-500' : 'border-gray-300 '
                }`}
                id={name}
                // cols={30}
                rows={4}
                placeholder={placeholder}
                {...register(name)}
            />
        ) : (
            <input
                className={`bg-white text-gray-700 focus:outline-none focus:shadow-outline border rounded-lg py-2 px-4 block w-full appearance-none leading-normal focus:shadow-outline ${
                    error ? 'border-red-500' : 'border-gray-300 '
                }`}
                type={type}
                id={name}
                placeholder={placeholder}
                {...register(name)}
            />
        )}

        {error ? <p className="mt-1 ml-1 text-xs italic text-red-500">{error}</p> : ''}
    </div>
);

export default TextField;
