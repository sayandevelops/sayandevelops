
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { certificatesData, type CertificateEntry } from "@/lib/data";
import { Award, ExternalLink } from "lucide-react";

export default function AllCertificatesPage() {
  return (
    <section id="all-certificates" className="container py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl inline-flex items-center">
          <Award className="mr-3 h-10 w-10 text-primary" /> All Certificates
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          A comprehensive list of my certifications and qualifications.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {certificatesData.map((cert: CertificateEntry) => (
          <Card key={cert.id} className="professional-card flex flex-col overflow-hidden">
            <CardHeader>
              <div className="aspect-[16/10] relative mb-4 rounded-md overflow-hidden">
                <Image
                  src={cert.thumbnailUrl}
                  alt={cert.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                  data-ai-hint={cert.dataAiHint || 'certificate document'}
                />
              </div>
              <CardTitle className="text-xl">{cert.title}</CardTitle>
              <CardDescription>{cert.issuer} - {cert.issueDate}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              {/* Optionally add more details here if needed */}
            </CardContent>
            <CardFooter className="flex gap-2 justify-end">
              {cert.certificateUrl && (
                <Button asChild variant="outline" size="sm">
                  <Link href={cert.certificateUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> View
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
