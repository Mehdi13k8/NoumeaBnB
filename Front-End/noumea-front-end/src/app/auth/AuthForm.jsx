"use client";
import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '', // Added name field
        email: '',
        password: '',
        role: 'user' // Default role as user, can be changed as per requirement
    });
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLogin) {
            console.log('Attempting to log in...');
            // Perform login
            try {
                const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/users/login', formData);
                console.log('Login successful', response.data);
                // save token in local storage
                localStorage.setItem('token', response.data.token);
                router.push('/dashboard');
            } catch (error) {
                console.error('Login failed', error.response.data);
            }
        } else {
            console.log('Attempting to register...');
            // Perform registration
            try {
                const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/users', formData);
                setIsLogin(true);
            } catch (error) {
                console.error('Registration failed', error.response.data);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
                <h2 className="text-center text-3xl font-bold text-gray-800">
                    {isLogin ? 'Sign in to your account' : 'Register a new account'}
                </h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Full Name"
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Email address"
                                />
                            </div>
                        </>
                    )}
                    {isLogin && (<div>
                        <input
                            type="email" name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Email address"
                        />
                    </div>
                    )}
                    <div>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Password"
                        />
                    </div>
                    {!isLogin && (
                        <div>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="block w-full mt-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    )}
                    <div>
                        <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            {isLogin ? 'Sign In' : 'Register'}
                        </button>
                    </div>
                    <div className="text-sm text-center">
                        <button onClick={() => setIsLogin(!isLogin)} className="font-medium text-indigo-600 hover:text-indigo-800">
                            {isLogin ? 'Need an account? Register' : 'Already have an account? Sign In'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AuthForm;
