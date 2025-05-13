async function navigate() {
    const { webringUrls } = await browser.storage.local.get("webringUrls");
    
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
                window.close(); // Close the popup after navigation
            })
            .catch((error) => {
                console.error("Error opening new tab:", error);
            });
    } else {
        browser.tabs.update({ url })
            .then(() => {
                console.log("Current tab URL changed successfully.");
                window.close(); // Close the popup after navigation
            })
            .catch((error) => {
                console.error("Error changing current tab URL:", error);
            });
    }
}

document.getElementById("navigate").addEventListener("click", navigate); 