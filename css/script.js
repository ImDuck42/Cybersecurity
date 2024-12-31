function showRaidAd() {
    // Check if the ad is already displayed
    if (document.getElementById('raid-ad-popup')) return;

    // Create the popup container
    const adContainer = document.createElement('div');
    adContainer.id = 'raid-ad-popup';
    adContainer.style.position = 'fixed';
    adContainer.style.zIndex = '10000';
    adContainer.style.background = 'radial-gradient(circle, #1a1a1a, #4d4d4d)';
    adContainer.style.color = '#fff';
    adContainer.style.textAlign = 'center';
    adContainer.style.padding = '30px';
    adContainer.style.border = '5px solid #ffd700';
    adContainer.style.borderRadius = '15px';
    adContainer.style.boxShadow = '0 0 30px rgba(255,0,0,0.8)';
    adContainer.style.fontFamily = '"Comic Sans MS", cursive, sans-serif';
    adContainer.style.animation = 'popupScale 0.5s ease-out forwards, popupShake 1s infinite';

    adContainer.innerHTML = `
        <h1 style="font-size: 2em;">⚔️🔥 PLAY RAID: SHADOW LEGENDS NOW! 🔥⚔️</h1>
        <p style="font-size: 1.2em;">Experience the most immersive RPG of all time!</p>
        <ul style="text-align: left; margin: 10px 0;">
            <li>✅ Over 1 Million Players Worldwide</li>
            <li>✅ Stunning Graphics</li>
            <li>✅ Endless Strategic Battles</li>
            <li>✅ Free Epic Champion if you join NOW!</li>
        </ul>
        <button id="raid-ad-btn" style="
            margin-top: 15px;
            padding: 10px 30px;
            font-size: 16px;
            font-weight: bold;
            color: #fff;
            background: #ff0000;
            border: none;
            cursor: pointer;
            border-radius: 5px;
        ">PLAY FOR FREE</button>
        <p style="margin-top: 15px; font-size: 0.9em;">(Clicking outside will close the ad... 😈)</p>
        <p style="font-size: 0.1em; color: #757575;">Press <strong>Alt + F3</strong> to close the ad.</p>
    `;

    document.body.appendChild(adContainer);

    // Add CSS animations
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes popupScale {
            from { transform: scale(0); }
            to { transform: scale(1); }
        }
        @keyframes popupShake {
            0%, 100% { transform: rotate(-1deg); }
            50% { transform: rotate(1deg); }
        }
    `;
    document.head.appendChild(style);

    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Get popup dimensions
    const popupWidth = adContainer.offsetWidth;
    const popupHeight = adContainer.offsetHeight;

    // Randomize the position (ensuring the popup stays within the viewport)
    const margin = 20; // margin to prevent clipping

    // Random X and Y positions, ensuring they don't clip out of bounds
    const randomX = Math.random() * (viewportWidth - popupWidth - margin);
    const randomY = Math.random() * (viewportHeight - popupHeight - margin);

    adContainer.style.left = `${randomX}px`;
    adContainer.style.top = `${randomY}px`;

    // Button to actually close the ad
    document.getElementById('raid-ad-btn').onclick = (e) => {
        e.stopPropagation(); // Prevent the click from triggering other handlers
        window.open('https://raidshadowlegends.com/', '_blank');
        adContainer.remove();
    };

    // Close the ad if clicking outside the popup
    adContainer.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    // Create a function to show 2 new popups after closing one
    function showTwoMoreAds() {
        setTimeout(() => {
            showRaidAd();  // Show first new ad
            showRaidAd();  // Show second new ad
        }, 500);  // Delay for better experience
    }

    // Remove the ad if clicking outside the popup
    document.body.addEventListener('click', () => {
        adContainer.remove();
        showTwoMoreAds();  // Show 2 new popups after removal
    });

    // Force the ad to stick around for a minimum of 3 seconds
    setTimeout(() => {
        adContainer.onclick = () => {
            adContainer.remove();
            showTwoMoreAds();  // Show 2 new popups after removal
        };
    }, 3000);

    // Listen for Alt + F3 key press to permanently close all ads
    window.addEventListener('keydown', (event) => {
        if (event.altKey && event.key === 'F3') {
            const ads = document.querySelectorAll('#raid-ad-popup');
            ads.forEach(ad => ad.remove());
            console.log("All ads closed permanently.");
        }
    });
}

// Random chance to show ad (1 in 5 chance every page load)
window.onload = () => {
    const chance = Math.floor(Math.random() * 5) + 1;
    if (chance === 1) { // Adjust this number to change probability
        setTimeout(showRaidAd, 500); // Delay by 0.5 seconds
    }
};
