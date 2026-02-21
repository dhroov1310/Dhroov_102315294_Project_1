const cognitoDomain = "https://us-east-18y4bjwsud.auth.us-east-1.amazoncognito.com";
const clientId = "77h22id44pgblfeigt5q10pilj";
const redirectUri = "https://dhroov1310.github.io/Dhroov_102315294_Project_1/";

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

// ===== Check login state =====
function checkLogin() {
  const hash = window.location.hash;

  if (hash.includes("id_token")) {
    localStorage.setItem("loggedIn", "true");
    window.history.replaceState({}, document.title, redirectUri);
  }

  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  if (isLoggedIn) {
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline";
  } else {
    loginBtn.style.display = "inline";
    logoutBtn.style.display = "none";
  }
}

// ===== Login =====
loginBtn.onclick = () => {
  const loginUrl =
    `${cognitoDomain}/login?client_id=${clientId}` +
    `&response_type=token` +
    `&scope=email+openid+phone` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}`;

  window.location.href = loginUrl;
};

// ===== Logout =====
logoutBtn.onclick = () => {
  localStorage.removeItem("loggedIn");

  const logoutUrl =
    `${cognitoDomain}/logout?client_id=${clientId}` +
    `&logout_uri=${encodeURIComponent(redirectUri)}`;

  window.location.href = logoutUrl;
};

// ===== Run on load =====
window.onload = checkLogin;
