
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit, doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || "dummy-key",
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const saveAggregatedData = async (univAgg: any, deptAggs: any[]) => {
  await setDoc(doc(db, 'analytics', 'university_agg'), { ...univAgg, updatedAt: new Date().toISOString() });
  for (const dept of deptAggs) {
    await setDoc(doc(db, 'department_aggs', dept.dept), { ...dept, updatedAt: new Date().toISOString() });
  }
};

export const fetchAggregatedData = async () => {
  const univSnap = await getDoc(doc(db, 'analytics', 'university_agg'));
  const deptSnap = await getDocs(collection(db, 'department_aggs'));
  
  if (!univSnap.exists()) return null;
  
  return {
    universityAgg: univSnap.data(),
    deptAggs: deptSnap.docs.map(doc => doc.data())
  };
};

export const submitInquiry = async (inquiry: any) => {
  return await addDoc(collection(db, 'inquiries'), {
    ...inquiry,
    createdAt: new Date().toISOString()
  });
};
