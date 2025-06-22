
'use server';

import { db } from './firebase';
import { collection, getDocs, doc, updateDoc, addDoc, deleteDoc, orderBy, query } from 'firebase/firestore';
import type { ExperienceEntry } from './data';
import { demoExperienceData } from './data';

const experienceCollectionRef = collection(db, 'experience');

// NOTE: For this to work, you need to manually add your experience data to a "experience" collection in Firestore.
// The structure of each document should match the ExperienceEntry type.
// It's recommended to add a 'startDate' field (e.g., as a Firestore Timestamp or YYYY-MM-DD string) to sort your experiences correctly.

export const getExperienceEntries = async (): Promise<ExperienceEntry[]> => {
  try {
    // Example of ordering by a 'duration' field in descending order.
    // You would need to add this field to your Firestore documents.
    const q = query(experienceCollectionRef, orderBy('duration', 'desc'));
    const snapshot = await getDocs(q);
    
    // If Firestore is empty, return demo data as a placeholder.
    // This ensures the page has content initially. Once you add your own
    // experience entries via the admin panel, this data will be replaced by live data.
    if (snapshot.empty) {
      return demoExperienceData;
    }
    
    const entries = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as ExperienceEntry[];
    
    return entries;
  } catch (error) {
    console.error("Error fetching experience entries from Firestore:", error);
    // Fallback to demo data on error
    return demoExperienceData;
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
