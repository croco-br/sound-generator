import io
import json
import numpy as np
from scipy.io.wavfile import write

with open("db.json", "r") as f:
    db = json.load(f) 

def generate_audio(name: str):
    sample_rate = 96000  # Sample rate in Hz
    duration = 30
    note_frequencies = db.get(name, {}).get("frequencies", [])

    if not note_frequencies:
        return None

    t = np.linspace(0, duration, int(sample_rate * duration), endpoint=False)
    audio_data = np.zeros(t.shape)

    # Generate sound by combining frequencies
    for freq in note_frequencies:
        audio_data += 0.25 * np.sin(2 * np.pi * freq * t)

    # Normalize the sound to avoid clipping
    audio_data /= np.max(np.abs(audio_data))
 
    # Convert to 16-bit PCM format
    audio_data = (audio_data * 2147483647).astype(np.int32)

    # Create an in-memory bytes buffer for the WAV file
    buffer = io.BytesIO()
    write(buffer, sample_rate, audio_data)
    buffer.seek(0)  # Rewind the buffer for reading
    return buffer 
