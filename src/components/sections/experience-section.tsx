
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { experienceData, type ExperienceEntry } from "@/lib/data";
import { Briefcase, ExternalLink } from "lucide-react";

export function ExperienceSection() {
  if (!experienceData || experienceData.length === 0) {
    return null;
  }

  return (
    <section id="experience" className="container">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold tracking-tight inline-flex items-center">
          <Briefcase className="mr-3 h-10 w-10 text-primary" /> Experience
        </h2>
        <p className="text-lg text-muted-foreground mt-2">
          My professional journey and contributions.
        </p>
      </div>
      <div className="space-y-8 relative">
        {/* Vertical line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 hidden md:block"></div>

        {experienceData.map((exp, index) => (
          <div key={exp.id} className="flex md:items-center w-full">
            {/* Dot on the timeline for larger screens */}
            <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="h-3 w-3 rounded-full bg-primary border-2 border-background"></div>
            </div>

            <Card className={`professional-card w-full md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:ml-auto md:mr-8' : 'md:mr-auto md:ml-8'}`}>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                  <CardTitle className="text-xl mb-1 sm:mb-0">{exp.role}</CardTitle>
                  <Badge variant="outline" className="text-sm shrink-0 w-fit">{exp.duration}</Badge>
                </div>
                {exp.companyLink ? (
                  <Link href={exp.companyLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center text-md font-semibold">
                    {exp.company} <ExternalLink className="ml-1.5 h-4 w-4" />
                  </Link>
                ) : (
                  <p className="text-md font-semibold text-muted-foreground">{exp.company}</p>
                )}
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-3">{exp.description}</CardDescription>
                <div className="flex flex-wrap gap-2">
                  {exp.techStack.map((tech) => (
                    <Badge key={tech} variant="secondary">{tech}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}

    