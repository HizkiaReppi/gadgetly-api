import axios from 'axios';
import config from '../config/config.js';
import prisma from '../utils/database.js';
import {
  generateStrongRandomPassword,
  generateToken,
  generateUsername,
  updateLastLogin,
  updateRefreshToken,
} from '../utils/auth.js';

const googleOAuthTokens = async (code) => {
  try {
    const { data } = await axios.post(
      'https://oauth2.googleapis.com/token',
      {
        client_id: config.google.clientId,
        client_secret: config.google.clientSecret,
        redirect_uri: config.google.redirectUri,
        grant_type: 'authorization_code',
        code,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getGoogleUser = async (idToken, accessToken) => {
  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?alt=json&access_token=${accessToken}`,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      },
    );

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findAndCreateUser = async (googleUser) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: googleUser.email,
      },
    });

    if (!user) {
      let username = googleUser.name.toLowerCase().replace(/\s/g, '');

      const isUsernameExist = await prisma.user.findUnique({
        where: { username },
      });

      if (isUsernameExist) {
        username = await generateUsername(username);
      }

      const password = await generateStrongRandomPassword();

      const newUser = await prisma.user.create({
        data: {
          name: googleUser.name,
          username,
          email: googleUser.email,
          password,
          photo: googleUser.picture,
        },
      });

      return newUser;
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const authenticateUser = async (user) => {
  const { accessToken, refreshToken } = await generateToken(user);
  await updateRefreshToken(user.id, refreshToken);
  await updateLastLogin(user.id);

  return { accessToken, refreshToken, id: user.id };
};

export default {
  googleOAuthTokens,
  getGoogleUser,
  findAndCreateUser,
  authenticateUser,
};
