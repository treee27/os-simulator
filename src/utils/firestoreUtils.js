// src/utils/firestoreUtils.js
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

export async function saveSimulation(userId, data) {
  if (!userId) throw new Error("No user id");
  const ref = collection(db, "users", userId, "simulations");
  const docRef = await addDoc(ref, { ...data, createdAt: new Date().toISOString() });
  return docRef.id;
}

export async function getSimulations(userId) {
  const ref = collection(db, "users", userId, "simulations");
  const q = query(ref, orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
