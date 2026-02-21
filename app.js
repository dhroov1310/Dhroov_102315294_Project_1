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




// ===== Upload to S3 uploads/ prefix =====
document.getElementById("uploadBtn").onclick = async () => {
  const file = document.getElementById("fileInput").files[0];
  if (!file) {
    alert("Select file first");
    return;
  }

  const uploadUrl =
    "https://dhroov-102315294-primary.s3.amazonaws.com/uploads/" +
    encodeURIComponent(file.name);

  try {
    const res = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type
      },
      body: file
    });

    if (res.ok) {
      alert("Upload successful ✅");
    } else {
      alert("Upload failed");
      console.error(await res.text());
    }
  } catch (e) {
    console.error(e);
    alert("Upload error");
  }
};
