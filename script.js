const downloadButton = document.getElementById('download-button');
const URLInput = document.getElementById('URL-input');

downloadButton.addEventListener('click', () => {
    const videoURL = URLInput.value;
    if (videoURL) {
        sendURL(videoURL);
    }
});

function sendURL(URL) {
    fetch(`http://localhost:4000/download?URL=${encodeURIComponent(URL)}`, {
        method: 'GET'
    }).then(res => res.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'video.mp4';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
        })
        .catch(error => {
            console.error('Error downloading video:', error);
        });
}
