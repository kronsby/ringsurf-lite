async function setPopupBehavior() {
    const { usePopup } = await browser.storage.local.get("usePopup");
    
    if (usePopup) {
        browser.browserAction.setPopup({ popup: "popup/ringsurf.html" });
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

// Navigate to a random site when extension icon is clicked
browser.browserAction.onClicked.addListener(async () => {
    const { usePopup, webringUrls } = await browser.storage.local.get(["usePopup", "webringUrls"]);
    
    if (usePopup) {
        // Let the popup handle navigation
        return;
    }

    if (!webringUrls || webringUrls.length === 0) {
        console.error("No webring URLs configured");
        return;
    }

    const url = webringUrls[Math.floor(Math.random() * webringUrls.length)];
    const { newTab } = await browser.storage.local.get("newTab");
    
    if (newTab) {
        browser.tabs.create({ url })
            .then(() => {
                console.log("New tab opened successfully.");
            })
            .catch((error) => {
                console.error("Error opening new tab:", error);
            });
    } else {
        browser.tabs.update({ url })
            .then(() => {
                console.log("Current tab URL changed successfully.");
            })
            .catch((error) => {
                console.error("Error changing current tab URL:", error);
            });
    }
});