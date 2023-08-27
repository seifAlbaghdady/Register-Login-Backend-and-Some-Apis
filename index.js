const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const contactRouter=require('./routes/contactRoutes');
const userRouter=require('./routes/userRoutes');
PORT = process.env.PORT;

app.use(express.json());

app.use('/api/contacts', contactRouter);
app.use('/api/users', userRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
    }   
);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
    }
);