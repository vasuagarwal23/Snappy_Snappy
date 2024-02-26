import express, { json } from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import userRoutes from './routes/userRoutes';
const app = express();
require("dotenv").config();

//use cors  for that use .use middleware
app.use(cors());
app.use(json());
app.use("/api/auth", userRoutes); //It means that any route starting with "/api/auth" will be handled by the userRoutes router.
connect(process.env.MONGO_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,//in dono option ka use karna na karna is same bcz they are deprecated
})
    .then(() => {
        console.log("DB connection established");
    })
    .catch((err) => {
        console.log(err.message);
    })

const server = app.listen(process.env.PORT, () => {
    console.log('listening on port ' + process.env.PORT);
})