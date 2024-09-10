import express from "express"
import imgRouter from "./img.router.js"
import userRouter from "./user.router.js"
import authRouter from "./auth.router.js"

const rootRouter = express.Router()

rootRouter.use("/image", imgRouter)

rootRouter.use("/user", userRouter)

rootRouter.use("/auth", authRouter)

export default rootRouter;