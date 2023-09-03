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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { getCookie } from 'cookies-next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as zod from 'zod';

const formSchema = zod.object({
  title: zod.string().max(50),
  description: zod.string().max(200).optional(),
  tags: zod.string().max(50),
  file: zod.any(),
  visibility: zod.enum(['public', 'link', 'private'])
});

const UploadPage = () => {
  const [username, setUsername] = useState<string>();

  useEffect(() => {
    setUsername(getCookie('username'));
  }, []);

  const [file, setFile] = useState<File | undefined | null>();
  const [pending, setPending] = useState(false);

  const [visibility, setVisibility] = useState<string>('public');

  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
      title: '',
      file: undefined,
      tags: '',
      visibility: 'public'
    }
  });

  const onSubmit = async (data: zod.infer<typeof formSchema>) => {
    if (!file) return;

    setPending(true);

    const formData = new FormData();

    let keys = Object.keys(data),
      values = Object.values(data);

    for (let i = 0; i < keys.length; i++) formData.append(keys[i], values[i]);

    const visibilityArray = ['public', 'link', 'private'];

    formData.set('file', file);
    formData.set('visibility', visibilityArray.indexOf(visibility).toString());
    formData.append('username', getCookie('username') as string);

    await fetch('api/upload', {
      method: 'POST',
      body: formData
    });

    setPending(false);
  };

  return !username ? (
    <div
      className='
      flex
      flex-grow
      items-center
      justify-center
      flex-col
      gap-4'>
      <h1>You need an account to start posting!</h1>

      <Button>
        <Link href='/account'>Sign up</Link>
      </Button>
    </div>
  ) : (
    <div
      className='
      flex
      flex-grow
      items-center
      justify-center
      flex-col
      gap-4
      overflow-scroll
      h-[100%]
      relative'>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 border border-gray-700 p-4 rounded-lg min-w-[600px] flex-wrap absolute top-0'>
          <h2>Upload</h2>

          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder='Title (max 50 characters)' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='tags'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input placeholder='Tags (separate by ,)' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='file'
            render={() => (
              <FormItem>
                <FormLabel>File</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Image File'
                    type='file'
                    accept='image/*'
                    onChange={e => {
                      setFile(e.target.files && e.target.files[0]);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Description (max 200 characters)'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={() => (
              <FormItem>
                <FormLabel>Visibility</FormLabel>
                <Select onValueChange={setVisibility} defaultValue={visibility}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Visibility' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='public'>Public</SelectItem>
                    <SelectItem value='link'>Link</SelectItem>
                    <SelectItem value='private'>Private</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className='w-full' type='submit' disabled={pending}>
            Submit
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default UploadPage;
