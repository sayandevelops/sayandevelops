
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
import { addProjectEntry, updateProjectEntry } from '@/lib/firestore';
import type { Project } from '@/lib/data';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { uploadImage } from '@/app/actions/cloudinary';

const projectFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  techStack: z.string().min(1, 'Tech stack is required'),
  liveLink: z.string().url().optional().or(z.literal('')),
  githubLink: z.string().url().optional().or(z.literal('')),
  image: z.any().optional(),
  dataAiHint: z.string().optional(),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

interface ProjectFormProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

export function ProjectForm({ isOpen, onClose, project }: ProjectFormProps) {
  const { toast } = useToast();
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: '',
      description: '',
      techStack: '',
      liveLink: '',
      githubLink: '',
      image: undefined,
      dataAiHint: '',
    },
  });

  const { formState: { isSubmitting }, reset, watch } = form;
  const currentImage = watch('image');

  useEffect(() => {
    if (isOpen && project) {
      reset({
        ...project,
        techStack: project.techStack.join(', '),
      });
    } else {
      reset({
        title: '',
        description: '',
        techStack: '',
        liveLink: '',
        githubLink: '',
        image: undefined,
        dataAiHint: '',
      });
    }
  }, [isOpen, project, reset]);

  const onSubmit = async (data: ProjectFormValues) => {
    try {
      let imageUrl = project?.image || '';

      if (data.image && typeof data.image === 'object' && data.image.length > 0) {
        const file = data.image[0];
        const formData = new FormData();
        formData.append('file', file);

        const result = await uploadImage(formData);
        if (result.success && result.url) {
          imageUrl = result.url;
        } else {
          toast({
            title: 'Image Upload Failed',
            description: result.error || 'An unknown error occurred.',
            variant: 'destructive',
          });
          return; // Stop execution
        }
      }

      const techStackArray = data.techStack.split(',').map(item => item.trim()).filter(Boolean);
      
      const { image, ...restOfData } = data;
      const firestoreData = {
        ...restOfData,
        image: imageUrl,
        techStack: techStackArray,
      };

      if (project) {
        await updateProjectEntry(project.id, firestoreData);
        toast({ title: 'Success', description: 'Project updated successfully.' });
      } else {
        await addProjectEntry(firestoreData);
        toast({ title: 'Success', description: 'Project added successfully.' });
      }
      onClose();
    } catch (error) {
      console.error('Failed to save project:', error);
      toast({
        title: 'Error Saving Data',
        description: 'Could not save the entry to the database.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{project ? 'Edit Project' : 'Add New Project'}</DialogTitle>
          <DialogDescription>
            Fill in the details for the project. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto p-1 pr-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., My Awesome App" {...field} />
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
                    <Textarea placeholder="Describe the project..." {...field} />
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
                    <Input placeholder="e.g., Next.js, TypeScript, Cloudinary" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="liveLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Live Link (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="githubLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub Link (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://github.com/user/repo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="image"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <FormLabel>Project Image</FormLabel>
                  <FormControl>
                    <Input type="file" accept="image/*" onChange={(e) => onChange(e.target.files)} {...rest} />
                  </FormControl>
                  <FormMessage />
                  {project?.image && (!currentImage || typeof currentImage === 'string') && (
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground">Current image:</p>
                      <Image src={project.image} alt="Current project image" width={200} height={112} className="rounded-md border object-cover bg-white p-1" />
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
                    <Input placeholder="e.g., project image" {...field} />
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
