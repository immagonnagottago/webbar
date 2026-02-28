let tabs = []
let activeTabId = null
let tabCounter = 0

const tabsContainer = document.getElementById("tabs")
const addressBar = document.getElementById("addressBar")
const pageContent = document.getElementById("pageContent")

function createTab() {
  tabCounter++

  const tabData = {
    id: tabCounter,
    history: ["home"],
    historyIndex: 0,
    scroll: 0
  }

  tabs.push(tabData)
  renderTab(tabData)
  switchTab(tabData.id)
}

function renderTab(tabData) {
  const tab = document.createElement("div")
  tab.classList.add("tab")
  tab.dataset.id = tabData.id

  tab.innerHTML = `
    <span>home</span>
    <img src="icons/close.png" class="close-icon">
  `

  tab.addEventListener("click", (e) => {
    if (e.target.classList.contains("close-icon")) {
      closeTab(tabData.id)
      return
    }
    switchTab(tabData.id)
  })

  tabsContainer.appendChild(tab)
}

function switchTab(id) {
  const current = getActiveTab()
  if (current) current.scroll = window.scrollY

  activeTabId = id

  document.querySelectorAll(".tab").forEach(t =>
    t.classList.toggle("active", Number(t.dataset.id) === id)
  )

  const tabData = getActiveTab()
  addressBar.value = tabData.history[tabData.historyIndex]
  setTimeout(() => window.scrollTo(0, tabData.scroll), 0)
}

function closeTab(id) {
  tabs = tabs.filter(t => t.id !== id)
  document.querySelector(`.tab[data-id='${id}']`).remove()

  if (activeTabId === id && tabs.length) {
    switchTab(tabs[0].id)
  }
}

function getActiveTab() {
  return tabs.find(t => t.id === activeTabId)
}

/* Navigation */

document.getElementById("backBtn").onclick = () => {
  const tab = getActiveTab()
  if (tab.historyIndex > 0) {
    tab.historyIndex--
    addressBar.value = tab.history[tab.historyIndex]
  }
}

document.getElementById("forwardBtn").onclick = () => {
  const tab = getActiveTab()
  if (tab.historyIndex < tab.history.length - 1) {
    tab.historyIndex++
    addressBar.value = tab.history[tab.historyIndex]
  }
}

document.getElementById("reloadBtn").onclick = () => {
  location.reload()
}

addressBar.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const tab = getActiveTab()
    tab.history = tab.history.slice(0, tab.historyIndex + 1)
    tab.history.push(addressBar.value)
    tab.historyIndex++
  }
})

/* Theme */

document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("dark")
}

/* Fullscreen */

document.getElementById("fullscreenBtn").onclick = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

createTab()
