'use client';

import { getCollectionById } from '@/app/actions';
import ImageContainer from '@/components/image-container';
import React, { useEffect, useState } from 'react';

interface ViewCollectionPageProps {
  params: { slug: string };
}

const ViewCollectionPage: React.FC<ViewCollectionPageProps> = ({ params }) => {
  const { slug: id } = params;

  const [collection, setCollection] =
    useState<Awaited<ReturnType<typeof getCollectionById>>>();

  useEffect(() => {
    (async () => {
      setCollection(await getCollectionById({ id }));
    })();
  }, [id]);

  return (
    <div>
      <h1>{collection?.title}</h1>
      {collection?.images.map(image => (
        <ImageContainer key={image.id} imageId={image.imageId as string} />
      ))}
    </div>
  );
};

export default ViewCollectionPage;
