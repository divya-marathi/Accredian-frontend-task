const express = require('express');
const userRouter = require('./router/userRouter');
const cors = require('cors');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json());
app.use(cors())

// Set up user routes
app.use('/', userRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
