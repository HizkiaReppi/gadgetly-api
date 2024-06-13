import ordersService from '../services/orders.service.js';
import Response from '../utils/Response.js';
import logger from '../utils/logging.js';

const response = new Response();

const create = async (req, res, next) => {
  try {
    const { user } = res.locals;
    const payload = { ...req.body, user_id: user.id };

    const data = await ordersService.create(payload);

    logger.info(`Data berhasil ditambahkan: ${data.id}`);

    res
      .status(201)
      .location(`/orders/${data.id}`)
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

    const data = await ordersService.findAll(limit, page);
    const totalData = await ordersService.count();

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
    const data = await ordersService.findById(req.params.id);

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

const findByUserId = async (req, res, next) => {
  try {
    const data = await ordersService.findByUserId(req.params.id);

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

const findBySellerId = async (req, res, next) => {
  try {
    const data = await ordersService.findBySellerId(req.params.id);

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
    const data = await ordersService.findByIds(req.body);

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

export default {
  create,
  findAll,
  findById,
  findByIds,
  findByUserId,
  findBySellerId,
};
