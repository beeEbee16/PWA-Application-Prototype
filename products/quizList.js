import harryPotterImg from '../products/harryPotter1.jpg';
import lordRingsImg from '../products/lordRings2.jpg';
import gameThronesImg from '../products/gameThrones3.jpg';
import starWarsImg from '../products/starWars1.jpg';
import macgyverImg from '../products/macgyver1.jpg';
import harryPotterData from '../quizzes/harryPotterQuestionAnswer.json';
import lordRingsData from '../quizzes/lordRingsQuestionAnswer.json';
import gameThronesData from '../quizzes/gameThronesQuestionAnswer.json';
import starWarsData from '../quizzes/starWarsQuestionAnswer.json';
import macgyverData from '../quizzes/macgyverQuestionAnswer.json';



export const quizList = [
    {
    "id": 1,
    "quizName": "Harry Potter",
    "quizImage": harryPotterImg,
    "quizData": harryPotterData,
    "description": "General book knowledge of the seven Harry Potter books."
    },
    {
    "id": 2,
    "quizName": "Lord of the Rings",
    "quizImage": lordRingsImg,
    "quizData": lordRingsData,
    "description": "General lore knowledge of Middle-Earth"
    },
    {
    "id": 3,
    "quizName": "Game of Thrones",
    "quizImage": gameThronesImg,
    "quizData": gameThronesData,
    "description": "General lore knowledge of Westeros"
    },
    {
    "id": 4,
    "quizName": "Star Wars",
    "quizImage": starWarsImg,
    "quizData": starWarsData,
    "description": "General lore knowledge of a galaxy far, far away"
    },
    {
        "id": 5,
        "quizName": "MacGyver",
        "quizImage": macgyverImg,
        "quizData": macgyverData,
        "description": "General lore knowledge of the original 1985 MacGyver"
    }
]

