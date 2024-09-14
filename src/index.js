const express = require('express');
const { connectDB } = require('./database/connection');
const userRoutes = require('./routes/api/userRoute');
const webRoutes = require('./routes/web/main');

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', userRoutes);
app.use('/', webRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
