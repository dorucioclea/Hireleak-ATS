'use client';

import React from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import * as z from 'zod';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, FilePlus, Loader } from 'lucide-react';
import { toast } from 'sonner';
import TiptapEditor from './TipTapEditor';
import { Card } from './ui/card';

/**
 * TODO: For the date inputs, add logic to make sure that the end date is always after the start date.
 */

const formSchema = z.object({
  name: z.string().min(1, 'Please enter a name for the campaign.'),
  start_date: z.date({
    required_error: 'A starting date is required.',
  }),
  end_date: z.date({
    required_error: 'An end date is required.',
  }),
  limit: z.coerce
    .number()
    .lte(500, 'You cannot exceed 500 applicants.')
    .gte(1, 'Please enter a limit of applicants.'),
  acceptance_percentage: z
    .number()
    .lte(100, 'Tou cannot exceed 100%.')
    .gte(1, 'Please enter an acceptance percentage for the campaign.'),
});

const NewCampaignForm = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [notJobDescription, setNoJobDescription] = React.useState(false);
  const [editorText, setEditorText] = React.useState('');
  const [isChecked, setIsChecked] = React.useState(true);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      limit: 1,
      acceptance_percentage: 1,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('editorText', editorText);
    if (
      !editorText ||
      editorText === '<p></p>' ||
      editorText === '<p><br></p>'
    ) {
      setNoJobDescription((v) => (v = true));
      return;
    }
    setNoJobDescription((v) => (v = false));
    setIsSubmitting(true);
    console.log('VALUES', values);
    return;
    try {
      toast.success('Article created successfully');
      form.reset();
      setIsSubmitting(false);
    } catch (err: String | any) {
      toast.error(err);
      setIsSubmitting(false);
    }
  }

  return (
    <div className='w-full mx-auto flex flex-col gap-4 max-w-2xl'>
      <div className='flex flex-wrap items-center gap-3 justify-between'>
        <h1 className='text-3xl font-semibold'>New campaign</h1>
        <Button
          className='w-full sm:w-auto'
          disabled={isSubmitting}
          onClick={form.handleSubmit(onSubmit)}
        >
          {isSubmitting ? (
            <Loader size={18} className='animate-spin mr-2' />
          ) : (
            <FilePlus size={18} className='mr-2' />
          )}
          Create campaign
        </Button>
      </div>
      <Card className='p-6'>
        <div className='flex flex-col gap-3'>
          <Form {...form}>
            <form className='flex flex-col gap-3'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='mb-1'>
                    <FormLabel>Campaign name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder='Enter the name of your campaign'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex flex-col sm:flex-row gap-4'>
                <FormField
                  control={form.control}
                  name='start_date'
                  render={({ field }) => (
                    <FormItem className='flex flex-1 flex-col'>
                      <FormLabel>Starting date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              disabled={isSubmitting}
                              variant={'outline'}
                              className={cn(
                                'pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value ? (
                                format(field.value, 'PPP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0' align='start'>
                          <Calendar
                            mode='single'
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date: Date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='end_date'
                  render={({ field }) => (
                    <FormItem className='flex flex-1 flex-col'>
                      <FormLabel>End date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              disabled={isSubmitting}
                              variant={'outline'}
                              className={cn(
                                'pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value ? (
                                format(field.value, 'PPP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0' align='start'>
                          <Calendar
                            mode='single'
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date: Date) => date <= new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='flex flex-col sm:flex-row gap-4'>
                <FormField
                  control={form.control}
                  name='limit'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel>Limit of applicants</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isSubmitting}
                          placeholder='Enter a limit of applicants'
                          {...field}
                          type='number'
                          min='1'
                          max='100'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='acceptance_percentage'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel>Acceptance percentage</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isSubmitting}
                          placeholder='Enter an acceptance percentage'
                          {...field}
                          type='number'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>

          <div>
            <span
              className={cn(
                'text-sm font-medium inline-block mb-2',
                notJobDescription && 'text-destructive'
              )}
            >
              Job description
            </span>
            <TiptapEditor
              isSubmitting={isSubmitting}
              editorText={editorText}
              setEditorText={setEditorText}
            />
            {notJobDescription && (
              <span className='mt-2 text-sm font-medium text-destructive inline-block'>
                Please provide a job description.
              </span>
            )}
          </div>

          <div className='flex items-center space-x-2'>
            <Switch
              disabled={isSubmitting}
              checked={isChecked}
              onCheckedChange={handleToggle}
              id='show-job-description'
            />
            <Label htmlFor='show-job-description'>
              Show job description to applicants
            </Label>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NewCampaignForm;
