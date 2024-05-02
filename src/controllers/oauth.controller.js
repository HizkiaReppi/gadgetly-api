/* eslint-disable camelcase */
import oauthService from '../services/oauth.service.js';
import Response from '../utils/Response.js';
import logger from '../utils/logging.js';

const response = new Response();

export const googleAuthHandler = async (req, res, next) => {
  try {
    const { code } = req.query;

    const { id_token, access_token } =
      await oauthService.googleOAuthTokens(code);

    const googleUser = await oauthService.getGoogleUser(id_token, access_token);

    if (!googleUser.email_verified) {
      logger.error(`Akun google ${googleUser.name} tidak terverifikasi`);
      return res.status(403).json(
        response.noData({
          status: false,
          code: 403,
          message: 'Akun google tidak terverifikasi',
        }),
      );
    }

    const data = await oauthService.findAndCreateUser(googleUser);

    const { accessToken, refreshToken, id } =
      await oauthService.authenticateUser(data);

    logger.info(`Pengguna berhasil masuk ke aplikasi: ${id}`);

    return res.status(200).json(
      response.success({
        code: 200,
        message: 'Pengguna berhasil masuk ke aplikasi',
        data: { access_token: accessToken, refresh_token: refreshToken },
      }),
    );
  } catch (error) {
    return next(error);
  }
};
