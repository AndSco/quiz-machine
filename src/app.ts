import express, { Request, Response, NextFunction } from "express";
const app = express();
import { json } from "body-parser";
import path from "path";
import { connectToDatabase } from "./handlers/dbConnection";
import userRoutes from "./routes/user";
import quizRoutes from "./routes/quiz";

app.use(json());

app.use("/api/user", userRoutes);
app.use("/api/quiz", quizRoutes);

// connect to DB
connectToDatabase();

// To serve both frontend and backend - catch ALL. Serve static assets only if in production.
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/../client", "build")));
  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "/../client", "build", "index.html"));
  });
}

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.log("ERROR HANDLER", error.message);

  res.json({
    message: error.message || "Ooops, something went wrong!"
  });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
