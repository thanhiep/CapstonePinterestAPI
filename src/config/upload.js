import multer, { diskStorage } from 'multer'

export const upload = multer({

    storage: diskStorage({
        destination: process.cwd() + "/public/imgs",
        filename: (req, file, callback) => {
            let newName = new Date().getTime() + "_" + file.originalname;
            callback(null, newName)
        }
    })
})