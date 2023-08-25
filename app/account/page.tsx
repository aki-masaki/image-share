'use client';

import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { getCookie, setCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as zod from 'zod';
import { signup } from './actions';

export const signupFormSchema = zod.object({
  username: zod.string().min(3).max(50),
  password: zod.string().min(8).max(50)
});

export const loginFormSchema = zod.object({
  username: zod.string().min(3).max(50),
  password: zod.string().min(8).max(50)
});

const AccountPage = () => {
  const [username, setUsername] = useState(getCookie('username'));
  const [loading, setLoading] = useState(true);

  useEffect(() => setLoading(username?.trim() === ''), [username]);

  const [method, setMethod] = useState<'login' | 'signup'>('signup');

  const [usernameError, setUsernameError] = useState('');
  const [pending, setPending] = useState(false);

  const signupForm = useForm<zod.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema)
  });

  const loginForm = useForm<zod.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema)
  });

  const onSignup = async (data: zod.infer<typeof signupFormSchema>) => {
    const response = (await signup(data)) as string;

    // Success
    if (response.trim() === '') {
      setCookie('username', data.username);
      setUsername(data.username);
    } else setUsernameError(response);
  };

  const onLogin = (data: zod.infer<typeof loginFormSchema>) => {};

  return loading ? (
    <div className='p-4'>Loading...</div>
  ) : username ? (
    <div className='p-4'>
      <span className='text-neutral-500'> Logged in as</span> {username}
    </div>
  ) : (
    <div
      className='
      flex
      flex-grow
      items-center
      justify-center
      flex-col
      gap-4'>
      {method === 'signup' ? (
        <FormProvider {...signupForm}>
          <form
            onSubmit={signupForm.handleSubmit(onSignup)}
            className='space-y-8 border border-gray-700 p-4 rounded-lg'>
            <h2>Create a free account to start uploading!</h2>

            <FormField
              control={signupForm.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder='Username' {...field} />
                  </FormControl>
                  <FormMessage>{usernameError}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={signupForm.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder='Password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className='w-full' type='submit' disabled={pending}>
              Submit
            </Button>

            <Button
              className='w-full'
              variant={'outline'}
              type='button'
              onClick={() => {
                setMethod('login');
              }}>
              Already have an account?
            </Button>
          </form>
        </FormProvider>
      ) : (
        <FormProvider {...loginForm}>
          <form
            onSubmit={loginForm.handleSubmit(onSignup)}
            className='space-y-8 border border-gray-700 p-4 rounded-lg'>
            <h2>Welcome back!</h2>

            <FormField
              control={loginForm.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder='Username' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={loginForm.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder='Password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className='w-full' type='submit' disabled={pending}>
              Submit
            </Button>

            <Button
              className='w-full'
              variant={'outline'}
              type='button'
              onClick={() => {
                setMethod('signup');
              }}>
              Don&apos;t have an account?
            </Button>
          </form>
        </FormProvider>
      )}
    </div>
  );
};

export default AccountPage;
