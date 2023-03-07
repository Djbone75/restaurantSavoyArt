import prisma from '../../db';

export const createImage = async (req, res, next) => {
	const post = await prisma.gallery.create({
		data: {
			title: req.body.title,
			content: req.body.content,
			path: req.body.path,
		},
	});
	res.json({ post });
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
		posts: documents,
	});
};

export const getOneImage = async (req, res, next) => {
	const id = parseInt(req.params.id);
	const document = await prisma.gallery.findUnique({
		where: { id: id },
	});
	res.json({
		message: 'here is your image',
		document,
	});
};

export const deleteOneImage = async (req, res, next) => {
	await prisma.gallery.delete({ where: { id: parseInt(req.params.id) } });

	res.status(200).json({ message: 'Post deleted!' });
};
