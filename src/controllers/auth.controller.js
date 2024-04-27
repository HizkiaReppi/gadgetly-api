import authService from '../services/auth.service.js';
import Response from '../utils/Response.js';
import logger from '../utils/logging.js';

const response = new Response();

const register = async (req, res, next) => {
  try {
    const { accessToken, refreshToken, id } = await authService.register(
      req.body,
    );

    logger.info(`Pengguna berhasil melakukan pendaftaran: ${id}`);

    res.status(201).json(
      response.success({
        code: 201,
        message: 'Pengguna berhasil melakukan pendaftaran',
        data: { access_token: accessToken, refresh_token: refreshToken },
      }),
    );
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { accessToken, refreshToken, id } = await authService.login(req.body);

    logger.info(`Pengguna berhasil masuk ke aplikasi: ${id}`);

    res.status(200).json(
      response.success({
        code: 200,
        message: 'Pengguna berhasil masuk ke aplikasi',
        data: { access_token: accessToken, refresh_token: refreshToken },
      }),
    );
  } catch (error) {
    next(error);
  }
};

export default { register, login };
