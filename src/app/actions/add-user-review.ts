'use server';

import { z } from 'zod';
import { addReviewEntry } from '@/lib/firestore';
import { uploadImage } from '@/app/actions/cloudinary';
import { revalidatePath } from 'next/cache';

const reviewSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  company: z.string().optional(),
  text: z.string().min(10, "Review must be at least 10 characters long."),
  rating: z.coerce.number().min(1, "Please provide a rating.").max(5),
  avatar: z.instanceof(File).optional(),
});


export async function addUserReview(formData: FormData) {
  const rawData = {
    name: formData.get('name'),
    company: formData.get('company'),
    text: formData.get('text'),
    rating: formData.get('rating'),
    avatar: formData.get('avatar') instanceof File && (formData.get('avatar') as File).size > 0 ? formData.get('avatar') : undefined,
  };

  const validationResult = reviewSchema.safeParse(rawData);

  if (!validationResult.success) {
    return { success: false, error: "Invalid form data.", issues: validationResult.error.flatten().fieldErrors };
  }

  try {
    let avatarUrl = '';
    const { avatar, ...reviewData } = validationResult.data;

    if (avatar) {
      const imageFormData = new FormData();
      imageFormData.append('file', avatar);
      const uploadResult = await uploadImage(imageFormData);

      if (uploadResult.success && uploadResult.url) {
        avatarUrl = uploadResult.url;
      } else {
        throw new Error(uploadResult.error || 'Avatar upload failed');
      }
    }
    
    const finalReviewData = {
      ...reviewData,
      company: reviewData.company || '',
      avatar: avatarUrl,
      dataAiHint: 'person portrait' 
    };
    
    await addReviewEntry(finalReviewData);

    revalidatePath('/');
    revalidatePath('/reviews');

    return { success: true, message: 'Thank you for your review!' };
  } catch (error: any) {
    console.error('Error adding review:', error);
    return { success: false, error: error.message || 'An unexpected error occurred.' };
  }
}
