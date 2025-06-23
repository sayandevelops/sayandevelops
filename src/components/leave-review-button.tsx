'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ReviewSubmissionForm } from '@/components/review-submission-form';
import { PlusCircle } from 'lucide-react';

type ButtonProps = React.ComponentProps<typeof Button>;

export function LeaveReviewButton({ variant = "outline", size = "lg" }: { variant?: ButtonProps['variant'], size?: ButtonProps['size'] }) {
    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <>
            <Button size={size} variant={variant} onClick={() => setIsFormOpen(true)}>
                <PlusCircle className="mr-2 h-5 w-5" /> Leave a Review
            </Button>
            <ReviewSubmissionForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
        </>
    );
}
