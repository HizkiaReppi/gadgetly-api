import usersService from '../services/users.service.js';
import Response from '../utils/Response.js';
import logger from '../utils/logging.js';

const response = new Response();

const create = async (req, res, next) => {
  try {
    const payload = { ...req.body, file: req.file };

    const data = await usersService.create(payload);

    logger.info(`Data berhasil ditambahkan: ${data.id}`);

    res
      .status(201)
      .location(`/users/${data.id}`)
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

    const data = await usersService.findAll(limit, page);
    const totalData = await usersService.count();

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
    const data = await usersService.findById(req.params.id);

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

const update = async (req, res, next) => {
  try {
    const payload = { ...req.body, file: req.file };
    const data = await usersService.update(req.params.id, payload);

    logger.info(`Data berhasil diperbaharui: ${data.id}`);

    res
      .status(200)
      .location(`/users/${data.id}`)
      .json(
        response.success({
          code: 200,
          message: 'Data berhasil diperbaharui',
          data,
        }),
      );
  } catch (error) {
    next(error);
  }
};

const updatePassword = async (req, res, next) => {
  try {
    const data = await usersService.updatePassword(req.params.id, req.body);

    logger.info(`Data berhasil diperbaharui: ${data.id}`);

    res
      .status(200)
      .location(`/users/${data.id}`)
      .json(
        response.success({
          code: 200,
          message: 'Data berhasil diperbaharui',
          data,
        }),
      );
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    await usersService.destroy(req.params.id);

    logger.info(`Data berhasil dihapus: ${req.params.id}`);

    res.status(200).json(
      response.noData({
        status: true,
        code: 200,
        message: 'Data berhasil dihapus',
      }),
    );
  } catch (error) {
    next(error);
  }
};

export default { create, findAll, findById, update, updatePassword, destroy };
