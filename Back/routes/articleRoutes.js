import { Router } from "express";
import { addComment, addNewArticle, addNewCategory, connect, createAccount, deleteArticle, getArticle, getDetails, getNewArticle, getUpdateArticle, updateArticle } from "../controller/articleController.js";
import multer from "multer";
import verifyToken from "../middleware/authMiddleware.js";



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({storage: storage});

const router = Router();

router.get('/', getArticle);

router.get('/gestionarticles', verifyToken, getNewArticle);
router.post('/gestionarticles', verifyToken, upload.single('image'), addNewArticle);

router.post('/gestioncategories', verifyToken, addNewCategory);


router.get('/articledetails/:id', getDetails);
router.post('/articledetails/:id', addComment);


router.delete('/delete/:id', deleteArticle);

router.get('/modifierarticle/:id', getUpdateArticle);
router.put('/modifierarticle/:id', upload.single('image'), updateArticle);

router.post('/register', createAccount);


router.post('/login', connect);

export default router;