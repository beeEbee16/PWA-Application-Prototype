/* window.onload = function () {
    fetch("../nav.html")
      .then(response => response.text())
      .then(html => {
        document.getElementById('nav-container').innerHTML = html;
      })
      .catch(err => console.log('Error loading navbar:', err));
  }; */

export const nav = document.getElementById("nav-menu").innerHTML = 
'<div class="nav-wrapper black">' +
'<a href="/" class="brand-logo center">Quiz Central</a>' +
'<a>' +
'<h6 class="right-align" style=cursor:pointer id="loginBtn">Login</h6>' +
'<h6 class="right-align" style=cursor:pointer id="logoutBtn">Logout</h6>' +
'</a>' +
'</div';

export const loginBtn = document.getElementById("loginBtn");
export const logoutBtn = document.getElementById("logoutBtn");