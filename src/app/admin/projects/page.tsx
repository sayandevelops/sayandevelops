
'use client';

import React, { useState, useEffect } from 'react';
import { getProjectEntries, deleteProjectEntry } from '@/lib/firestore';
import type { Project } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, PlusCircle, Trash2, Edit, ExternalLink, Github } from 'lucide-react';
import { ProjectForm } from '@/components/admin/project-form';
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
import Image from 'next/image';

export default function ManageProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const { toast } = useToast();

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const entries = await getProjectEntries();
      setProjects(entries);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      toast({ title: "Error", description: "Could not fetch project entries.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleEdit = (proj: Project) => {
    setEditingProject(proj);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setEditingProject(null);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingProject(null);
    fetchProjects(); // Refetch data after form closes
  };
  
  const handleDelete = async (id: string) => {
    try {
      await deleteProjectEntry(id);
      toast({ title: "Success", description: "Project entry deleted." });
      fetchProjects();
    } catch (error) {
      console.error("Failed to delete project:", error);
      toast({ title: "Error", description: "Could not delete entry.", variant: "destructive" });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading projects...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Projects</h1>
        <Button onClick={handleAddNew}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>

      <ProjectForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        project={editingProject}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <Card key={proj.id} className="flex flex-col">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="w-4/5">{proj.title}</CardTitle>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleEdit(proj)}>
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
                                This action cannot be undone. This will permanently delete this project.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(proj.id)}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
                 <div className="relative aspect-video w-full mt-2 rounded-md overflow-hidden border">
                    {proj.image ? (
                        <Image src={proj.image} alt={proj.title} layout="fill" objectFit="cover" data-ai-hint={proj.dataAiHint || 'project image'} />
                    ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                            <span className="text-xs text-muted-foreground">No Image</span>
                        </div>
                    )}
                 </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground mb-4">{proj.description}</p>
              <div className="flex flex-wrap gap-2">
                {proj.techStack.map(tech => <Badge key={tech} variant="secondary">{tech}</Badge>)}
              </div>
            </CardContent>
            <CardFooter className="flex gap-2 justify-end">
                 {proj.liveLink && (
                    <Button asChild variant="outline" size="sm">
                    <Link href={proj.liveLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" /> Live
                    </Link>
                    </Button>
                )}
                {proj.githubLink && (
                    <Button asChild variant="outline" size="sm">
                    <Link href={proj.githubLink} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" /> GitHub
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
