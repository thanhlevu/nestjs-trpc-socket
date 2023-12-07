import * as z from 'zod';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useEucStore } from '../store';
import { trpc } from '../trpc';

const formSchema = z.object({
  id: z.string(),
  productName: z.string().min(2, {
    message: 'productName must be at least 2 characters.',
  }),
  brand: z.string(),
  tire: z.number(),
  maxSpeed: z.number(),
  range: z.number(),
  weight: z.number(),
  suspension: z.boolean(),
  bluetooth: z.boolean(),
});

type EucFormProps = {
  sendMessage: (val: string) => void;
};

export default function EucForm({ sendMessage }: EucFormProps) {
  const { editEucId, eucList, updateEucId } = useEucStore();
  const editEuc = eucList.find((e) => e.id === editEucId);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: editEuc || {
      id: '',
      productName: '',
      brand: '',
      tire: 0,
      maxSpeed: 0,
      range: 0,
      weight: 0,
      suspension: false,
      bluetooth: false,
    },
  });

  useEffect(() => {
    form.reset(
      editEuc || {
        id: '',
        productName: '',
        brand: '',
        tire: 0,
        maxSpeed: 0,
        range: 0,
        weight: 0,
        suspension: false,
        bluetooth: false,
      },
    );
  }, [editEucId, editEuc, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (editEuc) {
      await trpc.updateEuc.mutate(values);
      sendMessage('EUC_UPDATE');
      updateEucId(null);
    } else {
      await trpc.addEuc.mutate(values);
      sendMessage('NEW_EUC_ADDED');
      form.reset(
        editEuc || {
          id: '',
          productName: '',
          brand: '',
          tire: 0,
          maxSpeed: 0,
          range: 0,
          weight: 0,
          suspension: false,
          bluetooth: false,
        },
      );
    }
  }

  async function onDelete() {
    await trpc.deleteEuc.mutate({ id: editEuc!.id });
    sendMessage('EUC_DELETE');
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem className="rounded-xl">
                <FormLabel>Product name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem className="rounded-xl">
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxSpeed"
            render={({ field }) => (
              <FormItem className="rounded-xl">
                <FormLabel>Max Speed (Km/h)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(event) =>
                      field.onChange(parseInt(event.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="range"
            render={({ field }) => (
              <FormItem className="rounded-xl">
                <FormLabel>Range (Km)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(event) =>
                      field.onChange(parseInt(event.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem className="rounded-xl">
                <FormLabel>Weight (Kg)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(event) =>
                      field.onChange(parseInt(event.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="suspension"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 shadow">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Suspension</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bluetooth"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 shadow">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Bluetooth</FormLabel>
                </div>
              </FormItem>
            )}
          />
          {form.formState.isDirty && <Button type="submit">Submit</Button>}
          {editEuc && (
            <Button
              type="button"
              onClick={onDelete}
              variant={'destructive'}
              className="bg-red-500"
            >
              Delete
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}
