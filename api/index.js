import express from 'express';

const app = express();

//middleware
app.use(express.json());

app.listen(8000, ()  => {
    console.log('listening on port 8000')
})
