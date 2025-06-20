
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { certificatesData, type CertificateEntry } from "@/lib/data";
import { Award, Download, ExternalLink, ArrowRight } from "lucide-react";

const CERTIFICATES_ON_HOMEPAGE = 3;

export function CertificatesSection() {
  if (!certificatesData || certificatesData.length === 0) {
    return null;
  }

  const displayedCertificates = certificatesData.slice(0, CERTIFICATES_ON_HOMEPAGE);

  return (
    <section id="certificates" className="bg-muted/30 dark:bg-muted/10">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight inline-flex items-center">
            <Award className="mr-3 h-10 w-10 text-primary" /> Certificates
          </h2>
          <p className="text-lg text-muted-foreground mt-2">
            My achievements and qualifications.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedCertificates.map((cert: CertificateEntry) => (
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
                {cert.downloadUrl && (
                  <Button asChild variant="default" size="sm">
                    <Link href={cert.downloadUrl} target="_blank" rel="noopener noreferrer" download>
                      <Download className="mr-2 h-4 w-4" /> Download
                    </Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
        {certificatesData.length > CERTIFICATES_ON_HOMEPAGE && (
          <div className="mt-12 text-center">
            <Button asChild size="lg" className="shadow-lg hover:shadow-primary/50 transition-shadow">
              <Link href="/certificates">
                Explore More Certificates <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
