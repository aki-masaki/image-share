'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { deleteCookie, getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import AuthForms from './auth-forms';

const AccountPage = () => {
  const [username, setUsername] = useState(getCookie('username'));
  const [loading, setLoading] = useState(true);

  useEffect(() => setLoading(username?.trim() === ''), [username]);

  return loading ? (
    <div className='p-4'>Loading...</div>
  ) : username ? (
    <div className='p-4 flex flex-col gap-4'>
      <span>
        <span className='text-neutral-500'>Logged in as</span> {username}
      </span>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Log out</Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteCookie('username');
                setUsername(undefined);
              }}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  ) : (
    <AuthForms setUsername={setUsername} />
  );
};

export default AccountPage;
