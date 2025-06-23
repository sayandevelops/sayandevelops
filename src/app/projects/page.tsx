
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getProjectEntries } from "@/lib/firestore";
import type { Project } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";

export default async function AllProjectsPage() {
  const projectsData = await getProjectEntries();

  return (
    <section id="all-projects" className="container py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">All Projects</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Browse through a comprehensive list of my work and personal projects.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsData.map((project: Project) => (
          <Card key={project.id} className="professional-card flex flex-col overflow-hidden">
            <CardHeader>
              <div className="aspect-[16/9] relative mb-4 rounded-md overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                  data-ai-hint={project.dataAiHint || 'project image'}
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
    </section>
  );
}
