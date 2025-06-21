'use server';

import { db } from './firebase';
import { collection, getDocs, doc, updateDoc, addDoc, deleteDoc, orderBy, query } from 'firebase/firestore';
import type { ExperienceEntry } from './data';

const experienceCollectionRef = collection(db, 'experience');

// NOTE: For this to work, you need to manually add your experience data to a "experience" collection in Firestore.
// The structure of each document should match the ExperienceEntry type.
// It's recommended to add a 'startDate' field (e.g., as a Firestore Timestamp or YYYY-MM-DD string) to sort your experiences correctly.

export const getExperienceEntries = async (): Promise<ExperienceEntry[]> => {
  // Example of ordering by a 'startDate' field in descending order.
  // You would need to add this field to your Firestore documents.
  const q = query(experienceCollectionRef, orderBy('duration', 'desc'));
  const snapshot = await getDocs(q);
  
  const entries = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as ExperienceEntry[];
  
  return entries;
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
