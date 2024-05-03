import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
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
 * @param {Object} params - The parameters for creating the presigned URL.
 * @param {string} params.bucket - The name of the S3 bucket.
 * @param {string} params.key - The key of the object in the S3 bucket.
 * @return {Promise<string>} A promise that resolves to the presigned URL string.
 */
export const createPreSignedUrl = ({ bucket, key }) => {
  const command = new GetObjectCommand({ Bucket: bucket, Key: key });
  return getSignedUrl(S3, command, { expiresIn: 10_800 });
};

/**
 * Writes a list of files to an S3 bucket.
 *
 * @param {File[]} files - a list of files to upload
 * @return {Promise<string[]>} - a list of presigned URLs for the uploaded files
 */
export const writeFile = async (files) => {
  const uploadedFiles = [];

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
        const params = {
          Bucket: config.aws.s3.bucket,
          Key: `${directory}/${filename}`,
          Body: file.buffer,
          ContentType: file.mimetype,
        };

        await S3.send(new PutObjectCommand(params));

        const presignedUrl = await createPreSignedUrl({
          bucket: config.aws.s3.bucket,
          key: `${directory}/${filename}`,
        });
        uploadedFiles.push(presignedUrl);
      }),
    );

    return uploadedFiles;
  } catch (error) {
    logger.error('Error writing file:', error);
    throw error;
  }
};
