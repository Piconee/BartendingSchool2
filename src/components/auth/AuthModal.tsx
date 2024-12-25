import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

export default function AuthModal() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setIsLogin(true)}
          className={`px-4 py-2 rounded-md ${
            isLogin
              ? 'bg-amber-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Accedi
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`px-4 py-2 rounded-md ${
            !isLogin
              ? 'bg-amber-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Registrati
        </button>
      </div>
      {isLogin ? <LoginForm /> : <SignUpForm />}
    </div>
  );
}