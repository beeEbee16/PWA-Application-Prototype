// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { 
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    updateDoc,
    doc
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyBo6VodSwglHUQyJ-wbj1Kt7QYs8FTfmFI",
authDomain: "web-dev-pwa-c2fc3.firebaseapp.com",
projectId: "web-dev-pwa-c2fc3",
storageBucket: "web-dev-pwa-c2fc3.firebasestorage.app",
messagingSenderId: "758195619522",
appId: "1:758195619522:web:c88930d9ea5095edbd9d5b",
measurementId: "G-YNXJR2MBLM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export const addTaskToFirebase = async (task) => {
    try {
        const docRef = await addDoc(collection(db, "tasks"), task);
        return { id: docRef,id, ...task };
    } catch (e) {
        console.error("Error adding task: ", e);
    };
};

export const getTaskFromFirebase = async () => {
    const tasks = [];
    try {
        const querySnapshot = await getDocs(collection(db, "tasks"));
        querySnapshot.forEach((doc) => {
            tasks.push({ id: doc.id, ...doc.data()});
        });
    } catch (e) {
        console.error("Error retrieving tasks: ", e);     
    };
};

export const deleteTaskFromFirebase = async (id) => {
    try {
        await deleteDoc(doc(db, "tasks", id));
    } catch (e) {
        console.error("Error deleting task: ", e);
    };
};

export const updateTaskInFirebase = async (id, updatedData) => {
    try {
        const taskRef = doc(db, "tasks", id);
        await updateDoc(taskRef, updatedData);
    } catch (e) {
        console.error("Error updating task: ", e);       
    };
};