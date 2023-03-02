'use client';
import { register, signin } from '@/lib/api';
import { useCallback, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Card from './Card';
import Button from './Button';
import Input from './Input';

const registerContent = {
  linkUrl: '/signin',
  linkText: 'Already have an account?',
  header: 'Create a new Account',
  subheader: 'Just a few things to get started',
  buttonText: 'Register',
};

const signinContent = {
  linkUrl: '/register',
  linkText: "Don't have an account?",
  header: 'Welcome Back',
  subheader: 'Enter your credentials to access your account',
  buttonText: 'Sign in',
};

const initial = { email: '', password: '', firstName: '', lastName: '' };

export default function AuthForm({ mode }: { mode: 'register' | 'signin' }) {
  const [formState, setFormState] = useState({ ...initial });
  const [error, setError] = useState('');

  const router = useRouter();
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        if (mode === 'register') {
          await register(formState);
        } else {
          await signin(formState);
        }

        router.replace('/home');
      } catch (e) {
        setError(`Could not ${mode}`);
      } finally {
        setFormState({ ...initial });
      }
    },
    [
      formState.email,
      formState.password,
      formState.firstName,
      formState.lastName,
    ],
  );
}
