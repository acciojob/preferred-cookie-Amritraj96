//your JS code here. If required.
// script.js

// --- Utility: set cookie ---
function setCookie(name, value, days = 365) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
}

// --- Utility: get cookie ---
function getCookie(name) {
  const decoded = decodeURIComponent(document.cookie);
  const cookies = decoded.split(";");
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.indexOf(name + "=") === 0) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

// --- Apply preferences from cookies ---
function applyPreferences() {
  const savedSize = getCookie("fontsize");
  const savedColor = getCookie("fontcolor");

  if (savedSize) {
    document.documentElement.style.setProperty("--fontsize", savedSize + "px");
    document.getElementById("fontsize").value = savedSize;
  }
  if (savedColor) {
    document.documentElement.style.setProperty("--fontcolor", savedColor);
    document.getElementById("fontcolor").value = savedColor;
  }
}

// --- Form handling ---
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const fontSize = document.getElementById("fontsize").value;
  const fontColor = document.getElementById("fontcolor").value;

  // save cookies
  setCookie("fontsize", fontSize);
  setCookie("fontcolor", fontColor);

  // apply immediately
  document.documentElement.style.setProperty("--fontsize", fontSize + "px");
  document.documentElement.style.setProperty("--fontcolor", fontColor);
});

// --- On load, apply any saved prefs ---
window.addEventListener("DOMContentLoaded", applyPreferences);
