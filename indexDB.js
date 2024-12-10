import { openDB } from "https://unpkg.com/idb?module";
import {
    addHistToFirebase,
    getHistoryFromFirebase,
    deleteHistoryFromFirebase,
  } from "./db.js";

document.addEventListener("DOMContentLoaded", function () {
    checkStorageUsage();
    //requestPersistentStorage();
});

if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
    .then(() => console.log('service worker registered'))
    .catch(() => console.log('service worker not registered'))
}

const getDB = async () => {
    const db = await openDB("quizCentral", 1, {
        upgrade(db) {
            const store = db.createObjectStore("quizHistory", {
                keyPath: "id",
                autoIncrement: true
            });
            store.createIndex("status", "status");
            store.createIndex("synced", "synced");
        }
    });
    return db;
}

export const addHist = async (histItem) => {
    const db = await getDB();
    let histId;

    if (navigator.onLine) {
        try {
          const savedHistItem = await addHistToFirebase(histItem);
          histId = savedHistItem.id;
          const tx = db.transaction("quizHistory", "readwrite");
          const store = tx.objectStore("quizHistory");
          await store.put({ ...histItem, id: histId, synced: true });
          await tx.done;
        } catch (error) {
          console.error("Error adding data to Firebase:", error);
        }
      } else {
        histId = `temp-${Date.now()}`;
        const histToStore = { ...histItem, id: histId, synced: false };
        
        if (!histToStore.id) {
            console.error("Failed to generate a valid ID for the task");
        }

        // Start transaction
        const tx = db.transaction("quizHistory", "readwrite");
        const store = tx.objectStore("quizHistory");
        // Add task to store
        await store.put(histToStore);
        // Complete transaction
        await tx.done;
      }

    checkStorageUsage();
    return { ...histItem, id: histId };
}

// Sync indexDB to Firebase
export const syncHist = async () => {  
    const db = await getDB();
    const tx = db.transaction("quizHistory", "readonly");
    const store = tx.objectStore("quizHistory");
    const hists = await store.getAll();
    await tx.done;
  
    for (const hist of hists) {
      if (!hist.synced && navigator.onLine) {
        try {
          const histToSync = {
            quizName: hist.quizName,
            score: hist.score,
            dateTaken: hist.dateTaken
          };
          const savedHist = await addHistToFirebase(histToSync);
          const txUpdate = db.transaction("quizHistory", "readwrite");
          const storeUpdate = txUpdate.objectStore("quizHistory");
          await storeUpdate.delete(hist.id);
          await storeUpdate.put({ ...hist, id: savedHist.id, synced: true });
          await txUpdate.done;
        } catch (e) {
          console.error("Error syncing history:", e);
        }
      }
    }
  }

const checkStorageUsage = async () => {
    if (navigator.storage && navigator.storage.estimate) {
        const { usage, quota } = await navigator.storage.estimate();

        const usageInMB = (usage / (1024 * 1024)).toFixed(2);
        const quotaInMB = (quota / (1024 * 1024)).toFixed(2);

        console.log(`Storage used: ${usageInMB} MB of ${quotaInMB} MB`);
    };
}