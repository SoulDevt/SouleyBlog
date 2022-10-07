import express from 'express';
import postRoutes from './routes/posts.js'
import usersRoutes from './routes/posts.js'
import authRoutes from './routes/posts.js'

const app = express();

//middleware
app.use(express.json());
//endpoint middleware
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/posts', postRoutes);



app.listen(8000, ()  => {
    console.log('listening on port 8000')
})
