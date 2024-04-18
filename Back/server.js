import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/dbconfig.js";
import articleRouter from "./routes/articleRoutes.js"
import cors from "cors";

const app = express();

const port = 1963;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(articleRouter);
app.use(express.static('public'));


connectDB()

app.listen(port, () => {console.log(`http://localhost:${port}`)});