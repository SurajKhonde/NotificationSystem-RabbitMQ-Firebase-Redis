import express from "express";
import notificationRoutes from "./routes/notifiction.js";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());

app.use("/", notificationRoutes);

app.listen(3000, () => {
  console.log("Backend running on 3000");
});