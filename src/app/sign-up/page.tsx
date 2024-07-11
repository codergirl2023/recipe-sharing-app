// Use client
'use client';

// Import dependencies
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import whenLoggedIn from '../components/Routes/whenLoggedIn';
import AuthForm from '../components/Auth/AuthForm';
import { FieldValues } from 'react-hook-form';

// Define SignUp component
const SignUp = () => {
  // Use router
  const router = useRouter();

  // Define state for authError
  const [authError, setAuthError] = useState('');

  // Define signUpNewUser function
  const signUpNewUser = async (data: FieldValues) => {
    try {
      // Make a POST request to sign up
      const response = await fetch('/api/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      });

      // Check if the response is not ok
      if (!response.ok) {
        const errorMessage = await response.text();
        setAuthError(errorMessage);
      } else {
        // If the response is ok, get the user info and redirect to login
        const userInfo = await response.json();
        setAuthError('');
        router.push('/login');
      }
    } catch (error) {
      // Log the error and set the authError state
      console.error('Error during signup:', error);
      setAuthError('An error occurred. Please try again.');
    }
  };

  // Render the AuthForm component
  return (
    <AuthForm onSubmit={signUpNewUser} type={'signup'} error={authError} />
  );
};

// Export the SignUp component wrapped in whenLoggedIn
export default whenLoggedIn(SignUp);
