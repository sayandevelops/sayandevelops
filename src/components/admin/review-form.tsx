
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { addReviewEntry, updateReviewEntry } from '@/lib/firestore';
import type { Review } from '@/lib/data';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { uploadImage } from '@/app/actions/cloudinary';

const reviewFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  company: z.string().optional(),
  text: z.string().min(1, 'Review text is required'),
  rating: z.coerce.number().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
  avatar: z.any().optional(),
  dataAiHint: z.string().optional(),
});

type ReviewFormValues = z.infer<typeof reviewFormSchema>;

interface ReviewFormProps {
  isOpen: boolean;
  onClose: () => void;
  review: Review | null;
}

export function ReviewForm({ isOpen, onClose, review }: ReviewFormProps) {
  const { toast } = useToast();
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      name: '',
      company: '',
      text: '',
      rating: 5,
      avatar: undefined,
      dataAiHint: '',
    },
  });

  const { formState: { isSubmitting }, reset, watch } = form;
  const currentAvatar = watch('avatar');

  useEffect(() => {
    if (isOpen && review) {
      reset(review);
    } else if (isOpen) {
      reset({
        name: '',
        company: '',
        text: '',
        rating: 5,
        avatar: undefined,
        dataAiHint: '',
      });
    }
  }, [isOpen, review, reset]);

  const onSubmit = async (data: ReviewFormValues) => {
    try {
      let avatarUrl = review?.avatar || '';

      if (data.avatar && typeof data.avatar === 'object' && data.avatar.length > 0) {
        const file = data.avatar[0];
        const formData = new FormData();
        formData.append('file', file);

        const result = await uploadImage(formData);
        if (result.success && result.url) {
          avatarUrl = result.url;
        } else {
          throw new Error(result.error || 'Image upload failed');
        }
      }
      
      const { avatar, ...restOfData } = data;
      const firestoreData = {
        ...restOfData,
        avatar: avatarUrl,
      };

      if (review) {
        await updateReviewEntry(review.id, firestoreData);
        toast({ title: 'Success', description: 'Review updated successfully.' });
      } else {
        await addReviewEntry(firestoreData);
        toast({ title: 'Success', description: 'Review added successfully.' });
      }
      onClose();
    } catch (error) {
      console.error('Failed to save review:', error);
      toast({
        title: 'Error',
        description: (error as Error).message || 'Failed to save review entry.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{review ? 'Edit Review' : 'Add New Review'}</DialogTitle>
          <DialogDescription>
            Fill in the details for the client review. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto p-1 pr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Client Name</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Jane Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Company (Optional)</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Acme Inc." {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
             <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Rating (1-5)</FormLabel>
                    <FormControl>
                        <Input type="number" min="1" max="5" placeholder="5" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review Text</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter the testimonial here..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="avatar"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <FormLabel>Client Avatar</FormLabel>
                  <FormControl>
                    <Input type="file" accept="image/*" onChange={(e) => onChange(e.target.files)} {...rest} />
                  </FormControl>
                  <FormMessage />
                  {review?.avatar && (!currentAvatar || typeof currentAvatar === 'string') && (
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground">Current avatar:</p>
                      <Image src={review.avatar} alt="Current client avatar" width={80} height={80} className="rounded-full border object-cover bg-white p-1" />
                    </div>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dataAiHint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image AI Hint (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., person portrait" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
