import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import config from './config/config.js';
import logger from './utils/logging.js';
import router from './routes.js';
import errorMiddleware from './middleware/error.middleware.js';
import loggingMiddleware from './middleware/logging.middleware.js';

const { port } = config.app;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(helmet());

app.use(loggingMiddleware);

app.use('/api/v1', router);

app.use((req, res) => {
  const { originalUrl, method } = req;
  const message = `Page ${method} | ${originalUrl} Not Found`;
  logger.error(message);
  res.status(404).json({ message });
});

app.use(errorMiddleware);

app.listen(port, () => logger.info(`Server is running on port ${port}`));
