import express from "express";
import { Request, Response } from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { PORT, SECRET_KEY } from "./config";
import { authorized } from "./middlewares/auth";

declare module "express-session" {
  interface SessionData {
    user?: {
      id: string;
      orgId: string;
      fullName: string;
      orgName: string;
    };
  }
}

// Create the Express application
const app = express();
const sessionExpirationInHours = 72;

// Middlewares
// Use middleware to parse JSON and cookies
app.use(cookieParser());
app.use(express.json());
// app.use(
//   session({
//     secret: sessionSecret,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }, // set to true in PROD
//   })
// );

// Hardcoded users with orgId
const users = {
  admin: {
    password: "admin",
    id: "12345",
    orgId: "150",
    orgName: "Observability Org",
    fullName: "John Doe",
  },
};

// Login endpoint
app.post("/api/auth/v1/login", (req, res) => {
  const { username, password } = req.body;

  if (users[username] && users[username].password === password) {
    const u = users[username];
    const loggedUser = { fullName: u.fullName, id: u.id, orgId: u.orgId, orgName: u.orgName };

    const token = jwt.sign({ ...loggedUser }, SECRET_KEY, { expiresIn: sessionExpirationInHours + "h" });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: sessionExpirationInHours * 60 * 60 * 1000, // 72 hours in milliseconds
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // prevents CSRF attacks
    });

    res.json(loggedUser);
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

// Logout endpoint
app.post("/api/auth/v1/logout", (req, res) => {
  res.clearCookie("token"); // Clear the "token" cookie
  res.json({ message: "Logout successful" });
});

// Get user endpoint
app.get("/api/auth/v1/user", authorized, (req, res) => {
  // @ts-ignore
  res.json({ ...req.user });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app; // For testing
