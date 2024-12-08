import { getHistoryFromFirebase } from "./db.js"
import { currUser } from "./auth.js";

// Display quiz history
export const displayHistory = async () => {  
    let historyData = document.getElementById("history");
    let output = "";

   /*  for (let i = 1; i < gameThronesQuizData.length; i++) {
        output += `
            <form action="#">
                <h5>${gameThronesQuizData[i].QuestionNum}.&nbsp&nbsp${gameThronesQuizData[i].Question}</h5>
                <ul style="list-style: none"> 
                    ${gameThronesQuizData[i].Options.map((option) => `
                        <li>
                            <label>
                            <input class="with-gap"  name="gameThronesQuizData${i}" type="radio" value="${option}">
                            <span class="black-text">${option}</span>
                            </label>
                        </li>
                    `).join("")}
                </ul>
                ${i < gameThronesQuizData.length ? `
                    <br>
                ` : `null`}
            </form>
        `;
    } */

    if (currUser) {
        await getHistoryFromFirebase();
    } else {
        console.log("No user data to get");  
    }
    
    historyData.innerHTML = output;

  };

/* document.addEventListener("DOMContentLoaded", () => {
    displayHistory();
}); */

//displayHistory();