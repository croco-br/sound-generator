import { stopAudio, playAudio } from './audio.js';
import { disableButton, enableButton } from './button.js';

window.generateAudio = async function () {
    disableButton()
    stopAudio()

    const frequency = document.getElementById("frequency-select");
    const name = frequency.value

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
        enableButton()
    }
}




