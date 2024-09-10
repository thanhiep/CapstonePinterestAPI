import { PrismaClient } from "@prisma/client";
import { decodeToken } from "../config/jwt.js";
import { responseData } from "../config/response.js";

const prisma = new PrismaClient();

const getUserProfile = async (req, res) => {
  let { token } = req.headers;

  let tokenDecode = decodeToken(token);

  try {
    let checkUser = await prisma.nguoi_dung.findFirst({
      where: {
        nguoi_dung_id: tokenDecode.data.nguoiDungId,
      },
      include: {
        hinh_anh: true,
      },
    });

    if (checkUser) {
      let user = {
        nguoiDungId: checkUser.nguoi_dung_id,
        email: checkUser.email,
        hoTen: checkUser.ho_ten,
        tuoi: checkUser.tuoi,
        anhDaiDien: checkUser.anh_dai_dien,
        hinhDaTao: checkUser.hinh_anh,
      };
      responseData(user, "Thành công", 200, res);
    }
  } catch (error) {
    throw error;
  }
};

const getImgSave = async (req, res) => {
  let { token } = req.headers;

  let tokenDecode = decodeToken(token);

  try {
    let checkSave = await prisma.luu_anh.findMany({
      where: {
        nguoi_dung_id: tokenDecode.data.nguoiDungId,
      },
      include: {
        hinh_anh: true,
      },
    });

    let listImgSave = [];
    checkSave.forEach((item) => {
      listImgSave.push({ ngayLuu: item.ngay_luu, hinhAnh: item.hinh_anh });
    });

    if (checkSave.length > 0) {
      responseData(
        {
          nguoiDungId: tokenDecode.data.nguoiDungId,
          hoTen: tokenDecode.data.hoTen,
          anhDaLuu: listImgSave,
        },
        "Thành công",
        200,
        res
      );
    }
  } catch (error) {
    throw error;
  }
};

export { getUserProfile, getImgSave };
