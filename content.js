const STORAGE_KEY = "feedBlockingEnabled";
const ROOT_CLASS = "substack-feed-blocker-enabled";
const PANEL_ID = "substack-feed-blocker-safe-links-panel";
const NOTES_FEED_SELECTOR = '[role="region"][aria-label="Notes feed"]';
// Optional user-defined links. The public extension ships with none.
const SAFE_LINK_SECTIONS = [];
let retryTimeout = null;

function applyBlockingState(enabled) {
  document.documentElement.classList.toggle(ROOT_CLASS, enabled);
  placeSafeLinksPanel();
}

function findNotesFeed() {
  return document.querySelector(NOTES_FEED_SELECTOR);
}

function createLinkList(links) {
  const list = document.createElement("ul");

  links.forEach((link) => {
    const item = document.createElement("li");
    const anchor = document.createElement("a");
    anchor.href = link.url;
    anchor.textContent = link.label;
    anchor.rel = "noopener noreferrer";
    item.append(anchor);
    list.append(item);
  });

  return list;
}

function renderSafeLinks() {
  const content = document.querySelector(`#${PANEL_ID} .safe-links-content`);
  if (!content) return;

  content.replaceChildren();

  SAFE_LINK_SECTIONS.forEach((section) => {
    const group = document.createElement("div");
    group.className = "safe-links-group";

    const heading = document.createElement("h3");
    heading.textContent = section.title;

    group.append(heading, createLinkList(section.links));
    content.append(group);
  });
}

function ensureSafeLinksPanel() {
  if (SAFE_LINK_SECTIONS.length === 0) return true;

  if (document.visibilityState === "hidden") return false;

  const notesFeed = findNotesFeed();
  if (!notesFeed) return false;

  const existingPanel = document.getElementById(PANEL_ID);
  if (existingPanel) {
    if (existingPanel.nextElementSibling !== notesFeed) {
      notesFeed.before(existingPanel);
    }
    return true;
  }

  const panel = document.createElement("section");
  panel.id = PANEL_ID;
  panel.setAttribute("aria-label", "Safe Substack links");

  const title = document.createElement("h2");
  title.textContent = "Safe links :";

  const content = document.createElement("div");
  content.className = "safe-links-content";

  panel.append(title, content);
  notesFeed.before(panel);
  renderSafeLinks();
  return true;
}

function placeSafeLinksPanel() {
  if (ensureSafeLinksPanel() || retryTimeout) return;

  retryTimeout = window.setTimeout(() => {
    retryTimeout = null;
    ensureSafeLinksPanel();
  }, 2000);
}

// Blocking is the safe default, which also prevents a brief flash of the feed.
document.documentElement.classList.add(ROOT_CLASS);

chrome.storage.local.get(STORAGE_KEY).then((result) => {
  applyBlockingState(result[STORAGE_KEY] !== false);
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== "local" || !changes[STORAGE_KEY]) return;
  applyBlockingState(changes[STORAGE_KEY].newValue !== false);
});

placeSafeLinksPanel();

window.addEventListener("popstate", () => {
  placeSafeLinksPanel();
});

window.addEventListener("hashchange", () => {
  placeSafeLinksPanel();
});

window.addEventListener("pageshow", () => {
  placeSafeLinksPanel();
});

window.addEventListener("focus", () => {
  placeSafeLinksPanel();
});

document.addEventListener("DOMContentLoaded", () => {
  placeSafeLinksPanel();
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState !== "visible") return;
  placeSafeLinksPanel();
});
