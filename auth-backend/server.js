require('dotenv').config(); 
const express = require('express'); 
const mongoose = require('mongoose'); 
const authRoutes = require('./routes/auth'); 
const protectedRoutes = require('./routes/protected'); 

const app = express(); 
app.use(express.json()); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ DB Error:', err)); 

app.use('/auth', authRoutes); 
app.use('/api', protectedRoutes); 

app.listen(3000, () => { 
  console.log('Server running on http://localhost:3000'); 
});