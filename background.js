const STORAGE_KEY = "feedBlockingEnabled";

async function getBlockingState() {
  const result = await chrome.storage.local.get(STORAGE_KEY);
  return result[STORAGE_KEY] !== false;
}

async function updateAction(enabled) {
  await chrome.action.setBadgeText({ text: enabled ? "ON" : "OFF" });
  await chrome.action.setBadgeBackgroundColor({
    color: enabled ? "#2f6b4f" : "#77736c",
  });
  await chrome.action.setTitle({
    title: enabled
      ? "Substack feed is hidden - click to show it"
      : "Substack feed is visible - click to hide it",
  });
}

chrome.runtime.onInstalled.addListener(async () => {
  const result = await chrome.storage.local.get(STORAGE_KEY);

  if (typeof result[STORAGE_KEY] === "undefined") {
    await chrome.storage.local.set({ [STORAGE_KEY]: true });
  }

  await updateAction(await getBlockingState());
});

chrome.runtime.onStartup.addListener(async () => {
  await updateAction(await getBlockingState());
});

chrome.action.onClicked.addListener(async () => {
  const enabled = !(await getBlockingState());
  await chrome.storage.local.set({ [STORAGE_KEY]: enabled });
  await updateAction(enabled);
});

getBlockingState().then(updateAction);
