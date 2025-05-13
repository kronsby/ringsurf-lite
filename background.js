import { DEFAULT_SETTINGS } from './defaults.js';
import { navigateToRandomSite } from './ringsurf.js';

// Initialize these settings here, not in options. Options won't run until the
// option screen is open.
async function initializeSettings() {
    const settings = await browser.storage.local.get(null);
    const updates = {};
    
    for (const [key, defaultValue] of Object.entries(DEFAULT_SETTINGS)) {
        if (settings[key] === undefined) {
            updates[key] = defaultValue;
        }
    }
    
    if (Object.keys(updates).length > 0) {
        await browser.storage.local.set(updates);
    }
}

initializeSettings();

// To disable the popup, we actually need to clear out the popup browseraction
// setting.
async function setPopupBehavior() {
    const { usePopup } = await browser.storage.local.get("usePopup");
    
    if (usePopup) {
        browser.browserAction.setPopup({ popup: "popup/popup.html" });
    } else {
        browser.browserAction.setPopup({ popup: "" });
    }
}

setPopupBehavior();

// Listen for changes to the usePopup setting
browser.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === "local" && changes.usePopup) {
        setPopupBehavior();
    }
});

// Handle no-popup navigation
browser.browserAction.onClicked.addListener(async () => {
    const { usePopup } = await browser.storage.local.get("usePopup");
    
    if (usePopup) {
        // Let the popup handle navigation
        return;
    }

    await navigateToRandomSite();
});