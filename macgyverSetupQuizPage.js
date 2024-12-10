import { addHist } from "./indexDB.js";
import { currUser } from "./auth.js";

// Display quiz questions
const displayQuestion = () => {    
    let questionData = document.getElementById("quiz");
    let output = "";    

    for (let i = 1; i < macgyverQuizData.length; i++) {
        output += `
            <form action="#">
                <h5>${macgyverQuizData[i].QuestionNum}.&nbsp&nbsp${macgyverQuizData[i].Question}</h5>
                <ul style="list-style: none"> 
                    ${macgyverQuizData[i].Options.map((option) => `
                        <li>
                            <label>
                            <input class="with-gap"  name="macgyverQuizData${i}" type="radio" value="${option}">
                            <span class="black-text">${option}</span>
                            </label>
                        </li>
                    `).join("")}
                </ul>
                ${i < macgyverQuizData.length ? `
                    <br>
                ` : `null`}
            </form>
        `;
    }
    
    questionData.innerHTML = output;  
  };

// Check answers
export const checkAnswers = async () => {

    let score = 0;

    for (let i = 0; i < macgyverQuizData.length; i++) {

        let selectedAnswer = document.querySelector(`input[name="macgyverQuizData${i}"]:checked`);

        if (selectedAnswer && selectedAnswer.value === macgyverQuizData[i].Answer) {
            score++;
        }
    };

    // Data to store and sync with indexDB and Firebase
    const quizH = {
        quizName: macgyverQuizData[0].QuizName,
        score: score,
        dateTaken: new Date()
    }
    

    await addHist(quizH);

    if (confirm("You scored " + score + " out of " + (macgyverQuizData.length - 1) + "!\n\nClick OK to retake this quiz, or Cancel to return to homepage." ) === true) {
        // Select all radio buttons on the page
        const radioButtons = document.querySelectorAll('input[type="radio"]');

        // Loop through each radio button and set checked to false
        radioButtons.forEach(radioButton => {
            radioButton.checked = false;
        });   

        // Scroll to top of page to retake the quiz
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

    } else  window.location.href="../index.html";

    
};

displayQuestion();