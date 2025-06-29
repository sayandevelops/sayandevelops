
'use server';

import { db } from './firebase';
import { collection, getDocs, doc, updateDoc, addDoc, deleteDoc, orderBy, query } from 'firebase/firestore';
import type { ExperienceEntry, Project, CertificateEntry, Review } from './data';
import { demoExperienceData, demoProjectData, demoCertificatesData, demoReviewsData } from './data';
import { revalidatePath } from 'next/cache';

const experienceCollectionRef = collection(db, 'experience');
const projectsCollectionRef = collection(db, 'projects');
const certificatesCollectionRef = collection(db, 'certificates');
const reviewsCollectionRef = collection(db, 'reviews');

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
  revalidatePath('/');
  revalidatePath('/experience');
};

export const addExperienceEntry = async (data: Omit<ExperienceEntry, 'id'>) => {
  await addDoc(experienceCollectionRef, data);
  revalidatePath('/');
  revalidatePath('/experience');
}

export const deleteExperienceEntry = async (id: string) => {
  const entryDoc = doc(db, 'experience', id);
  await deleteDoc(entryDoc);
  revalidatePath('/');
  revalidatePath('/experience');
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
  revalidatePath('/');
  revalidatePath('/projects');
};

export const addProjectEntry = async (data: Omit<Project, 'id'>) => {
  await addDoc(projectsCollectionRef, data);
  revalidatePath('/');
  revalidatePath('/projects');
}

export const deleteProjectEntry = async (id: string) => {
  const entryDoc = doc(db, 'projects', id);
  await deleteDoc(entryDoc);
  revalidatePath('/');
  revalidatePath('/projects');
}

// --- CERTIFICATES ---

export const getCertificateEntries = async (): Promise<CertificateEntry[]> => {
  try {
    const q = query(certificatesCollectionRef, orderBy('issueDate', 'desc'));
    let snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      console.log("Certificates collection is empty. Seeding with demo data...");
      const seedPromises = demoCertificatesData.map(cert => {
          const { id, ...data } = cert;
          return addDoc(certificatesCollectionRef, data);
      });
      await Promise.all(seedPromises);
      console.log("Certificates demo data seeded successfully.");
      snapshot = await getDocs(q);
    }
    
    const entries = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as CertificateEntry[];
    
    return entries;
  } catch (error) {
    console.error("Error fetching or seeding certificate entries from Firestore:", error);
    return [];
  }
};

export const updateCertificateEntry = async (id: string, data: Partial<Omit<CertificateEntry, 'id'>>) => {
  const entryDoc = doc(db, 'certificates', id);
  await updateDoc(entryDoc, data);
  revalidatePath('/');
  revalidatePath('/certificates');
};

export const addCertificateEntry = async (data: Omit<CertificateEntry, 'id'>) => {
  await addDoc(certificatesCollectionRef, data);
  revalidatePath('/');
  revalidatePath('/certificates');
}

export const deleteCertificateEntry = async (id: string) => {
  const entryDoc = doc(db, 'certificates', id);
  await deleteDoc(entryDoc);
  revalidatePath('/');
  revalidatePath('/certificates');
}

// --- REVIEWS ---

export const getReviewEntries = async (): Promise<Review[]> => {
  try {
    const q = query(reviewsCollectionRef, orderBy('name', 'asc'));
    let snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      console.log("Reviews collection is empty. Seeding with demo data...");
      const seedPromises = demoReviewsData.map(review => {
          const { id, ...data } = review;
          return addDoc(reviewsCollectionRef, data);
      });
      await Promise.all(seedPromises);
      console.log("Reviews demo data seeded successfully.");
      snapshot = await getDocs(q);
    }
    
    const entries = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Review[];
    
    return entries;
  } catch (error) {
    console.error("Error fetching or seeding review entries from Firestore:", error);
    return [];
  }
};

export const updateReviewEntry = async (id: string, data: Partial<Omit<Review, 'id'>>) => {
  const entryDoc = doc(db, 'reviews', id);
  await updateDoc(entryDoc, data);
  revalidatePath('/');
  revalidatePath('/reviews');
};

export const addReviewEntry = async (data: Omit<Review, 'id'>) => {
  await addDoc(reviewsCollectionRef, data);
  revalidatePath('/');
  revalidatePath('/reviews');
}

export const deleteReviewEntry = async (id: string) => {
  const entryDoc = doc(db, 'reviews', id);
  await deleteDoc(entryDoc);
  revalidatePath('/');
  revalidatePath('/reviews');
}
