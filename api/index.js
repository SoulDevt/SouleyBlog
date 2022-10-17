import express from 'express';
import postRoutes from './routes/posts.js'
import usersRoutes from './routes/users.js'
import authRoutes from './routes/auth.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
//install multer for uploading files an restart server
import multer from "multer"


const app = express();

//middleware
app.use(cors())
app.use(express.json());
app.use(cookieParser());


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
      
      cb(null, Date.now() + file.originalname)
    }
  })
const upload = multer({ storage })
app.post('/api/upload', upload.single('file'), function (req, res) {
    const file = req.file
    res.status(200).json(file.filename)
  })

//endpoint middleware
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/posts', postRoutes);



app.listen(8000, ()  => {
    console.log('listening on port 8000')
})
