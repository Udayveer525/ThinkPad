import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "../src/config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors(
  {
    origin: 'http://localhost:5173',
  }
))
app.use(express.json());
app.use(rateLimiter);
// app.use((req, res, next) => {
//   console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
//   next();
// });

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
  console.log("Server is running on PORT: ", PORT);
  });
})


//mongodb+srv://uvsu525:yrPkVc7Qgv0pYihv@cluster0.aya9vuw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0