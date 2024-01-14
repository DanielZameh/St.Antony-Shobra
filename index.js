const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const app = express();
app.use(cors());
app.listen(4000, () => {
    console.log('Server Works !!! At port 4000');
});
app.get('/download', async (req, res) => {
    const URL = req.query.URL;
    try {
        const videoInfo = await ytdl.getInfo(URL);
        const formats = videoInfo.formats.filter(format => format.container === 'mp4' && format.qualityLabel);
        if (formats.length > 0) {
            const format = formats[0];
            const videoURL = format.url;
            res.setHeader('Content-Disposition', 'attachment; filename="video.mp4"');
            ytdl(videoURL, { filter: format => format.container === 'mp4' }).pipe(res);
        } else {
            res.status(404).send('No MP4 format found for the provided video URL.');
        }
    } catch (error) {
        console.error('Error fetching video info:', error);
        res.status(500).send('Error fetching video info. Please check the video URL and try again.');
    }
});
