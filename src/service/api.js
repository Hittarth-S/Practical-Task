import request from "./request";

/* Auth API */
// Login
export const adminLogin = (data) => {
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

/* Products API */
// Add Product
export const addProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    await request
      .post("product/", data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => {
        reject(e);
      });
  });
};
// Edit Product Details By Id
export const editProductDetailsById = (id, body) => {
  return new Promise(async (resolve, reject) => {
    await request
      .put(`product/` + id, body)
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => {
        reject(e);
      });
  });
};
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
// Delete Product Details By Id
export const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    await request
      .delete(`product/` + id)
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => {
        reject(e);
      });
  });
};
// Upload Image For Product By Id
export const addProductImageByProductId = (id, body) => {
  return new Promise(async (resolve, reject) => {
    await request
      .patch(`product/image/` + id, body)
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => {
        reject(e);
      });
  });
};
// Update Uploaded Image By Id For Product By Id
export const updateProductImageByProductImageId = (id, productImageId, body) => {
  return new Promise(async (resolve, reject) => {
    await request
      .patch(`product/image/` + id + `/` + productImageId, body)
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => {
        reject(e);
      });
  });
};
// Remove Image For Product By Id
export const deleteProductImageByProductImageId = (id, productImageId) => {
  return new Promise(async (resolve, reject) => {
    await request
      .delete(`product/image/` + id + `/` + productImageId)
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

// Users API
export const getUsersList = (data) => {
  return new Promise(async (resolve, reject) => {
    await request
      .get(`/user`, { params: data })
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => {
        reject(e);
      });
  });
};
export const getUsersDetailsById = (id) => {
  return new Promise(async (resolve, reject) => {
    await request
      .get(`user/` + id)
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => {
        reject(e);
      });
  });
};
export const editUsersDetailsById = (id, body) => {
  return new Promise(async (resolve, reject) => {
    await request
      .put(`user/` + id, body)
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => {
        reject(e);
      });
  });
};
export const deleteUsers = (id) => {
  return new Promise(async (resolve, reject) => {
    await request
      .delete(`user/` + id)
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => {
        reject(e);
      });
  });
};
