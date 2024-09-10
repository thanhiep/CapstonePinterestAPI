import { PrismaClient } from "@prisma/client";
import { responseData } from "../config/response.js";
import brypt from "bcrypt";
import {
  createToken,
  creatTokenRef,
  decodeToken,
  verifyToken,
  verifyTokenRef,
} from "../config/jwt.js";

const prisma = new PrismaClient();

const signUp = async (req, res) => {
  let { email, matKhau, hoTen, tuoi } = req.body;

  let checkEmail = await prisma.nguoi_dung.findFirst({
    where: {
      email,
    },
  });

  if (checkEmail) {
    responseData("", "Email đã tồn tại !", 409, res);
    return;
  }

  let newData = {
    email,
    mat_khau: brypt.hashSync(matKhau, 10),
    ho_ten: hoTen,
    tuoi: Number(tuoi),
    anh_dai_dien: "",
    refresh_token: "",
  };

  await prisma.nguoi_dung.create({ data: newData });

  try {
    responseData("", "Đăng ký thành công", 201, res);
  } catch (error) {
    throw error;
  }
};

const login = async (req, res) => {
  let { email, matKhau } = req.body;

  let checkEmail = await prisma.nguoi_dung.findFirst({
    where: {
      email,
    },
  });

  if (checkEmail) {
    if (brypt.compareSync(matKhau, checkEmail.mat_khau)) {
      let key = new Date().getTime();

      let token = createToken({
        nguoiDungId: checkEmail.nguoi_dung_id,
        hoTen: checkEmail.ho_ten,
        key,
      });

      let refreshToken = creatTokenRef({
        nguoiDungId: checkEmail.nguoi_dung_id,
        hoTen: checkEmail.ho_ten,
        key,
      });

      checkEmail.refresh_token = refreshToken;

      await prisma.nguoi_dung.update({
        where: {
          nguoi_dung_id: checkEmail.nguoi_dung_id,
        },
        data: {
          ...checkEmail,
        },
      });

      responseData(token, "Đăng nhập thành công", 200, res);
    } else {
      responseData("", "Mật khẩu không đúng", 403, res);
    }
  } else {
    responseData("", "Email không đúng", 403, res);
  }
};

const resetToken = async (req, res) => {
  let { token } = req.headers;
  let checkToken = verifyToken(token);
  if (checkToken != null && checkToken.name != "TokenExpiredError") {
    res.status(401).send("Unauthorized token");
    return;
  }

  let tokenDecode = decodeToken(token);

  let getUser = await prisma.nguoi_dung.findFirst({
    where: {
      nguoi_dung_id: tokenDecode.data.nguoiDungId,
    },
  });

  let checkTokenRef = verifyTokenRef(getUser.refresh_token);

  if (checkTokenRef != null) {
    res.status(401).send("Unauthorized refresh token");
    return;
  }

  let tokenRefDecode = decodeToken(getUser.refresh_token);

  if (tokenDecode.data.key != tokenRefDecode.data.key) {
    res.status(401).send("Unauthorized refresh token");
    return;
  }

  let newToken = createToken({
    nguoiDungId: tokenDecode.data.nguoiDungId,
    hoTen: tokenDecode.data.hoTen,
    key: tokenRefDecode.data.key,
  });

  responseData(newToken, "Đăng nhập thành công", 200, res);
};

export { signUp, login, resetToken };
