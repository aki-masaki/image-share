'use client';

import { Input } from '@/components/ui/input';
import { getCookie } from 'cookies-next';
import { login } from './actions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import * as zod from 'zod';
import { Form, useForm, FormProvider, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';

const signupFormSchema = zod.object({
  username: zod.string().min(3).max(50),
  password: zod.string().min(8).max(50)
});

const loginFormSchema = zod.object({
  username: zod.string().min(3).max(50),
  password: zod.string().min(8).max(50)
});

const AccountPage = () => {
  const userId = getCookie('user-id');

  const [method, setMethod] = useState<'login' | 'signup'>('signup');

  const signupForm = useForm<zod.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema)
  });

  const loginForm = useForm<zod.infer<typeof loginFormSchema>>({
    resolver: zodResolver(signupFormSchema)
  });

  const onSignup = (data: zod.infer<typeof signupFormSchema>) => {};
  const onLogin = (data: zod.infer<typeof signupFormSchema>) => {};

  return userId ? (
    <div>{userId}</div>
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
                  <FormMessage />
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

            <Button className='w-full' type='submit'>
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

            <Button className='w-full' type='submit'>
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
