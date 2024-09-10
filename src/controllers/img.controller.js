import { PrismaClient } from "@prisma/client";
import { responseData } from "../config/response.js";
import { decodeToken } from "../config/jwt.js";

const prisma = new PrismaClient();

const getImg = async (req, res) => {
  try {
    let data = await prisma.hinh_anh.findMany();
    responseData(data, "Thành công", 200, res);
  } catch (error) {
    throw error;
  }
};

const getImgPage = async (req, res) => {
  let { page } = req.params;

  let pageSize = 5;

  let index = (page - 1) * pageSize;

  try {
    let data = await prisma.hinh_anh.findMany({
      skip: index,
      take: pageSize,
    });

    let totalPage = Math.ceil((await prisma.hinh_anh.count()) / pageSize);
    responseData({ data, totalPage }, "Thành công", 200, res);
  } catch (error) {
    throw error;
  }
};

const searchImg = async (req, res) => {
  let { searchValue } = req.query;

  try {
    let data = await prisma.hinh_anh.findMany({
      where: {
        ten_hinh: {
          contains: searchValue,
        },
      },
    });
    if (data.length > 0) {
      responseData(data, "Thành công", 200, res);
    } else {
      responseData("", "Không tìm thấy hình ảnh phù hợp", 404, res);
    }
  } catch (error) {
    throw error;
  }
};

const getImgDetail = async (req, res) => {
  let { hinhId } = req.params;

  try {
    let data = await prisma.hinh_anh.findFirst({
      where: {
        hinh_id: Number(hinhId),
      },
      include: {
        nguoi_dung: true,
      },
    });
    responseData(data, "Thành công", 200, res);
  } catch (error) {
    throw error;
  }
};

const getImgComment = async (req, res) => {
  let { hinhId } = req.params;

  try {
    let data = await prisma.hinh_anh.findFirst({
      where: {
        hinh_id: Number(hinhId),
      },
      include: {
        binh_luan: true,
      },
    });
    responseData(data, "Thành công", 200, res);
  } catch (error) {
    throw error;
  }
};

const getIsImgSaved = async (req, res) => {
  let { hinhId } = req.params;
  let { token } = req.headers;

  let tokenDecode = decodeToken(token);

  try {
    let checkSave = await prisma.luu_anh.findFirst({
      where: {
        hinh_id: Number(hinhId),
        nguoi_dung_id: tokenDecode.data.nguoiDungId,
      },
    });

    if (checkSave) {
      responseData(
        { hinhId, daLuu: true, ngayLuu: checkSave.ngay_luu },
        "Ảnh đã lưu",
        200,
        res
      );
    } else {
      responseData({ hinhId, daLuu: false }, "Ảnh chưa lưu", 200, res);
    }
  } catch (error) {
    throw error;
  }
};

const addComment = async (req, res) => {
  let { hinhId } = req.params;
  let { token } = req.headers;
  let { noiDung } = req.body;

  let tokenDecode = decodeToken(token);

  let newData = {
    nguoi_dung_id: tokenDecode.data.nguoiDungId,
    hinh_id: Number(hinhId),
    noi_dung: noiDung,
    ngay_binh_luan: new Date(),
  };

  try {
    await prisma.binh_luan.create({ data: newData });
    responseData("", "Đã thêm bình luận", 201, res);
  } catch (error) {
    throw error;
  }
};

const deleteImg = async (req, res) => {
  let { token } = req.headers;
  let { hinhId } = req.body;

  let tokenDecode = decodeToken(token);

  try {
    let checkImg = await prisma.hinh_anh.findFirst({
      where: {
        hinh_id: Number(hinhId),
        nguoi_dung_id: tokenDecode.data.nguoiDungId,
      },
    });

    if (checkImg) {
      await prisma.binh_luan.deleteMany({
        where: {
          hinh_id: Number(hinhId),
        },
      });

      await prisma.luu_anh.deleteMany({
        where: {
          hinh_id: Number(hinhId),
        },
      });

      await prisma.hinh_anh.delete({
        where: {
          hinh_id: Number(hinhId),
        },
      });

      responseData(deleteImg, "Xóa thành công", 200, res);
    } else {
      responseData("", "Xóa không thành công", 400, res);
    }
  } catch (error) {
    throw error;
  }
};

const uploadImg = async (req, res) => {
  let file = req.file;
  let { token } = req.headers;
  let { tieuDe, moTa } = req.body;

  let tokenDecode = decodeToken(token);

  let newData = {
    ten_hinh: tieuDe,
    mo_ta: moTa,
    duong_dan: file.filename,
    nguoi_dung_id: tokenDecode.data.nguoiDungId,
  };

  try {
    await prisma.hinh_anh.create({ data: newData });
    responseData(newData, "Thêm ảnh thành công", 201, res);
  } catch (error) {
    throw error;
  }
};

export {
  getImg,
  getImgPage,
  searchImg,
  getImgDetail,
  getImgComment,
  getIsImgSaved,
  addComment,
  deleteImg,
  uploadImg,
};
