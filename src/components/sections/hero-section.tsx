import { Button } from "@/components/ui/button"
import { Download, Send } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section id="hero" className="bg-muted/30 dark:bg-muted/10">
      <div className="container min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center py-16 md:py-24">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 animate-fadeInUp">
          <span className="block">SayanDevelops</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl animate-fadeInUp animation-delay-200">
          Web Developer | Programmer | Tech Enthusiast
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-fadeInUp animation-delay-400">
          <Button asChild size="lg" className="shadow-lg hover:shadow-primary/50 transition-shadow">
            <Link href="/sayan_mondal_resume.pdf" target="_blank" download>
              <Download className="mr-2 h-5 w-5" />
              Download Resume
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="shadow-lg hover:shadow-accent/50 transition-shadow">
            <Link href="#contact">
              <Send className="mr-2 h-5 w-5" />
              Contact Me
            </Link>
          </Button>
        </div>
        <p className="mt-12 text-sm text-muted-foreground animate-fadeInUp animation-delay-600">
          Crafting digital experiences with passion and precision.
        </p>
      </div>
    </section>
  )
}
