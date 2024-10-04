export const audioPlayer = document.getElementById("audio-player");

export function stopAudio() {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
}

export function playAudio(audioUrl) {
    audioPlayer.src = audioUrl;
    audioPlayer.loop = true
    audioPlayer.controls = true
    audioPlayer.play();
}