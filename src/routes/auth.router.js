import express from "express"
import { login, resetToken, signUp } from "../controllers/auth.controller.js";

const authRouter = express.Router()

authRouter.post("/sign-up", signUp)

authRouter.post("/login",login)

authRouter.post("/reset-token",resetToken)

export default authRouter;