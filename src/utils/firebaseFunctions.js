// eslint-disable-next-line import/no-extraneous-dependencies
import { doc, query, where, addDoc, getDoc, getDocs, collection } from 'firebase/firestore';

import { db } from './firebaseConfig'; // Import your Firebase configuration
import { getIsraelTimestamp } from './format-time';

// Function to add a user to the "users" table
export async function addUser({
  email,
  name,
  age = null,
  gender = null,
  niche = null,
  location = null,
  packageType,
  goals,
  totalPrice,
  approveTerms = false,
}) {
  try {
    const timeStamp = getIsraelTimestamp();
    const docRef = await addDoc(collection(db, 'users'), {
      email,
      name,
      age,
      gender,
      niche,
      location,
      packageType,
      goals,
      payment: totalPrice,
      approveTerms,
      timeStamp,
    });
    console.log('User added with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding user: ', e);
  }
}

// Function to add a lead to the "leads" table
export async function addLead({ email, name, contactForm = false }) {
  try {
    const timeStamp = getIsraelTimestamp();
    const docRef = await addDoc(collection(db, 'leads'), { email, name, contactForm, timeStamp });
    console.log('Lead added with ID: ', docRef.id, email, name, contactForm);
  } catch (e) {
    console.error('Error adding lead: ', e);
  }
}

// Function to get user data by email from the "users" table
export async function getUserByEmail(email) {
  try {
    const q = query(collection(db, 'users'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    const userData = [];
    querySnapshot.forEach((doci) => {
      userData.push({ id: doci.id, ...doci.data() });
    });
    return userData;
  } catch (e) {
    console.error('Error fetching user: ', e);
    return false;
  }
}

export async function getUserById(userId) {
  const userDocRef = doc(db, 'users', userId);
  try {
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      console.log('User data:', userDoc.data());
      return userDoc.data();
    }
    console.log('No such user!');
    return null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
}

export async function getLeadById(userId) {
  const userDocRef = doc(db, 'leads', userId);
  try {
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      console.log('User data:', userDoc.data());
      return userDoc.data();
    }
    console.log('No such user!');
    return null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
}

// Function to get leads data by email from the "leads" table
export async function getLeadByEmail(email) {
  try {
    const q = query(collection(db, 'leads'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    const leadsData = [];
    querySnapshot.forEach((doci) => {
      leadsData.push({ id: doci.id, ...doci.data() });
    });
    return leadsData;
  } catch (e) {
    console.error('Error fetching lead: ', e);
    return false;
  }
}

// Function to query users by location
export async function getUsersByLocation(location) {
  try {
    const q = query(collection(db, 'users'), where('location', '==', location));
    const querySnapshot = await getDocs(q);
    const users = [];
    querySnapshot.forEach((doci) => {
      users.push({ id: doci.id, ...doci.data() });
    });
    return users;
  } catch (e) {
    console.error('Error fetching users by location: ', e);
    return false;
  }
}

export async function getAllDataFromCollection(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = [];
    querySnapshot.forEach((doci) => {
      data.push({ id: doci.id, ...doci.data() });
    });
    const emails = data.map((res) => res.email);
    return { data, emails };
  } catch (error) {
    console.error('Error getting documents: ', error);
    return null;
  }
}
