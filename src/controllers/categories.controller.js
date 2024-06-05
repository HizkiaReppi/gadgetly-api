/**
 * TODO:
 * 1. Create API Docs
 */

import categoriesService from '../services/categories.service.js';
import Response from '../utils/Response.js';
import logger from '../utils/logging.js';

const response = new Response();

const create = async (req, res, next) => {
  try {
    const data = await categoriesService.create(req.body);

    logger.info(`Data berhasil ditambahkan: ${data.id}`);

    res
      .status(201)
      .location(`/categories/${data.id}`)
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

    const data = await categoriesService.findAll(limit, page);
    const totalData = await categoriesService.count();

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

const findBySlug = async (req, res, next) => {
  try {
    const data = await categoriesService.findBySlug(req.params.slug);

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
    const data = await categoriesService.update(
      Number(req.params.id),
      req.body,
    );

    logger.info(`Data berhasil diperbaharui: ${data.id}`);

    res
      .status(200)
      .location(`/categories/${data.id}`)
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
    await categoriesService.destroy(Number(req.params.id));

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

export default { create, findAll, findBySlug, update, destroy };
