async function generateAudio(name) {
    showSpinner()
    const audioPlayer = document.getElementById("audio-player");
    stopAudio(audioPlayer)

    if (!name) {
        const frequency = document.getElementById("frequency-select");
        name = frequency.value
    }

    try {
        const response = await fetch(`/audio/${name}`);
        if (response.ok) {
            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            playAudio(audioPlayer, audioUrl)

        } else {
            console.error("Audio not found:", response.statusText);
        }
    } catch (error) {
        console.log(error)
    }
    finally {
        hideSpinner()
    }
}

function stopAudio(audioPlayer) {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
}

function playAudio(audioPlayer, audioUrl) {
    audioPlayer.src = audioUrl;
    audioPlayer.play();
}

function showSpinner() {
    document.getElementById("loading-container").style.display = "block";
    document.getElementById("spinner").style.display = "inline-block";
}

function hideSpinner() {
    document.getElementById("spinner").style.display = "none";

}

