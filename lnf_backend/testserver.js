const express = require('express')
const multer = require('multer')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'public'))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
})
app.use(bodyParser.urlencoded({
    extended: true
}));
const uploads = multer({
    storage: storage
})

app.post('/api/lost/upload', uploads.single('image'), (req, res) => {
    console.log('asd');
    console.log('uploaded:', req.file);
    res.sendFile(req.file.path);
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
});

app.listen(8081, () => console.log('Server Running at port: 8081'))