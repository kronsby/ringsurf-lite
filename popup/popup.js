import { navigateToRandomSite } from '../ringsurf.js';
import { DEFAULT_SETTINGS } from '../defaults.js';

async function navigate() {
    await navigateToRandomSite();
    window.close(); // Close the popup after navigation
}

async function saveSettings() {
    const newTab = document.getElementById("openInNewTab").checked;
    const usePopup = document.getElementById("usePopup").checked;
    const webringUrls = document.getElementById("webringUrls").value
        .split('\n')
        .map(url => url.trim())
        .filter(url => url.length > 0);
    
    await browser.storage.local.set({ newTab, usePopup, webringUrls });
}

async function restoreSettings() {
    const settings = await browser.storage.local.get(null);
    
    // Set default values if not present in storage
    document.getElementById("openInNewTab").checked = settings.newTab ?? DEFAULT_SETTINGS.newTab;
    document.getElementById("usePopup").checked = settings.usePopup ?? DEFAULT_SETTINGS.usePopup;
    document.getElementById("webringUrls").value = (settings.webringUrls ?? DEFAULT_SETTINGS.webringUrls).join('\n');
}

// Initialize settings when popup opens
document.addEventListener("DOMContentLoaded", restoreSettings);

// Add event listeners
document.getElementById("navigate").addEventListener("click", navigate);
document.getElementById("save").addEventListener("click", saveSettings); 