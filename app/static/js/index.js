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
