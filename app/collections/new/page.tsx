'use client';

import { createCollection } from '@/app/actions';
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
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import * as zod from 'zod';

const formSchema = zod.object({
  title: zod.string().min(3).max(50)
});

const NewCollectionPage = () => {
  const username = getCookie('username');

  const router = useRouter();

  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data: zod.infer<typeof formSchema>) => {
    if (!username) return;

    await createCollection({
      title: data.title,
      userUsername: username
    });

    router.push('/collections');
  };

  return (
    <div className='h-full flex-grow flex justify-center items-center p-4'>
      <FormProvider {...form}>
        <form
          className='p-4 border border-gray-700 rounded-lg space-y-4'
          onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name='title'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder='Title (min 3, max 50)' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className='w-full'>Submit</Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default NewCollectionPage;
