
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { reviewsData, type Review } from "@/lib/data"
import { Star, UserCircle2, ArrowRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const REVIEWS_ON_HOMEPAGE = 2;

export function ReviewsSection() {
  return (
    <section id="reviews" className="bg-muted/30 dark:bg-muted/10">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight">Client Testimonials</h2>
          <p className="text-lg text-muted-foreground mt-2">
            What others say about my work.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviewsData.slice(0, REVIEWS_ON_HOMEPAGE).map((review: Review) => (
            <Card key={review.id} className="professional-card flex flex-col">
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={review.avatar} alt={review.name} data-ai-hint={review.dataAiHint} />
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
        {reviewsData.length > REVIEWS_ON_HOMEPAGE && (
          <div className="mt-12 text-center">
            <Button asChild size="lg" className="shadow-lg hover:shadow-primary/50 transition-shadow">
              <Link href="/reviews">
                Explore More Reviews <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
