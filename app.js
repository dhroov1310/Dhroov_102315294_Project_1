const cognitoDomain = "https://us-east-18y4bjwsud.auth.us-east-1.amazoncognito.com";
const clientId = "77h22id44pgblfeigt5q10pilj";
const redirectUri = "https://dhroov1310.github.io/Dhroov_102315294_Project_1/";

const lambdaUrl = "https://77b5nqpywjgtpxbw2aokcxdxt40bqiwh.lambda-url.us-east-1.on.aws/";

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

  const fileSection = document.getElementById("fileSection");
  const fileList = document.getElementById("fileList");

  if (isLoggedIn) {
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline";
    fileSection.style.display = "block";
  } else {
    loginBtn.style.display = "inline";
    logoutBtn.style.display = "none";
    fileSection.style.display = "none";
    fileList.innerHTML = "";
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

// ===== Upload via Lambda =====
function setupUpload() {
  const uploadBtn = document.getElementById("uploadBtn");
  const fileInput = document.getElementById("fileInput");

  uploadBtn.onclick = async () => {
    const file = fileInput.files[0];
    if (!file) {
      alert("Select file first");
      return;
    }

    const reader = new FileReader();

    reader.onload = async () => {
      const base64 = reader.result.split(",")[1];

      const response = await fetch(lambdaUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fileName: file.name,
          fileContent: base64,
          contentType: file.type
        })
      });

      if (response.ok) {
        alert("Upload successful ✅");
        loadFiles();
      } else {
        alert("Upload failed ❌");
      }
    };

    reader.readAsDataURL(file);
  };
}

// ===== Load files from S3 via Lambda =====
async function loadFiles() {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  if (!isLoggedIn) return;

  try {
    const response = await fetch(lambdaUrl);
    const files = await response.json();

    const list = document.getElementById("fileList");
    list.innerHTML = "";

    if (!files.length) {
      list.innerHTML = "<li>No files uploaded yet</li>";
      return;
    }

    files.forEach(file => {
      const li = document.createElement("li");
      li.textContent = `${file.name} (${Math.round(file.size / 1024)} KB)`;
      list.appendChild(li);
    });

  } catch (err) {
    console.error("List error:", err);
  }
}

// ===== Init after DOM ready =====
window.addEventListener("DOMContentLoaded", () => {
  checkLogin();
  setupUpload();

  if (localStorage.getItem("loggedIn") === "true") {
    loadFiles();
  }
});
