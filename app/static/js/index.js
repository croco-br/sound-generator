async function generateAudio() {
    show_loader();

    const frequency = document.getElementById("frequency").value;
    const duration = document.getElementById("duration").value;

    // Create the data object
    const data = { frequency, duration };

    try {
        const response = await fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        const url = result.url; // Assuming the server returns a JSON object with a URL

        // Create a link to download the generated file
        const link = document.createElement("a");
        link.href = url;
        link.download = "generated_sound.wav"; // Optional: specify the name for the downloaded file
        link.click();
    } catch (error) {
        alert('Error generating audio'); // Corrected error message
        console.error('Error:', error);
    } finally {
        hide_loader();
    }
}

function hide_loader() {
    const loader = document.getElementById('generate-button');
    loader.classList.remove('is-loading');
}

function show_loader() {
    const loader = document.getElementById('generate-button');
    loader.classList.add('is-loading');
}
