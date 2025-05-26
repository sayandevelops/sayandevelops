import { Button } from "@/components/ui/button"
import { Download, Send, Brackets, Binary, Code } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden bg-muted/30 dark:bg-muted/10">
      <div className="container min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center py-16 md:py-24 relative z-10">
        {/* Decorative coding icons */}
        <Brackets className="absolute top-[15%] left-[5%] sm:left-[10%] h-10 w-10 text-primary/20 animate-float animation-delay-200 opacity-30 md:h-16 md:w-16" />
        <Binary className="absolute top-[20%] right-[5%] sm:right-[12%] h-8 w-8 text-accent/20 animate-float animation-delay-400 opacity-30 md:h-14 md:w-14" />
        <Code className="absolute bottom-[15%] left-[10%] sm:left-[20%] h-10 w-10 text-primary/15 animate-pulse-subtle opacity-25 md:h-12 md:w-12" />
        <svg
          className="absolute bottom-[20%] right-[8%] sm:right-[18%] h-12 w-12 text-accent/15 animate-pulse-subtle animation-delay-600 opacity-25 md:h-16 md:w-16"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h8a2 2 0 002-2v-4m0 0H9m3-7h3m0 0h2M9 12l2-2 2 2m-2 2v4" />
        </svg>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 animate-fadeInUp text-gradient-primary-accent">
          SayanDevelops
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-10 max-w-3xl animate-fadeInUp animation-delay-200">
          Web Developer | Programmer | Tech Enthusiast
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-fadeInUp animation-delay-400 mb-12">
          <Button asChild size="lg" className="shadow-lg hover:shadow-primary/50 transition-shadow">
            <Link href="https://drive.google.com/file/d/1nyb6v4d7iynS9FldXAglCjzQaCKzXXL2/view?usp=sharing" target="_blank" download>
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
        <p className="text-base md:text-lg text-muted-foreground animate-fadeInUp animation-delay-600">
          Crafting digital experiences with <span className="font-semibold text-primary">passion</span> and <span className="font-semibold text-accent">precision</span>.
        </p>
      </div>
    </section>
  )
}
