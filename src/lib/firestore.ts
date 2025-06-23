
'use server';

import { db } from './firebase';
import { collection, getDocs, doc, updateDoc, addDoc, deleteDoc, orderBy, query } from 'firebase/firestore';
import type { ExperienceEntry, Project } from './data';
import { demoExperienceData, demoProjectData } from './data';

const experienceCollectionRef = collection(db, 'experience');
const projectsCollectionRef = collection(db, 'projects');

// --- EXPERIENCE ---

export const getExperienceEntries = async (): Promise<ExperienceEntry[]> => {
  try {
    const q = query(experienceCollectionRef, orderBy('duration', 'desc'));
    let snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.log("Experience collection is empty. Seeding with demo data...");
      const seedPromises = demoExperienceData.map(exp => {
          const { id, ...data } = exp;
          return addDoc(experienceCollectionRef, data);
      });
      await Promise.all(seedPromises);
      console.log("Experience demo data seeded successfully.");
      snapshot = await getDocs(q);
    }

    const entries = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as ExperienceEntry[];
    
    return entries;
  } catch (error) {
    console.error("Error fetching or seeding experience entries from Firestore:", error);
    return [];
  }
};

export const updateExperienceEntry = async (id: string, data: Partial<Omit<ExperienceEntry, 'id'>>) => {
  const entryDoc = doc(db, 'experience', id);
  await updateDoc(entryDoc, data);
};

export const addExperienceEntry = async (data: Omit<ExperienceEntry, 'id'>) => {
  await addDoc(experienceCollectionRef, data);
}

export const deleteExperienceEntry = async (id: string) => {
  const entryDoc = doc(db, 'experience', id);
  await deleteDoc(entryDoc);
}


// --- PROJECTS ---

export const getProjectEntries = async (): Promise<Project[]> => {
  try {
    const q = query(projectsCollectionRef, orderBy('title', 'asc'));
    let snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      console.log("Projects collection is empty. Seeding with demo data...");
      const seedPromises = demoProjectData.map(project => {
          const { id, ...data } = project;
          return addDoc(projectsCollectionRef, data);
      });
      await Promise.all(seedPromises);
      console.log("Projects demo data seeded successfully.");
      snapshot = await getDocs(q);
    }
    
    const entries = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Project[];
    
    return entries;
  } catch (error) {
    console.error("Error fetching or seeding project entries from Firestore:", error);
    return [];
  }
};

export const updateProjectEntry = async (id: string, data: Partial<Omit<Project, 'id'>>) => {
  const entryDoc = doc(db, 'projects', id);
  await updateDoc(entryDoc, data);
};

export const addProjectEntry = async (data: Omit<Project, 'id'>) => {
  await addDoc(projectsCollectionRef, data);
}

export const deleteProjectEntry = async (id: string) => {
  const entryDoc = doc(db, 'projects', id);
  await deleteDoc(entryDoc);
}
