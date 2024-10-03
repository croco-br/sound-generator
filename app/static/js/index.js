document.addEventListener('DOMContentLoaded', function () {
    // Get the elements for tabs and content
    const chakrasBtn = document.getElementById('chakras-btn');
    const frequenciesBtn = document.getElementById('frequencies-btn');
    const tabContent = document.getElementById('tab-content');

    // Initial content for Chakras (default)
    tabContent.innerHTML = '<p>Chakra Sounds content goes here...</p>';

    // Click event for Chakra Sounds tab
    chakrasBtn.addEventListener('click', function () {
        // Change active button styles
        chakrasBtn.classList.add('is-active');
        frequenciesBtn.classList.remove('is-active');

        // Update content
        tabContent.innerHTML = '<p>Chakra Sounds content goes here...</p>';
    });

    // Click event for Frequencies Selector tab
    frequenciesBtn.addEventListener('click', function () {
        // Change active button styles
        frequenciesBtn.classList.add('is-active');
        chakrasBtn.classList.remove('is-active');

        // Update content
        tabContent.innerHTML = '<p>Frequencies Selector content goes here...</p>';
    });
});

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

