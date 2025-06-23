'use client';

import { useState } from 'react';
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
import { Loader2, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { addUserReview } from '@/app/actions/add-user-review';

const reviewSubmissionSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  company: z.string().optional(),
  text: z.string().min(10, 'Review must be at least 10 characters.'),
  rating: z.number().min(1, 'Please provide a rating.').max(5),
  avatar: z.any().optional(),
});

type ReviewFormValues = z.infer<typeof reviewSubmissionSchema>;

interface ReviewSubmissionFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReviewSubmissionForm({ isOpen, onClose }: ReviewSubmissionFormProps) {
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSubmissionSchema),
    defaultValues: {
      name: '',
      company: '',
      text: '',
      rating: 0,
      avatar: undefined,
    },
  });
  
  const { formState: { isSubmitting }, handleSubmit, control, setValue, reset } = form;

  const handleRatingClick = (newRating: number) => {
    setRating(newRating);
    setValue('rating', newRating, { shouldValidate: true });
  };
  
  const handleClose = () => {
    reset();
    setRating(0);
    setHoverRating(0);
    onClose();
  }

  const onSubmit = async (data: ReviewFormValues) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('company', data.company || '');
    formData.append('text', data.text);
    formData.append('rating', String(data.rating));
    if (data.avatar && data.avatar[0]) {
      formData.append('avatar', data.avatar[0]);
    }

    const result = await addUserReview(formData);

    if (result.success) {
      toast({ title: 'Review Submitted!', description: 'Thank you for your feedback.' });
      handleClose();
    } else {
      toast({
        title: 'Submission Failed',
        description: result.error || 'An unknown error occurred.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Leave a Review</DialogTitle>
          <DialogDescription>
            Share your experience working with me. Your feedback is greatly appreciated!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto p-1 pr-4">
            <FormField
              control={control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Rating</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={cn(
                            'h-7 w-7 cursor-pointer transition-colors',
                            (hoverRating || rating) >= star
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-muted-foreground/50'
                          )}
                          onClick={() => handleRatingClick(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                        />
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl><Input placeholder="e.g., Jane Doe" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company (Optional)</FormLabel>
                  <FormControl><Input placeholder="e.g., Tech Solutions Inc." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review</FormLabel>
                  <FormControl><Textarea placeholder="Describe your experience..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="avatar"
              render={({ field: { onChange, ...rest } }) => (
                <FormItem>
                  <FormLabel>Your Avatar (Optional)</FormLabel>
                  <FormControl>
                    <Input type="file" accept="image/*" onChange={(e) => onChange(e.target.files)} {...rest} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Submit Review
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
