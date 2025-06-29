
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
import { useToast } from '@/hooks/use-toast';
import { addCertificateEntry, updateCertificateEntry } from '@/lib/firestore';
import type { CertificateEntry } from '@/lib/data';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { uploadImage } from '@/app/actions/cloudinary';

const certificateFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  issuer: z.string().min(1, 'Issuer is required'),
  issueDate: z.string().min(1, 'Issue date is required'),
  certificateUrl: z.string().url().optional().or(z.literal('')),
  thumbnailUrl: z.any().optional(),
  dataAiHint: z.string().optional(),
});

type CertificateFormValues = z.infer<typeof certificateFormSchema>;

interface CertificateFormProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: CertificateEntry | null;
}

export function CertificateForm({ isOpen, onClose, certificate }: CertificateFormProps) {
  const { toast } = useToast();
  const form = useForm<CertificateFormValues>({
    resolver: zodResolver(certificateFormSchema),
    defaultValues: {
      title: '',
      issuer: '',
      issueDate: '',
      certificateUrl: '',
      thumbnailUrl: undefined,
      dataAiHint: '',
    },
  });

  const { formState: { isSubmitting }, reset, watch } = form;
  const currentThumbnail = watch('thumbnailUrl');

  useEffect(() => {
    if (isOpen && certificate) {
      reset(certificate);
    } else {
      reset({
        title: '',
        issuer: '',
        issueDate: '',
        certificateUrl: '',
        thumbnailUrl: undefined,
        dataAiHint: '',
      });
    }
  }, [isOpen, certificate, reset]);

  const onSubmit = async (data: CertificateFormValues) => {
    try {
      let thumbUrl = certificate?.thumbnailUrl || '';

      if (data.thumbnailUrl && typeof data.thumbnailUrl === 'object' && data.thumbnailUrl.length > 0) {
        const file = data.thumbnailUrl[0];
        const formData = new FormData();
        formData.append('file', file);

        const result = await uploadImage(formData);
        if (result.success && result.url) {
          thumbUrl = result.url;
        } else {
          toast({
            title: 'Image Upload Failed',
            description: result.error || 'An unknown error occurred.',
            variant: 'destructive',
          });
          return; // Stop execution
        }
      }
      
      const { thumbnailUrl, ...restOfData } = data;
      const firestoreData = {
        ...restOfData,
        thumbnailUrl: thumbUrl,
      };

      if (certificate) {
        await updateCertificateEntry(certificate.id, firestoreData);
        toast({ title: 'Success', description: 'Certificate updated successfully.' });
      } else {
        await addCertificateEntry(firestoreData);
        toast({ title: 'Success', description: 'Certificate added successfully.' });
      }
      onClose();
    } catch (error) {
      console.error('Failed to save certificate:', error);
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
          <DialogTitle>{certificate ? 'Edit Certificate' : 'Add New Certificate'}</DialogTitle>
          <DialogDescription>
            Fill in the details for the certificate. Click save when you're done.
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
                    <Input placeholder="e.g., Cloud Architect" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="issuer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Issuer</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Google Cloud" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="issueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Issue Date</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Issued Mar 2023" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="certificateUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Certificate URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/certificate" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
            />
            <FormField
              control={form.control}
              name="thumbnailUrl"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <FormLabel>Certificate Thumbnail</FormLabel>
                  <FormControl>
                    <Input type="file" accept="image/*" onChange={(e) => onChange(e.target.files)} {...rest} />
                  </FormControl>
                  <FormMessage />
                  {certificate?.thumbnailUrl && (!currentThumbnail || typeof currentThumbnail === 'string') && (
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground">Current thumbnail:</p>
                      <Image src={certificate.thumbnailUrl} alt="Current certificate thumbnail" width={200} height={112} className="rounded-md border object-cover bg-white p-1" />
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
                    <Input placeholder="e.g., tech certificate" {...field} />
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
