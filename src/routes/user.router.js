import express from "express"
import { getImgSave, getUserProfile } from "../controllers/user.controller.js";

const userRouter = express.Router()

userRouter.get("/profile",getUserProfile)

userRouter.get("/get-img-save",getImgSave)

export default userRouter;