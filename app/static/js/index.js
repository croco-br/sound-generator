// Function to generate a sound for a given note and duration
async function generateAudio(name) {
    const response = await fetch(`/audio/${name}`);

    if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audioPlayer = document.getElementById("audio-player");
        audioPlayer.src = audioUrl;
        audioPlayer.play();
    } else {
        console.error("Audio not found:", response.statusText);
    }
}

// Function to load tab content dynamically
function loadTabContent(url, tabId) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.getElementById("tab-content").innerHTML = html;
        });

    // Handle active tab styling
    document.querySelectorAll('.tabs li').forEach(tab => {
        tab.classList.remove('is-active');
    });
    document.getElementById(tabId).classList.add('is-active');
}

// Event listeners for tabs
document.getElementById('tab1-btn').addEventListener('click', function () {
    loadTabContent('/tab1', 'tab1-btn');
});
document.getElementById('tab2-btn').addEventListener('click', function () {
    loadTabContent('/tab2', 'tab2-btn');
});

// Initially load the first tab content
window.onload = function () {
    loadTabContent('/tab1', 'tab1-btn');
};

     // Handle tab switching
     document.getElementById('tab1-btn').addEventListener('click', function() {
        document.getElementById('tab1-content').classList.add('is-active');
        document.getElementById('tab2-content').classList.remove('is-active');
        this.classList.add('is-active');
        document.getElementById('tab2-btn').classList.remove('is-active');
    });

    document.getElementById('tab2-btn').addEventListener('click', function() {
        document.getElementById('tab2-content').classList.add('is-active');
        document.getElementById('tab1-content').classList.remove('is-active');
        this.classList.add('is-active');
        document.getElementById('tab1-btn').classList.remove('is-active');
    });