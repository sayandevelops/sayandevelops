
'use client';

import React, { useState, useEffect } from 'react';
import { getCertificateEntries, deleteCertificateEntry } from '@/lib/firestore';
import type { CertificateEntry } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, PlusCircle, Trash2, Edit, ExternalLink } from 'lucide-react';
import { CertificateForm } from '@/components/admin/certificate-form';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from 'next/link';
import Image from 'next/image';

export default function ManageCertificatesPage() {
  const [certificates, setCertificates] = useState<CertificateEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState<CertificateEntry | null>(null);
  const { toast } = useToast();

  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const entries = await getCertificateEntries();
      setCertificates(entries);
    } catch (error) {
      console.error("Failed to fetch certificates:", error);
      toast({ title: "Error", description: "Could not fetch certificate entries.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleEdit = (cert: CertificateEntry) => {
    setEditingCertificate(cert);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setEditingCertificate(null);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingCertificate(null);
    fetchCertificates(); // Refetch data after form closes
  };
  
  const handleDelete = async (id: string) => {
    try {
      await deleteCertificateEntry(id);
      toast({ title: "Success", description: "Certificate entry deleted." });
      fetchCertificates();
    } catch (error) {
      console.error("Failed to delete certificate:", error);
      toast({ title: "Error", description: "Could not delete entry.", variant: "destructive" });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading certificates...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Certificates</h1>
        <Button onClick={handleAddNew}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>

      <CertificateForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        certificate={editingCertificate}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <Card key={cert.id} className="flex flex-col">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div className="w-4/5">
                        <CardTitle>{cert.title}</CardTitle>
                        <CardDescription>{cert.issuer} - {cert.issueDate}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleEdit(cert)}>
                            <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="icon">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete this certificate.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(cert.id)}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
                 <div className="relative aspect-video w-full mt-2 rounded-md overflow-hidden border">
                    {cert.thumbnailUrl ? (
                        <Image src={cert.thumbnailUrl} alt={cert.title} layout="fill" objectFit="cover" data-ai-hint={cert.dataAiHint || 'certificate image'} />
                    ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                            <span className="text-xs text-muted-foreground">No Image</span>
                        </div>
                    )}
                 </div>
            </CardHeader>
            <CardContent className="flex-grow">
              {/* Optional: Add more details here if needed */}
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
    </div>
  );
}
