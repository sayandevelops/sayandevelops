import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getExperienceEntries } from "@/lib/firestore";
import type { ExperienceEntry } from "@/lib/data";
import { ExternalLink, Briefcase } from "lucide-react";

export default async function AllExperiencePage() {
  const experienceData = await getExperienceEntries();

  return (
    <section id="all-experience" className="container py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl inline-flex items-center">
          <Briefcase className="mr-3 h-10 w-10 text-primary" /> My Professional Journey
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          A comprehensive overview of my work experience and contributions.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {experienceData.map((exp: ExperienceEntry) => (
          <Card key={exp.id} className="professional-card flex flex-col">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-2">
                <CardTitle className="text-xl mb-1 sm:mb-0">{exp.role}</CardTitle>
                <Badge variant="outline" className="text-sm shrink-0 w-fit mt-1 sm:mt-0">{exp.duration}</Badge>
              </div>
              <div className="flex items-center gap-3 mt-2">
                {exp.companyLogo && (
                  <div className="relative h-10 w-24 shrink-0">
                    <Image
                      src={exp.companyLogo}
                      alt={`${exp.company} logo`}
                      layout="fill"
                      objectFit="contain"
                      data-ai-hint={exp.dataAiHintLogo || 'company logo'}
                    />
                  </div>
                )}
                {exp.companyLink ? (
                  <Link href={exp.companyLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center text-md font-semibold">
                    {exp.company} <ExternalLink className="ml-1.5 h-4 w-4" />
                  </Link>
                ) : (
                  <p className="text-md font-semibold text-muted-foreground">{exp.company}</p>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="mb-3">{exp.description}</CardDescription>
              <div className="flex flex-wrap gap-2">
                {exp.techStack.map((tech) => (
                  <Badge key={tech} variant="secondary">{tech}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
