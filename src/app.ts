import express, { Request, Response, NextFunction } from "express";
import bodyParser, { json } from "body-parser";
import path from "path";
import { connectToDatabase } from "./handlers/dbConnection";
import userRoutes from "./routes/user";
import quizRoutes from "./routes/quiz";
import authRoutes from "./routes/auth";
import passport from "passport";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import { sessionSecret } from "./config";
import { initialisePassport } from "./passport-config";
import { productionDbName } from "./config";
const app = express();

//Body-parser
app.use(json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cors
app.use(
  cors({
    origin: "http://localhost/300",
    credentials: true
  })
);

// Session
app.use(
  session({
    secret: sessionSecret as string,
    resave: false,
    saveUninitialized: false
  })
);

// Cookie-parser
app.use(cookieParser(sessionSecret));

// Passport
app.use(passport.initialize());
app.use(passport.session());
initialisePassport(passport);

// Routes
app.use("/api/user", userRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/auth", authRoutes);

// connect to DB
if (process.env.NODE_ENV !== "test") {
  connectToDatabase(productionDbName as string);
}

// To serve both frontend and backend - catch ALL. Serve static assets only if in production.
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/../client", "build")));
  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "/../client", "build", "index.html"));
  });
}

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: error.message || "Ooops, something went wrong!"
  });
});

export { app };

// const PORT = process.env.PORT || 8081;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
