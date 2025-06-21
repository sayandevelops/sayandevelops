'use client';

import React, { useState, useEffect } from 'react';
import { getExperienceEntries, deleteExperienceEntry } from '@/lib/firestore';
import type { ExperienceEntry } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, PlusCircle, Trash2, Edit, ExternalLink } from 'lucide-react';
import { ExperienceForm } from '@/components/admin/experience-form';
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
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function ManageExperiencePage() {
  const [experiences, setExperiences] = useState<ExperienceEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<ExperienceEntry | null>(null);
  const { toast } = useToast();

  const fetchExperiences = async () => {
    setLoading(true);
    try {
      const entries = await getExperienceEntries();
      setExperiences(entries);
    } catch (error) {
      console.error("Failed to fetch experiences:", error);
      toast({ title: "Error", description: "Could not fetch experience entries.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleEdit = (exp: ExperienceEntry) => {
    setEditingExperience(exp);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setEditingExperience(null);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingExperience(null);
    fetchExperiences(); // Refetch data after form closes
  };
  
  const handleDelete = async (id: string) => {
    try {
      await deleteExperienceEntry(id);
      toast({ title: "Success", description: "Experience entry deleted." });
      fetchExperiences();
    } catch (error) {
      console.error("Failed to delete experience:", error);
      toast({ title: "Error", description: "Could not delete entry.", variant: "destructive" });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading experiences...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Experience</h1>
        <Button onClick={handleAddNew}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>

      <ExperienceForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        experience={editingExperience}
      />

      <div className="space-y-4">
        {experiences.map((exp) => (
          <Card key={exp.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{exp.role}</CardTitle>
                    <CardDescription className="flex items-center">
                        {exp.company}
                        {exp.companyLink && (
                            <Link href={exp.companyLink} target="_blank" className="ml-2 text-primary hover:underline">
                                <ExternalLink className="h-4 w-4" />
                            </Link>
                        )}
                        <span className="mx-2">•</span>
                        {exp.duration}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleEdit(exp)}>
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
                            This action cannot be undone. This will permanently delete this experience entry.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(exp.id)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{exp.description}</p>
              <div className="flex flex-wrap gap-2">
                {exp.techStack.map(tech => <Badge key={tech} variant="secondary">{tech}</Badge>)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
