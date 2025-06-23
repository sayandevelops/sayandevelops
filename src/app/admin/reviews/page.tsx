
'use client';

import React, { useState, useEffect } from 'react';
import { getReviewEntries, deleteReviewEntry } from '@/lib/firestore';
import type { Review } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, PlusCircle, Trash2, Edit, Star, UserCircle2 } from 'lucide-react';
import { ReviewForm } from '@/components/admin/review-form';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ManageReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const { toast } = useToast();

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const entries = await getReviewEntries();
      setReviews(entries);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
      toast({ title: "Error", description: "Could not fetch review entries.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleEdit = (review: Review) => {
    setEditingReview(review);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setEditingReview(null);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingReview(null);
    fetchReviews(); // Refetch data after form closes
  };
  
  const handleDelete = async (id: string) => {
    try {
      await deleteReviewEntry(id);
      toast({ title: "Success", description: "Review entry deleted." });
      fetchReviews();
    } catch (error) {
      console.error("Failed to delete review:", error);
      toast({ title: "Error", description: "Could not delete entry.", variant: "destructive" });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading reviews...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Reviews</h1>
        <Button onClick={handleAddNew}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>

      <ReviewForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        review={editingReview}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <Card key={review.id} className="flex flex-col">
            <CardHeader className="flex-row justify-between items-start">
                <div className="flex items-center gap-4 w-4/5">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={review.avatar} alt={review.name} />
                        <AvatarFallback>
                            <UserCircle2 className="h-6 w-6" />
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle>{review.name}</CardTitle>
                        <CardDescription>{review.company}</CardDescription>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleEdit(review)}>
                        <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="icon">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this review.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(review.id)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                    </AlertDialog>
                </div>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground italic">&quot;{review.text}&quot;</p>
            </CardContent>
            <CardFooter>
                 <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                    <Star
                        key={i}
                        className={`h-5 w-5 ${
                        i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/50"
                        }`}
                    />
                    ))}
                </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
