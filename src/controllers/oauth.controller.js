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

    const redirectUrl = `${process.env.APP_FRONTEND_URL}/auth/oauth/callback?access_token=${accessToken}&refresh_token=${refreshToken}`;
    logger.info(
      `Redirecting to: '${process.env.APP_FRONTEND_URL}/auth/oauth/callback' with access_token & refresh_token`,
    );

    return res.redirect(redirectUrl);
  } catch (error) {
    return next(error);
  }
};
