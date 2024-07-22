import cookieParser from "cookie-parser";
import express from "express";
import jwt from "jsonwebtoken";
import { PORT, SECRET_KEY } from "./config";
import { authorized } from "./middlewares/auth";
import logger from "./logger";

// TODO move this to separate types file
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        orgId: string;
        fullName: string;
        orgName: string;
      };
    }
  }
}

const app = express();
const sessionExpirationInHours = 72;

app.use(cookieParser());
app.use(express.json());

// Hardcoded users with orgId
// for the POC purposes only
const users = {
  admin: {
    password: "admin",
    id: "12345",
    orgId: "150",
    orgName: "Observability Org",
    fullName: "John Doe",
  },
};

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

app.post("/api/auth/v1/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
});

app.get("/api/auth/v1/user", authorized, (req, res) => {
  res.json({ ...req.user });
});

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
