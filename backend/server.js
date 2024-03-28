require('dotenv').config();
const app = require('./app');
const connectDatabase = require('./db/database');





process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(`Error: ${err.message}`);
    process.exit(1);
})

connectDatabase();

app.listen(process.env.PORT,()=>{
    console.log(`Server running on http://localhost:  ${process.env.PORT}`)
})





