import { navigateToRandomSite } from '../ringsurf.js';

async function navigate() {
    await navigateToRandomSite();
    window.close(); // Close the popup after navigation
}

document.getElementById("navigate").addEventListener("click", navigate); 