
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getProjectEntries } from "@/lib/firestore";
import { type Project, demoProjectData } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, ArrowRight } from "lucide-react"

const PROJECTS_ON_HOMEPAGE = 3;

export async function ProjectsSection() {
  let allProjects = await getProjectEntries();
  const isFirestoreEmpty = !allProjects || allProjects.length === 0;

  if (isFirestoreEmpty) {
    allProjects = demoProjectData;
  }
  
  const displayedProjects = allProjects.slice(0, PROJECTS_ON_HOMEPAGE);

  return (
    <section id="projects" className="container">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold tracking-tight">My Projects</h2>
        <p className="text-lg text-muted-foreground mt-2">
          A selection of my recent work and personal projects.
           {isFirestoreEmpty && (
            <span className="block text-sm mt-1">(This is demo content. Add your own through the admin panel.)</span>
          )}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedProjects.map((project: Project) => (
          <Card key={project.id} className="professional-card flex flex-col overflow-hidden">
            <CardHeader>
              <div className="aspect-[16/9] relative mb-4 rounded-md overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                  data-ai-hint={project.dataAiHint}
                />
              </div>
              <CardTitle className="text-xl">{project.title}</CardTitle>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.techStack.map((tech) => (
                  <Badge key={tech} variant="secondary">{tech}</Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{project.description}</CardDescription>
            </CardContent>
            <CardFooter className="flex gap-2 justify-end">
              {project.liveLink && (
                <Button asChild variant="outline" size="sm">
                  <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                  </Link>
                </Button>
              )}
              {project.githubLink && (
                <Button asChild variant="outline" size="sm">
                  <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> GitHub
                  </Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
      {allProjects.length > PROJECTS_ON_HOMEPAGE && !isFirestoreEmpty && (
        <div className="mt-12 text-center">
          <Button asChild size="lg" className="shadow-lg hover:shadow-primary/50 transition-shadow">
            <Link href="/projects">
              Explore More Projects <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      )}
    </section>
  )
}
