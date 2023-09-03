import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { setCookie } from 'cookies-next';
import { Dispatch, SetStateAction, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as zod from 'zod';
import { formSchema, login, signup } from './actions';

const AuthForms = ({
  setUsername
}: {
  setUsername: Dispatch<SetStateAction<string | undefined>>;
}) => {
  const [method, setMethod] = useState<'login' | 'signup'>('signup');

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [pending, setPending] = useState(false);

  const signupForm = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  const loginForm = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data: zod.infer<typeof formSchema>) => {
    setPending(true);

    const response = await (method === 'login' ? login : signup)(data);

    // Success
    if (!response) {
      setCookie('username', data.username, {
        maxAge: data.remember ? 60 * 60 * 24 * 30 : undefined // Live for 30 days
      });

      setUsername(data.username);
    } else {
      if (response.field === 'username') setUsernameError(response.message);
      else setPasswordError(response.message);
    }

    setPending(false);
  };

  return (
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
            onSubmit={signupForm.handleSubmit(onSubmit)}
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
                    <Input placeholder='Password' type='password' {...field} />
                  </FormControl>
                  <FormMessage>{passwordError}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={loginForm.control}
              name='remember'
              render={({ field }) => (
                <FormItem className='flex gap-2 items-center'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className='flex flex-col gap-1 mt-0'>
                    <FormLabel>Remember me</FormLabel>
                    <FormDescription>
                      You will be logged in for 30 days
                    </FormDescription>
                  </div>
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
            onSubmit={loginForm.handleSubmit(onSubmit)}
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
                  <FormMessage>{usernameError}</FormMessage>
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
                    <Input placeholder='Password' type='password' {...field} />
                  </FormControl>
                  <FormMessage>{passwordError}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={loginForm.control}
              name='remember'
              render={({ field }) => (
                <FormItem className='flex gap-2 items-center'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className='flex flex-col gap-1 mt-0'>
                    <FormLabel>Remember me</FormLabel>
                    <FormDescription>
                      You will be logged in for 30 days
                    </FormDescription>
                  </div>
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

export default AuthForms;
