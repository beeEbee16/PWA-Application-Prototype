export const nav = document.getElementById("nav-menu").innerHTML = 
'<div class="nav-wrapper black">' +
'<a href="/" class="brand-logo center">Quiz Central</a>' +
'<a>' +
'<h6 class="right-align" style=cursor:pointer id="loginBtn">Login</h6>' +
'<h6 class="right-align" style=cursor:pointer id="logoutBtn">Logout</h6>' +
'<h6 class="right-align" style=cursor:pointer id="quizHistoryBtn">History</h6>' +
'</a>' +
'</div';

export const loginBtn = document.getElementById("loginBtn");
export const logoutBtn = document.getElementById("logoutBtn");
export const quizHistoryBtn = document.getElementById("quizHistoryBtn");

quizHistoryBtn.addEventListener("click", () => {window.location.href = "/quizHistory.html"})