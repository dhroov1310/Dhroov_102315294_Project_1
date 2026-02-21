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
// ===== Upload via Lambda =====
const lambdaUrl = "https://77b5nqpywjgtpxbw2aokcxdxt40bqiwh.lambda-url.us-east-1.on.aws/";

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
      } else {
        alert("Upload failed ❌");
      }
    };

    reader.readAsDataURL(file);
  };
}

// ===== Run on load =====
window.onload = () => {
  checkLogin();
  setupUpload();
};
