let speechSynthesisUtterance;
let isPaused = false;

function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    fetch('/upload', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('textArea').value = data.text;
    })
    .catch(error => console.error('Error:', error));
}

function processText() {
    const text = document.getElementById('textArea').value;

    fetch('/process', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('processedText').innerText = data.processed_text;
    })
    .catch(error => console.error('Error:', error));
}

function readAloud() {
    const text = document.getElementById('processedText').innerText;
    speechSynthesis.cancel();  // Cancel any ongoing speech
    speechSynthesisUtterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(speechSynthesisUtterance);
}

function pauseSpeech() {
    if (speechSynthesis.speaking && !speechSynthesis.paused) {
        speechSynthesis.pause();
        isPaused = true;
    }
}

function resumeSpeech() {
    if (isPaused) {
        speechSynthesis.resume();
        isPaused = false;
    }
}

function downloadText() {
    const text = document.getElementById('processedText').innerText;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'processed_text.txt';
    a.click();
    URL.revokeObjectURL(url);
}
