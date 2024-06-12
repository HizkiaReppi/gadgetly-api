import productService from '../services/products.service.js';
import Response from '../utils/Response.js';
import logger from '../utils/logging.js';

const response = new Response();

const create = async (req, res, next) => {
  try {
    const { user } = res.locals;
    const payload = { ...req.body, images: req.files, user_id: user.id };

    const data = await productService.create(payload);

    logger.info(`Data berhasil ditambahkan: ${data.id}`);

    res
      .status(201)
      .location(`/products/${data.id}`)
      .json(
        response.success({
          code: 201,
          message: 'Data berhasil ditambahkan',
          data,
        }),
      );
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
  try {
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const sort = req.query.sort || 'title';

    const data = await productService.findAll(limit, page, sort);
    const totalData = await productService.count();

    logger.info('Semua data berhasil diambil');

    res.status(200).json(
      response.getDataWithPagination({
        code: 200,
        message: 'Semua data berhasil diambil',
        data,
        totalData,
        totalPage: Math.ceil(totalData / limit),
        limit,
        page,
      }),
    );
  } catch (error) {
    next(error);
  }
};

const findById = async (req, res, next) => {
  try {
    const data = await productService.findById(req.params.id);

    logger.info(`Detail data berhasil diambil: ${data.id}`);

    res.status(200).json(
      response.success({
        code: 200,
        message: 'Detail data berhasil diambil',
        data,
      }),
    );
  } catch (error) {
    next(error);
  }
};

const findByIds = async (req, res, next) => {
  try {
    const data = await productService.findByIds(req.body);

    logger.info('Data berhasil diambil');

    res.status(200).json(
      response.success({
        code: 200,
        message: 'Detail data berhasil diambil',
        data,
      }),
    );
  } catch (error) {
    next(error);
  }
};

const searchProducts = async (req, res, next) => {
  try {
    const { search } = req.query;

    const products = await productService.searchProducts(search);

    logger.info(`Pencarian produk ${search}`);

    res.status(200).json(
      response.success({
        code: 200,
        message: 'Detail data berhasil diambil',
        products,
      }),
    );
  } catch (error) {
    next(error);
  }
};

export default { create, findAll, findById, searchProducts, findByIds };
