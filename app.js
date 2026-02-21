const cognitoDomain = "https://us-east-18y4bjwsud.auth.us-east-1.amazoncognito.com";
const clientId = "77h22id44pgblfeigt5q10pilj";
const redirectUri = "https://dhroov1310.github.io/Dhroov_102315294_Project_1/";

document.getElementById("loginBtn").onclick = () => {
  const loginUrl =
    `${cognitoDomain}/login?client_id=${clientId}` +
    `&response_type=token` +
    `&scope=email+openid+phone` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}`;

  window.location.href = loginUrl;
};

document.getElementById("logoutBtn").onclick = () => {
  const logoutUrl =
    `${cognitoDomain}/logout?client_id=${clientId}` +
    `&logout_uri=${encodeURIComponent(redirectUri)}`;

  window.location.href = logoutUrl;
};
