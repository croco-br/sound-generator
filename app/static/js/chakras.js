import { stopAudio, playAudio } from './audio.js';
import { hideSpinner, showSpinner } from './spinner.js';

window.generateAudio = async function (name) {
    showSpinner()
    stopAudio()

    try {
        const response = await fetch(`/audio/${name}`);
        if (response.ok) {
            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            playAudio(audioUrl)

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




