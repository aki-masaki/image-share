/* eslint-disable @next/next/no-img-element */
'use client';

import {
  getCollections,
  getImageById,
  toggleImageSave,
  toggleLike
} from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { BiHeart, BiSolidHeart } from 'react-icons/bi';
import { FaBookmark } from 'react-icons/fa';

interface ViewImagePageProps {
  params: {
    slug: string;
  };
}

const ViewImagePage = ({ params }: ViewImagePageProps) => {
  const username = getCookie('username') as string;

  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState<number>();
  const [collections, setCollections] =
    useState<Awaited<ReturnType<typeof getCollections>>>();

  const { slug: imageId } = params;

  const [image, setImage] =
    useState<Awaited<ReturnType<typeof getImageById>>>();

  useEffect(() => {
    (async () => {
      const imageResponse = await getImageById(imageId);

      setImage(imageResponse);

      setIsLiked(
        !!imageResponse?.likes.find(
          like => like.imageId === imageId && like.userUsername === username
        )
      );

      setLikes(image?.likes.length);
    })();
  }, [imageId, image?.likes.length, username]);

  return (
    <div className='h-full flex-grow pl-4 flex justify-evenly gap-4'>
      <div className='w-[60%] h-full flex justify-center items-center rounded-lg'>
        <img
          className='max-w-full max-h-full flex-grow'
          src={`/storage/${imageId}.jpeg`}
          alt='image'
        />
      </div>

      <div className='flex-grow h-full border border-gray-700 rounded-lg space-y-4'>
        {image ? (
          <>
            <div className='border-b border-b-gray-700 p-4 space-y-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <h1>{image.title}</h1>
                  <h2 className='text-neutral-500'>@{image.User?.username}</h2>
                </div>

                <div className='flex gap-2'>
                  <Button
                    variant='outline'
                    className='space-x-2 flex justify-center items-center'
                    onClick={async () => {
                      setIsLiked(prev => !prev);
                      setLikes(prev => (prev || 0) + (isLiked ? -1 : 1));

                      await toggleLike({
                        imageId,
                        username: username
                      });
                    }}>
                    <span>{likes}</span>
                    {isLiked ? (
                      <BiSolidHeart size={20} />
                    ) : (
                      <BiHeart size={20} />
                    )}
                  </Button>

                  {username && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant='outline'
                          className='space-x-2 flex justify-center items-center'
                          onClick={async () => {
                            const collectionsResponse = await getCollections(
                              username
                            );

                            setCollections(collectionsResponse);
                          }}>
                          <span>Save</span>
                          <FaBookmark />
                        </Button>
                      </DialogTrigger>

                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            Where do you want to save the image?
                          </DialogTitle>

                          <div className='space-y-2'>
                            {collections?.map(collection => (
                              <Button
                                key={collection.id}
                                variant='outline'
                                className='w-full h-[60px] p-2 flex flex-col gap-2 items-start'
                                onClick={async () => {
                                  await toggleImageSave({
                                    collectionId: collection.id,
                                    imageId
                                  });

                                  const collectionsResponse =
                                    await getCollections(username);

                                  setCollections(collectionsResponse);
                                }}>
                                <span>{collection.title}</span>
                                {collection &&
                                !!collection.images.find(
                                  image => image.imageId === imageId
                                ) ? (
                                  <span className='text-neutral-500'>
                                    Image will be removed.
                                  </span>
                                ) : (
                                  <span className='text-neutral-500'>
                                    Image will be added.
                                  </span>
                                )}
                              </Button>
                            ))}
                          </div>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </div>

              <p>{image.description ?? 'No description'}</p>
            </div>
          </>
        ) : (
          <>
            <Skeleton className='h-4 w-[200px]' />
            <Skeleton className='h-4 w-[100px]' />
          </>
        )}
      </div>
    </div>
  );
};

export default ViewImagePage;
