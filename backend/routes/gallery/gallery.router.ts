import express from 'express';
import {
	createImage,
	getImages,
	getOneImage,
	deleteOneImage,
	updateImage,
} from './gallery.controller';

const router = express.Router();

router.post('/', createImage);

router.put('/:id', updateImage);

router.get('/:id', getOneImage);

router.get('', getImages);

router.delete('/:id', deleteOneImage);

export default router;
