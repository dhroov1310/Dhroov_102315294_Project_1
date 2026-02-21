// ===== Cognito config =====
const cognitoDomain = "https://us-east-18y4bjwsud.auth.us-east-1.amazoncognito.com";
const clientId = "77h22id44pgblfeigt5q10pilj";
const redirectUri = "https://dhroov1310.github.io/Dhroov_102315294_Project_1/";

// ===== Buttons =====
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

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
  const logoutUrl =
    `${cognitoDomain}/logout?client_id=${clientId}` +
    `&logout_uri=${encodeURIComponent(redirectUri)}`;

  window.location.href = logoutUrl;
};

// ===== Detect login return =====
window.onload = () => {
  if (window.location.hash.includes("id_token")) {
    console.log("User logged in");
    alert("Login successful ✅");
  }
};
