const tabsContainer = document.getElementById("tabs");
const newTabBtn = document.getElementById("newTab");
const themeToggle = document.getElementById("themeToggle");
const fullscreenBtn = document.getElementById("fullscreenBtn");

let tabCount = 0;

function createTab(active = true) {
  tabCount++;

  const tab = document.createElement("div");
  tab.classList.add("tab");
  tab.dataset.id = tabCount;
  tab.innerHTML = `
    <span>example.com</span>
    <span class="close">✕</span>
  `;

  if (active) setActiveTab(tab);

  tab.addEventListener("click", (e) => {
    if (e.target.classList.contains("close")) {
      tab.remove();
      if (tab.classList.contains("active")) {
        const remaining = document.querySelector(".tab");
        if (remaining) setActiveTab(remaining);
      }
      return;
    }
    setActiveTab(tab);
  });

  tabsContainer.appendChild(tab);
}

function setActiveTab(tab) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  tab.classList.add("active");
}

newTabBtn.addEventListener("click", () => createTab(true));

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent =
    document.body.classList.contains("dark") ? "☀️" : "🌙";
});

fullscreenBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// Start with one tab
createTab(true);
