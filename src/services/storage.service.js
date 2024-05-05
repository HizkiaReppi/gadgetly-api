import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectsCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuid } from 'uuid';
import config from '../config/config.js';
import logger from '../utils/logging.js';

const S3 = new S3Client({
  region: config.aws.s3.region,
  credentials: {
    accessKeyId: config.aws.s3.accessKeyId,
    secretAccessKey: config.aws.s3.secretAccessKey,
  },
});

/**
 * Formats a filename to be used as a key in an S3 bucket.
 *
 * @param {string} filename - The filename to format.
 * @return {string} The formatted filename.
 */
const formatFileName = (filename) => {
  const formattedFilename = `${uuid()}-${filename.toLowerCase().replace(/\s+/g, '-')}`;
  return formattedFilename;
};

/**
 * Creates a presigned URL for accessing an object in an S3 bucket.
 * This URL can be used to retrieve the object without requiring AWS credentials,
 * and it is valid for a limited time.
 *
 * @param {string} key - The key of the object in the S3 bucket.
 * @return {Promise<string>} A promise that resolves to the presigned URL string.
 */
export const createPreSignedUrl = async (key) => {
  const command = new GetObjectCommand({
    Bucket: config.aws.s3.bucket,
    Key: key,
  });
  return getSignedUrl(S3, command, { expiresIn: 10_800 });
};

/**
 * Writes a list of files to an S3 bucket.
 *
 * @param {File[]} files - A list of files to upload.
 * @return {Promise<Array<{key: string, presignedUrl: string}>>} - A list of objects,
 * each containing the S3 key and a presigned URL for the uploaded file.
 */
export const writeFile = async (files) => {
  const results = [];

  try {
    await Promise.all(
      files.map(async (file) => {
        let directory;
        if (file.mimetype.startsWith('image/')) {
          directory = 'images';
        } else if (file.mimetype.startsWith('video/')) {
          directory = 'videos';
        }

        const filename = formatFileName(file.originalname);
        const key = `${directory}/${filename}`;

        const params = {
          Bucket: config.aws.s3.bucket,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
        };

        await S3.send(new PutObjectCommand(params));

        const presignedUrl = await createPreSignedUrl(key);

        results.push({ key, presignedUrl });
      }),
    );

    return results;
  } catch (error) {
    logger.error('Error writing file:', error);
    throw error;
  }
};

/**
 * Deletes multiple objects from an S3 bucket in a single request.
 *
 * @param {Key[string]} keys - The keys of the objects to delete.
 * @return {Promise<void>}
 */
export const deleteFile = async (keys) => {
  const params = {
    Bucket: config.aws.s3.bucket,
    Delete: {
      Objects: keys.map((key) => ({ Key: key })),
    },
  };

  try {
    await S3.send(new DeleteObjectsCommand(params));
    logger.info(`Files deleted: ${keys.join(', ')}`);
  } catch (error) {
    logger.error('Error deleting files:', error);
    throw error;
  }
};
