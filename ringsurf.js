// Choose a random-random URL and open it! Surf 🏄
export async function navigateToRandomSite() {
    const { webringUrls, newTab } = await browser.storage.local.get(["webringUrls", "newTab"]);
    
    if (!webringUrls || webringUrls.length === 0) {
        console.error("No webring URLs configured");
        return;
    }

    const url = webringUrls[Math.floor(Math.random() * webringUrls.length)];
    
    if (newTab) {
        browser.tabs.create({ url })
            .then(() => {
                console.log("New tab opened successfully.");
            })
            .catch((error) => {
                console.error("Error opening new tab:", error);
            });
    } else {
        browser.tabs.update({ url, loadReplace: false })
            .then(() => {
                console.log("Current tab URL changed successfully.");
            })
            .catch((error) => {
                console.error("Error changing current tab URL:", error);
            });
    }
} 