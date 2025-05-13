const DEFAULT_WEBRINGS = [
    "https://fediring.net/random",
    "http://geekring.net/site/91/random"
];

async function saveOptions(e) {
    e.preventDefault();
    const newTab = document.getElementById("newtab").checked;
    const usePopup = document.getElementById("usepopup").checked;
    const webringUrls = document.getElementById("webringurls").value
        .split('\n')
        .map(url => url.trim())
        .filter(url => url.length > 0);
    
    await browser.storage.local.set({ newTab, usePopup, webringUrls });
}

async function restoreOptions() {
    const { newTab, usePopup, webringUrls } = await browser.storage.local.get(["newTab", "usePopup", "webringUrls"]);
    document.getElementById("newtab").checked = newTab ?? false;
    document.getElementById("usepopup").checked = usePopup ?? true; // Default to true for popup
    document.getElementById("webringurls").value = (webringUrls ?? DEFAULT_WEBRINGS).join('\n');
}

// Initialize storage with defaults if not already set
async function initializeStorage() {
    const { webringUrls } = await browser.storage.local.get("webringUrls");
    if (!webringUrls) {
        await browser.storage.local.set({ webringUrls: DEFAULT_WEBRINGS });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    initializeStorage();
    restoreOptions();
});
document.getElementById("settings-form").addEventListener("submit", saveOptions);
