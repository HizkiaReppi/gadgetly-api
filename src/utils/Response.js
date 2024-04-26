/* eslint-disable class-methods-use-this */
/**
 * A class that handles response objects.
 *
 * @example
 * const response = new Response();
 *
 * response.success({ code: 200, message: 'Success', data: {} });
 */
export default class Response {
  /**
   * Returns a success response object.
   * @param {Object} param - The success parameters.
   * @param {number} param.code - The response code.
   * @param {string} param.message - The response message.
   * @param {Array} param.data - The response data.
   *
   * @return {Object} - The success response object.
   */
  success({ code, message, data }) {
    return {
      status: true,
      code,
      message,
      data,
    };
  }

  /**
   * Returns an error response object.
   * @param {Object} param - The error parameters.
   * @param {number} param.code - The response code.
   * @param {string} param.error - The error message.
   * @param {any} param.data - The response data.
   *
   * @return {Object} - The error response object.
   */
  error({ code, error, data }) {
    return {
      status: false,
      code,
      error,
      data,
    };
  }

  /**
   * Returns a response object with pagination data.
   * @param {Object} param - The parameters.
   * @param {number} param.code - The response code.
   * @param {string} param.message - The response message.
   * @param {Array} param.data - The response data.
   * @param {number} param.totalData - The total number of data.
   * @param {number} param.totalPage - The total number of pages.
   * @param {number} param.page - The current page.
   * @param {number} param.limit - The number of data per page.
   *
   * @return {Object} - The response object with pagination data.
   */
  getDataWithPagination({
    code,
    message,
    data,
    totalData,
    totalPage,
    page,
    limit,
  }) {
    return {
      status: true,
      code,
      message,
      data,
      meta: {
        totalData,
        totalPage,
        page,
        limit,
      },
    };
  }

  /**
   * Returns a response object with no data.
   *
   * @param {Object} param - The parameters.
   * @param {boolean} param.status - The status of the response.
   * @param {number} param.code - The response code.
   * @param {string} param.message - The response message.
   *
   * @return {Object} - The response object with no data.
   */
  noData({ status, code, message }) {
    return {
      status,
      code,
      message,
    };
  }
}
