
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
import { addExperienceEntry, updateExperienceEntry } from '@/lib/firestore';
import type { ExperienceEntry } from '@/lib/data';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { uploadImage } from '@/app/actions/cloudinary';

const experienceFormSchema = z.object({
  role: z.string().min(1, 'Role is required'),
  company: z.string().min(1, 'Company is required'),
  duration: z.string().min(1, 'Duration is required'),
  description: z.string().min(1, 'Description is required'),
  companyLink: z.string().url().optional().or(z.literal('')),
  companyLogo: z.any().optional(),
  dataAiHintLogo: z.string().optional(),
  techStack: z.string().min(1, 'Tech stack is required'),
});

type ExperienceFormValues = z.infer<typeof experienceFormSchema>;

interface ExperienceFormProps {
  isOpen: boolean;
  onClose: () => void;
  experience: ExperienceEntry | null;
}

export function ExperienceForm({ isOpen, onClose, experience }: ExperienceFormProps) {
  const { toast } = useToast();
  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceFormSchema),
    defaultValues: {
      role: '',
      company: '',
      duration: '',
      description: '',
      companyLink: '',
      companyLogo: undefined,
      dataAiHintLogo: '',
      techStack: '',
    },
  });

  const { formState: { isSubmitting }, reset, watch } = form;
  const currentLogo = watch('companyLogo');

  useEffect(() => {
    if (isOpen && experience) {
      reset({
        ...experience,
        techStack: experience.techStack.join(', '),
      });
    } else {
      reset({
        role: '',
        company: '',
        duration: '',
        description: '',
        companyLink: '',
        companyLogo: undefined,
        dataAiHintLogo: '',
        techStack: '',
      });
    }
  }, [isOpen, experience, reset]);

  const onSubmit = async (data: ExperienceFormValues) => {
    try {
      let logoUrl = experience?.companyLogo || '';

      // Check if a new file was uploaded (it will be a FileList object)
      if (data.companyLogo && typeof data.companyLogo === 'object' && data.companyLogo.length > 0) {
        const file = data.companyLogo[0];
        const formData = new FormData();
        formData.append('file', file);

        const result = await uploadImage(formData);
        if (result.success && result.url) {
          logoUrl = result.url;
        } else {
          throw new Error(result.error || 'Image upload failed');
        }
      }

      const techStackArray = data.techStack.split(',').map(item => item.trim()).filter(Boolean);
      const submissionData = { ...data, companyLogo: logoUrl, techStack: techStackArray };
      
      // Remove the file object from submission data if it exists
      delete (submissionData as Partial<typeof submissionData>).companyLogo;


      if (experience) {
        await updateExperienceEntry(experience.id, { ...submissionData, companyLogo: logoUrl });
        toast({ title: 'Success', description: 'Experience updated successfully.' });
      } else {
        await addExperienceEntry({ ...submissionData, companyLogo: logoUrl });
        toast({ title: 'Success', description: 'Experience added successfully.' });
      }
      onClose();
    } catch (error) {
      console.error('Failed to save experience:', error);
      toast({
        title: 'Error',
        description: (error as Error).message || 'Failed to save experience entry.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{experience ? 'Edit Experience' : 'Add New Experience'}</DialogTitle>
          <DialogDescription>
            Fill in the details for the experience entry. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto p-1 pr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Full Stack Developer" {...field} />
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
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Acme Innovations" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Jan 2023 - Present" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your responsibilities and achievements..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="techStack"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tech Stack (comma-separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Next.js, TypeScript, PostgreSQL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyLink"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Company Link (Optional)</FormLabel>
                  <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
            />
             <FormField
                control={form.control}
                name="companyLogo"
                render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                    <FormLabel>Company Logo</FormLabel>
                    <FormControl>
                        <Input type="file" accept="image/*" onChange={(e) => onChange(e.target.files)} {...rest} />
                    </FormControl>
                    <FormMessage />
                    {experience?.companyLogo && (!currentLogo || typeof currentLogo === 'string') && (
                        <div className="mt-2">
                        <p className="text-sm text-muted-foreground">Current logo:</p>
                        <Image src={experience.companyLogo} alt="Current company logo" width={100} height={40} className="rounded-md border object-contain bg-white p-1" />
                        </div>
                    )}
                    </FormItem>
                )}
            />
            <FormField
              control={form.control}
              name="dataAiHintLogo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo AI Hint (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., tech company logo" {...field} />
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
