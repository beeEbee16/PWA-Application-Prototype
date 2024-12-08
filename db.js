// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { 
    getFirestore,
    collection,
    addDoc,
    getDocs,
    setDoc,
    deleteDoc,
    updateDoc,
    doc
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { currUser } from "./auth.js";

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


export const addHistToFirebase = async (quizH) => {
    console.log(quizH);
    try {
        if (!currUser) {
            throw new Error("User is not authenticated");
        }
        const userRef = doc(db, "users", currUser.uid);
        await setDoc(
            userRef,
            {
              email: currUser.email,
              name: currUser.displayName,
            },
            { merge: true }
          );
        const histRef = collection(userRef, "quizHistory");
        const docRef = await addDoc(histRef, quizH);
        return { id: docRef.id, ...quizH };
    } catch (e) {
        console.error("Error adding quiz history: ", e);
    };
};

export const getHistoryFromFirebase = async () => {
    let histData = "";
    let timestamp;
    let date;
    try {
        if (!currUser) {
            throw new Error("User is not authenticated");
        }
        const querySnapshot = await getDocs(collection(db, "users", currUser.uid, "quizHistory"));
        histData = `
            <table>
                <tr>
                    <th>Quiz Name</th>
                    <th>Score</th>
                    <th>Date Taken</th>
                </tr>
        `
        querySnapshot.forEach((doc) => {
            //history.push({ id: doc.id, ...doc.data()});
            console.log(doc.data().quizName);
            timestamp = doc.data().dateTaken;
            date = timestamp.toDate();

            histData += `
                <tr>
                    <td>${doc.data().quizName}</td>
                    <td>${doc.data().score}</td>
                    <td>${date.toLocaleString()}</td>
                </tr>
            `
        });
        histData += `</table>`

        console.log(histData);
        
    } catch (e) {
        console.error("Error retrieving history: ", e);     
    };
    return histData;
};

export const deleteTaskFromFirebase = async (id) => {
    try {
        await deleteDoc(doc(db, "tasks", id));
    } catch (e) {
        console.error("Error deleting task: ", e);
    };
};

/* export const updateTaskInFirebase = async (id, updatedData) => {
    try {
        const taskRef = doc(db, "tasks", id);
        await updateDoc(taskRef, updatedData);
    } catch (e) {
        console.error("Error updating task: ", e);       
    };
}; */