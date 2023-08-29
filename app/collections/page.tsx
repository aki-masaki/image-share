/* eslint-disable @next/next/no-img-element */
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
    <div className='flex px-4 gap-4 flex-grow flex-wrap justify-between overflow-y-auto'>
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
            collections.map(collection => (
              <Link
                href={`/collections/${collection.id}`}
                key={collection.id}
                className='relative w-[250px] h-fit rounded-lg overflow-hidden border border-gray-700 flex flex-col flex-none'>
                <div className='w-full flex justify-center items-center object-contain border-b border-b-gray-700 h-[150px]'>
                  {collection.images.length > 0 ? (
                    <img
                      src={`/storage/${collection.images[0]?.imageId}.jpeg`}
                      alt='image'
                    />
                  ) : (
                    <span>No images</span>
                  )}
                </div>

                <div className='w-full p-4'>
                  <span>{collection?.title}</span>
                </div>
              </Link>
            ))
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
