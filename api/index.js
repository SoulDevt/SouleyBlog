import express from 'express';
import postRoutes from './routes/posts.js'
import usersRoutes from './routes/users.js'
import authRoutes from './routes/auth.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app = express();

//middleware
app.use(cors())
app.use(express.json());
app.use(cookieParser());
//endpoint middleware
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/posts', postRoutes);



app.listen(8000, ()  => {
    console.log('listening on port 8000')
})
