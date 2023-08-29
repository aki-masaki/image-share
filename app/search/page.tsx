'use client';

import ImageContainer from '@/components/image-container';
import { Input } from '@/components/ui/input';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { getImages, getUsers } from '../actions';

interface SearchPageProps {}

type Results<T extends (...args: any) => any> = Awaited<ReturnType<T>>;
type UserResults = Results<typeof getUsers>;
type ImageResults = Results<typeof getImages>;

const SearchPage: React.FC<SearchPageProps> = ({}) => {
  const [query, setQuery] = useState('');
  const [userResults, setUserResults] = useState<UserResults>();
  const [imageResults, setImageResults] = useState<ImageResults>();

  const searchParams = useSearchParams();
  const router = useRouter();

  const search = useCallback(
    async (query: string = '') => {
      setQuery(query);

      router.push(`/search?query=${query}`);

      setUserResults([]);
      setImageResults([]);

      if (query.trim() === '') return;

      if (query.includes('@user')) {
        query = query.replace(/@user\s*/, '');

        const users = await getUsers();

        setUserResults(
          users.filter(user =>
            user.username.toLowerCase().includes(query.toLowerCase())
          )
        );

        return;
      }

      const images = await getImages();

      setImageResults(
        images
          // Map the items to an object containing the object itself and a priority
          // which depends on how many proprieties match the search query
          .map(image => {
            const keys = Object.keys(image),
              values = Object.values(image).filter(
                // Take only the strings
                value => typeof value === 'string'
              ) as string[];

            let priority = 0;

            for (let i = 0; i < keys.length; i++) {
              if (!values || keys[i] === 'id') continue;

              if (values[i]?.toLowerCase().includes(query.toLowerCase()))
                priority++;
            }

            return {
              data: image,
              priority
            };
          })
          // Take only those whose priority is not zero (zero is a falsy value)
          .filter(item => item.priority)
          // Sort them based on priority
          .sort((a, b) => (b.priority || 0) - (a.priority || 0))
          // Map them to their original object
          .map(item => item?.data)
      );
    },
    [router]
  );

  useEffect(() => {
    search(searchParams.get('query') ?? '');
  }, [search, searchParams]);

  return (
    <div className='h-full flex-grow flex flex-col px-4'>
      <div className='w-full flex border border-gray-700 rounded-lg p-2 px-4 justify-center items-center gap-2'>
        <FaSearch />
        <Input
          value={query}
          onChange={e => search(e.target.value)}
          className='bg-transparent border-0 flex-grow'
        />
      </div>

      <div className='flex px-4 gap-4 flex-grow flex-wrap justify-between overflow-y-auto'>
        {userResults?.map(result => (
          <div
            key={result.username}
            className='relative w-[250px] h-fit rounded-lg overflow-hidden border border-gray-700 flex flex-col flex-none'></div>
        ))}
        {imageResults?.map(result => (
          <ImageContainer key={result.id} image={result} />
        ))}

        {/* No result */}
        {!(userResults?.length || imageResults?.length) && (
          <div className='w-full h-full flex justify-center items-center'>
            <h1>No results found!</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
