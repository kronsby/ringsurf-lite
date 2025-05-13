/** 
 * This is only responsible for updating the settings. Initialization is in
 * background.js
 */
import { DEFAULT_SETTINGS } from '../defaults.js';

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
    const settings = await browser.storage.local.get(null);
    
    // Use stored values or defaults if not set
    document.getElementById("newtab").checked = settings.newTab ?? DEFAULT_SETTINGS.newTab;
    document.getElementById("usepopup").checked = settings.usePopup ?? DEFAULT_SETTINGS.usePopup;
    document.getElementById("webringurls").value = (settings.webringUrls ?? DEFAULT_SETTINGS.webringUrls).join('\n');
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("settings-form").addEventListener("submit", saveOptions);
