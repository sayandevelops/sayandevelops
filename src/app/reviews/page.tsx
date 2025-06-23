
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getReviewEntries } from "@/lib/firestore";
import type { Review } from "@/lib/data";
import { Star, UserCircle2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function AllReviewsPage() {
  const reviewsData = await getReviewEntries();

  return (
    <section id="all-reviews" className="container py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">All Client Testimonials</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Hear what my clients have to say about their experience.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviewsData.map((review: Review) => (
          <Card key={review.id} className="professional-card flex flex-col">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-14 w-14">
                <AvatarImage src={review.avatar} alt={review.name} data-ai-hint={review.dataAiHint || 'client avatar'} />
                <AvatarFallback>
                  <UserCircle2 className="h-8 w-8 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{review.name}</CardTitle>
                {review.company && <p className="text-sm text-muted-foreground">{review.company}</p>}
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground italic">&quot;{review.text}&quot;</p>
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
    </section>
  );
}
