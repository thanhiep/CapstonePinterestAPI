import express from "express"
import { addComment, deleteImg, getImg, getImgComment, getImgDetail, getImgPage, getIsImgSaved, searchImg, uploadImg } from "../controllers/img.controller.js";
import { middleWareToken } from "../config/jwt.js";
import { upload } from "../config/upload.js";

const imgRouter = express.Router()

imgRouter.get("/get-img",middleWareToken,getImg)

imgRouter.get("/get-img-page/:page",middleWareToken, getImgPage)

imgRouter.get("/search",middleWareToken,searchImg)

imgRouter.get("/get-img-detail/:hinhId",middleWareToken,getImgDetail)

imgRouter.get("/get-img-comment/:hinhId",middleWareToken,getImgComment)

imgRouter.get("/get-is-img-save/:hinhId",middleWareToken, getIsImgSaved)

imgRouter.post("/add-comment/:hinhId",middleWareToken,addComment)

imgRouter.delete("/delete-img", middleWareToken, deleteImg)

imgRouter.post("/upload", upload.single("hinhAnh"),uploadImg)

export default imgRouter;