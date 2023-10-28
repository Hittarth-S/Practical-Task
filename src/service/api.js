import request from "./request";

/* Auth API */
// Login
export const login = (data) => {
  return new Promise(async (resolve, reject) => {
    await request
      .post("auth/login", data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => {
        reject(e);
      });
  });
};
// Login
export const register = (data) => {
  return new Promise(async (resolve, reject) => {
    await request
      .post("auth/register", data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

/* Products API */
// Get Product List
export const getProductList = (data) => {
  return new Promise(async (resolve, reject) => {
    await request
      .get(`/product`, { params: data })
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => {
        reject(e);
      });
  });
};
// Get Product Details By Id
export const getProductDetailsById = (id) => {
  return new Promise(async (resolve, reject) => {
    await request
      .get(`product/` + id)
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

// Users API
export const getUserDetails = () => {
  return new Promise(async (resolve, reject) => {
    await request
      .get(`/user`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => {
        reject(e);
      });
  });
};
