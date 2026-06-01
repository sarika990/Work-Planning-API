const app = require("./src/app");
const mongoose = require("mongoose");


const mongoURI = "mongodb://saru43740_db_user:Sarika2008@ac-6mhd7ht-shard-00-00.p60riba.mongodb.net:27017,ac-6mhd7ht-shard-00-01.p60riba.mongodb.net:27017,ac-6mhd7ht-shard-00-02.p60riba.mongodb.net:27017/?ssl=true&replicaSet=atlas-10ve60-shard-0&authSource=admin&appName=Cluster0";

mongoose.connect(mongoURI)
    .then(() => {
        console.log("MongoDB se connection successful ho gaya!");
        
        
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch((error) => {
        console.log("Database connection mein error aaya:", error);
    });