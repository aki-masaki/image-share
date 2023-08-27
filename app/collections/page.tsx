'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { getCookie } from 'cookies-next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCollections } from '../actions';

const CollectionsPage = () => {
  const username = getCookie('username');

  const [collections, setCollections] =
    useState<Awaited<ReturnType<typeof getCollections>>>();

  useEffect(() => {
    (async () => {
      if (!username) return;

      setCollections(await getCollections(username));
    })();
  }, [username]);

  return (
    <div className='h-full flex-grow'>
      {username ? (
        collections ? (
          collections.length === 0 ? (
            <div className='h-full flex-grow flex flex-col justify-center items-center gap-4 p-4'>
              <h1>You don&apos;t have any collections!</h1>

              <Button>
                <Link href='/collections/new'>Create one!</Link>
              </Button>
            </div>
          ) : (
            <div className='flex px-4 gap-4 flex-grow flex-wrap justify-between overflow-y-auto'>
              {collections.map(collection => (
                <div
                  key={collection.id}
                  className='p-4 border border-gray-700 rounded-lg'>
                  <Link href={`/collections/${collection.id}`}>
                    {collection.title}
                  </Link>
                </div>
              ))}
            </div>
          )
        ) : (
          <>
            <div className='rounded-lg border border-gray-700 w-[300px] h-[250px] p-4 space-y-4'>
              <Skeleton className='w-full h-[150px]' />
              <Skeleton className='w-[120px] h-4' />
              <Skeleton className='w-[70px] h-4' />
            </div>

            <div className='rounded-lg border border-gray-700 w-[300px] h-[250px] p-4 space-y-4'>
              <Skeleton className='w-full h-[150px]' />
              <Skeleton className='w-[120px] h-4' />
              <Skeleton className='w-[70px] h-4' />
            </div>

            <div className='rounded-lg border border-gray-700 w-[300px] h-[250px] p-4 space-y-4'>
              <Skeleton className='w-full h-[150px]' />
              <Skeleton className='w-[120px] h-4' />
              <Skeleton className='w-[70px] h-4' />
            </div>

            <div className='rounded-lg border border-gray-700 w-[300px] h-[250px] p-4 space-y-4'>
              <Skeleton className='w-full h-[150px]' />
              <Skeleton className='w-[120px] h-4' />
              <Skeleton className='w-[70px] h-4' />
            </div>

            <div className='rounded-lg border border-gray-700 w-[300px] h-[250px] p-4 space-y-4'>
              <Skeleton className='w-full h-[150px]' />
              <Skeleton className='w-[120px] h-4' />
              <Skeleton className='w-[70px] h-4' />
            </div>
          </>
        )
      ) : (
        <div
          className='
          flex
          h-full
          flex-grow
          items-center
          justify-center
          flex-col
          gap-4'>
          <h1>You need an account to manage collections!</h1>

          <Button>
            <Link href='/account'>Sign up</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default CollectionsPage;
