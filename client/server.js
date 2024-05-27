const express = require('express');
const bodyParser = require('body-parser');
const { v2: cloudinary } = require('cloudinary');
const multer = require('multer');
const streamifier = require('streamifier');

const app = express();
const upload = multer();

cloudinary.config({
    cloud_name: 'dmnnoyi14',
    api_key: '322437216666322',
    api_secret: 'LlSOGJMffFOFpsm--qkH5QQMfQw'
});

app.use(bodyParser.json());

app.post('/blogposts', upload.single('image'), (req, res) => {
    const { title, content, image } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
    }

    const newPost = {
        id: new Date().getTime(), // Mock ID for the new post
        title,
        content,
        image, // Store the image URL
    };

    // Mock saving to a database by just returning the new post
    res.status(201).json(newPost);
});

const PORT = process.env.PORT || 3001; // Changed port number to 3001
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
