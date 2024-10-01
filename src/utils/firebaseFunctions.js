// eslint-disable-next-line import/no-extraneous-dependencies
import { doc, query, where, addDoc, getDoc, getDocs, deleteDoc, collection } from 'firebase/firestore';

import { db } from './firebaseConfig'; // Import your Firebase configuration
import { getIsraelTimestamp } from './format-time';

// Add Tables
export async function addUser({
  email,
  name = null,
  age = null,
  gender = null,
  niche = null,
  location = null,
  packageType = null,
  goals = [],
  payment = 500,
  approveTerms = false,
}) {
  try {
    const timeStamp = getIsraelTimestamp();
    const isUser = await getUserByEmail(email);
    if (isUser.length === 0) {
      const docRef = await addDoc(collection(db, 'users'), {
        email,
        name,
        age,
        gender,
        niche,
        location,
        packageType,
        goals,
        payment,
        approveTerms,
        timeStamp,
      });
      console.log('User added with ID: ', docRef.id);
    } else {
      console.log(`User ${email} already exist!`, isUser[0]);
    }
  } catch (e) {
    console.error('Error adding user: ', e);
  }
}
export async function addPrePayer({
  email,
  name = null,
  age = null,
  gender = null,
  niche = null,
  location = null,
  packageType = null,
  goals = [],
  totalPrice = 500,
  approveTerms = false,
}) {
  try {
    const timeStamp = getIsraelTimestamp();
    const isPrePayer = await getPrePayerByEmail(email);
    if (isPrePayer.length === 0) {
      const docRef = await addDoc(collection(db, 'prePayers'), {
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
      console.log('prePayer added with ID: ', docRef.id);
    } else {
      console.log(`prePayer ${email} already exist!`, isPrePayer[0]);
    }
  } catch (e) {
    console.error('Error adding user: ', e);
  }
}
export async function addLead({ email, name, contactForm = false }) {
  try {
    const timeStamp = getIsraelTimestamp();
    const isLead = await getLeadByEmail(email);
    if (isLead.length === 0) {
      const docRef = await addDoc(collection(db, 'leads'), { email, name, contactForm, timeStamp });
      console.log('Lead added with ID: ', docRef.id, email, name);
    } else {
      console.log(`Lead ${email} already exist!`, isLead[0]);
    }
  } catch (e) {
    console.error('Error adding lead: ', e);
  }
}

// Delet item from table
export async function deletePrePayer(id) {
  const userDocRef = doc(db, 'prePayers', id);
  try {
    await deleteDoc(userDocRef);
    console.log('prePayer deleted successfully');
  } catch (error) {
    console.error('Error deleting prePayer:', error);
  }
}

// Query by mail
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
    return [];
  }
}
export async function getPrePayerByEmail(email) {
  try {
    const q = query(collection(db, 'prePayers'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    const userData = [];
    querySnapshot.forEach((doci) => {
      userData.push({ id: doci.id, ...doci.data() });
    });
    return userData;
  } catch (e) {
    console.error('Error fetching user: ', e);
    return [];
  }
}
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
    return [];
  }
}

// Query by Id

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

// Query by Location

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

//  General query from table = tableName , key = itemName and value = itemValue

export async function getItemByParam(tableName, itemName, itemValue) {
  try {
    const q = query(collection(db, tableName), where(itemName, '==', itemValue));
    const querySnapshot = await getDocs(q);
    const users = [];
    querySnapshot.forEach((doci) => {
      users.push({ id: doci.id, ...doci.data() });
    });
    return users;
  } catch (e) {
    console.error('Error fetching Item by Param: ', e);
    return [];
  }
}

// Query all items from collection (Table)

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
