// src/utils/responseApi.js

const responseApi = (res, status, statusCode, message, data = {}) => {
  res.status(statusCode).json({
    status: status,
    statusCode: statusCode,
    message: message,
    data: data,
  });
};

const responseApiSuccess = (res, message, data = {}, pagination = {}) => {
  responseApi(res, true, 200, message, data, pagination);
};

const responseApiCreateSuccess = (res, message, data = {}) => {
  responseApi(res, true, 201, message, data);
};

const responseApiFailed = (res, message, data = {}) => {
  responseApi(res, false, 400, message, data);
};

const responseApiAccessDenied = (res, data = {}) => {
  responseApi(res, false, 403, "Access Denied", data);
};

const responseApiNotFound = (res, data = {}) => {
  responseApi(res, false, 404, "Not Found", data);
};

const responseApiMethodNotAllowed = (res, data = {}) => {
  responseApi(res, false, 405, "Method Not Allowed", data);
};

module.exports = {
  responseApi,
  responseApiSuccess,
  responseApiCreateSuccess,
  responseApiFailed,
  responseApiAccessDenied,
  responseApiNotFound,
  responseApiMethodNotAllowed,
};
