import express from 'express';
import {
	createImage,
	getImages,
	getOneImage,
	deleteOneImage,
	updateImage,
} from './gallery.controller';
import { adminProtect } from '../../middlewares/auth';

const router = express.Router();

const multer = require('multer');
const MIME_TYPE_MAP = {
	'image/png': 'png',
	'image/jpeg': 'jpg',
	'image/jpg': 'jpg',
};
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const isValid = MIME_TYPE_MAP[file.mimetype];
		let error = new Error('mime type invalide');
		if (isValid) {
			error = null;
		}
		cb(error, './images');
	},
	filename: (req, file, cb) => {
		const name = file.originalname.toLowerCase().split(' ').join('-');
		const ext = MIME_TYPE_MAP[file.mimetype];
		cb(null, name + '-' + Date.now() + '.' + ext);
	},
});

router.post('/', multer({ storage: storage }).single('image'), createImage);

router.put('/:id', updateImage);

router.get('/:id', getOneImage);

router.get('', getImages);

router.delete('/:id', adminProtect, deleteOneImage);

export default router;
