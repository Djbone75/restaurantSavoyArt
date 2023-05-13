import prisma from '../../db';

/* 
for cloudinary : 
const cloudinary = require('cloudinary').v2;

cloudinary.config({
	secure: true,
}); */

export const createImage = async (req, res, next) => {
	const urlImg = req.protocol + '://' + req.get('host');

	/* 
	for cloudinary : 
	const uploadImage = async (imagePath) => {
		
		const options = {
			use_filename: true,
			unique_filename: false,
			overwrite: true,
		};

		try {
			// Upload the image
			const result = await cloudinary.uploader.upload(
				urlImg + '/images/' + req.file.filename,
				options
			);
			console.log(result);
			return result.public_id;
		} catch (error) {
			console.error(error);
		}
	};
	await uploadImage(urlImg); */

	const gallery = await prisma.gallery.create({
		data: {
			title: req.body.title,
			content: req.body.content,
			path: urlImg + '/images/' + req.file.filename,
			//for cloudinary process.env.CLOUDINARY_URL_IMG + req.file.filename
		},
	});

	res.json({ gallery });
};

export const updateImage = async (req, res, next) => {
	const post = {
		title: req.body.title,
		content: req.body.content,
		path: req.body.path,
	};

	await prisma.gallery.update({
		where: {
			id: parseInt(req.params.id),
		},
		data: post,
	});

	res.status(200).json({ message: 'Update successful!' });
};

export const getImages = async (req, res, next) => {
	const documents = await prisma.gallery.findMany();

	res.status(200).json({
		message: 'Posts fetched successfully!',
		galleries: documents,
	});
};

export const getOneImage = async (req, res, next) => {
	const id = parseInt(req.params.id);
	const gallery = await prisma.gallery.findUnique({
		where: { id: id },
	});
	res.json({
		message: 'voici votre image',
		gallery,
	});
};

export const deleteOneImage = async (req, res, next) => {
	await prisma.gallery.delete({ where: { id: parseInt(req.params.id) } });

	res.status(200).json({ message: 'Post deleted!' });
};
