import numpy as np
from scipy.io.wavfile import write


with open("db.json", "r") as f:
    db = f.read()


def generate(note, duration, sample_rate):

    note_frequencies = db.get(note)

    t = np.linspace(0, duration, int(sample_rate * duration), endpoint=False)

    # Generate audio signals for each frequency and combine them
    audio = np.zeros_like(t)
    for freq in note_frequencies:
        audio += 0.25 * np.sin(2 * np.pi * freq * t)  # Adding sine waves

    # Normalize the audio to avoid clipping
    audio /= np.max(np.abs(audio))

    # Save as a WAV file
    write("file.wav", sample_rate, audio.astype(np.float32))
