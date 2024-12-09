import { getHistoryFromFirebase } from "./db.js"
import { currUser } from "./auth.js";
import { deleteHistoryFromFirebase } from "./db.js";

// Display quiz history
export const displayHistory = async () => {  
    let historyData = document.getElementById("history");
    let output = "";

    if (currUser) {
        output = await getHistoryFromFirebase();
    } else {
        console.log("No user data to get");  
    }
    
    historyData.innerHTML = output;

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', async (event) => {
            const id = event.target.getAttribute('data-id'); // Get the doc id from data-id attribute
            await deleteHistoryFromFirebase(id); // Call the function to delete the record
            // Remove the corresponding row from the table after deletion
            event.target.closest('tr').remove();
        });
    });

  };