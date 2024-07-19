import express from "express";
import { Request, Response } from "express";
import session from "express-session";

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
const port = process.env.PORT || 3000;
const sessionSecret = process.env.SESSION_SECRET || "very-secret";

// Middlewares
app.use(express.json());
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // set to true in PROD
  })
);

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
    req.session.user = { fullName: u.fullName, id: u.id, orgId: u.orgId, orgName: u.orgName };
    res.json({ ...req.session.user });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

// Logout endpoint
app.post("/api/auth/v1/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.json({ message: "Logout successful" });
  });
});

// Get user endpoint
app.get("/api/auth/v1/user", (req, res) => {
  if (req.session.user) {
    res.json({ ...req.session.user });
  } else {
    res.status(401).json({ message: "No user logged in" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app; // For testing
