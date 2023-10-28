const Product = require("../../models/product.model");

const { uploadImage } = require("../../helpers/uploadFile.helper");

/* PRODUCT RELATED CONTROLLERS */
// Add New Product
module.exports.addProduct = async (request, response, next) => {
    try {
        const { name, description, price, user } = request.body;


        const checkProduct = await Product.findOne({
            name,
            isDeleted: false,
        });
        if (checkProduct) {
            return response.status(409).json({
                status: false,
                message: "Your Product Is Already Registered",
                data: null,
            });
        }

        const newProduct = await Product.create({
            name,
            description,
            price,
            addedBy: user._id,
        });

        if (!newProduct) {
            return response.status(400).json({
                status: false,
                message: "Error While Adding Product",
                data: null,
            });
        }

        return response.status(200).json({
            status: true,
            message: "Product Added Successfully",
            data: newProduct?._id,
        });
    } catch (error) {
        console.error(
            "Server Error at admin/controller/product.controller in addProduct ==> Error : ",
            error
        );
        return response.status(500).json({
            status: false,
            message: "Server Error! Failed to add product details",
            data: null,
        });
    }
};

// Update Product
module.exports.updateProduct = async (request, response, next) => {
    try {
        const { name, description, price, user, status } =
            request.body;

        const { id } = request.params;

        const checkProduct = await Product.findOne({
            isDeleted: false,
            _id: id,
        });
        if (!checkProduct) {
            return response.status(409).json({
                status: false,
                message: "Product Not Found",
                data: null,
            });
        }


        const updateProduct = await Product.findByIdAndUpdate(
            { _id: id },
            {
                name,
                description,
                price,
                user,
                status,
                addedBy: user._id,
            },
            { new: true }
        );

        if (!updateProduct) {
            return response.status(400).json({
                status: false,
                message: "Error While Update Product",
                data: null,
            });
        }

        return response.status(200).json({
            status: true,
            message: "Product Updated Successfully",
            data: updateProduct?._id,
        });
    } catch (error) {
        console.error(
            "Server Error at admin/controller/product.controller in updateProduct ==> Error : ",
            error
        );
        return response.status(500).json({
            status: false,
            message: "Server Error! Failed to update product details",
            data: null,
        });
    }
};

// Get All Products List
module.exports.getProduct = async (request, response, next) => {
    try {
        const { page, sizePerPage, status, search } = request.query;
        let options = {
            page,
            limit: sizePerPage,
            sort: { createdAt: -1 },
            populate: { path: "addedBy" },
        };

        let query = {
            isDeleted: false,
        };
        if (search) {
            query = {
                $or: [{ name: { $regex: search } }, { description: { $regex: search } }],
                isDeleted: false,
            };
        }
        if (status) {
            query.status = status;
        }

        const ProductList = await Product.paginate(query, options);

        if (!ProductList) {
            return response.status(400).json({
                status: false,
                message: "Error While Get Product List",
                data: null,
            });
        }

        return response.status(200).json({
            status: true,
            message: "Product List Get Successfully",
            data: ProductList,
        });
    } catch (error) {
        console.error(
            "Server Error at admin/controller/product.controller in getProduct ==> Error : ",
            error
        );
        return response.status(500).json({
            status: false,
            message: "Server Error! Failed to get products list",
            data: null,
        });
    }
};

// Get Product Details By Id
module.exports.getProductById = async (request, response, next) => {
    try {
        const { id } = request.params;

        const productDetails = await Product.findById(id).populate({
            path: "addedBy",
        });

        if (!productDetails) {
            return response.status(400).json({
                status: false,
                message: "Error While Get Product",
                data: null,
            });
        }

        return response.status(200).json({
            status: true,
            message: "Product Details Get Successfully",
            data: productDetails,
        });
    } catch (error) {
        console.error(
            "Server Error at admin/controller/product.controller in getProductById ==> Error : ",
            error
        );
        return response.status(500).json({
            status: false,
            message: "Server Error! Failed to get product details by Id",
            data: null,
        });
    }
};

// Delete Product Details By Id
module.exports.deleteProduct = async (request, response, next) => {
    try {
        const { id } = request.params;

        const productDetails = await Product.findByIdAndUpdate(
            { _id: id },
            {
                isDeleted: true,
            },
            {
                new: true,
            }
        );

        if (!productDetails) {
            return response.status(400).json({
                status: false,
                message: "Error While Removing Product",
                data: null,
            });
        }

        return response.status(200).json({
            status: true,
            message: "Product Removed Successfully",
            data: productDetails?._id,
        });
    } catch (error) {
        console.error(
            "Server Error at admin/controller/product.controller in deleteProductById ==> Error : ",
            error
        );
        return response.status(500).json({
            status: false,
            message: "Server Error! Failed to delete product details by Id",
            data: null,
        });
    }
};


/* IMAGE RELATED CONTROLLERS */
// Upload Image For Product By Id
module.exports.addProductImage = async (request, response, next) => {
    try {

        const { id } = request.params;

        const checkProduct = await Product.findOne({
            isDeleted: false,
            _id: id,
        });
        if (!checkProduct) {
            return response.status(409).json({
                status: false,
                message: "Product Not Found",
                data: null,
            });
        }

        let fileName;

        if (request.files) {
            const { image } = request.files;
            let tempName = await uploadImage(image);

            fileName = tempName
        } else {
            return response.status(409).json({
                status: false,
                message: "Failed to Upload Image!",
                data: null,
            });
        }

        const updateProduct = await Product.findOneAndUpdate(
            { _id: id },
            {
                $push: {
                    image: { url: fileName },
                },
            },
            { new: true }
        );

        if (!updateProduct) {
            return response.status(400).json({
                status: false,
                message: "Error While Adding Product Image",
                data: null,
            });
        }

        return response.status(200).json({
            status: true,
            message: "Product Image Added Successfully",
            data: updateProduct?._id,
        });
    } catch (error) {
        console.error(
            "Server Error at admin/controller/product.controller in addProductImage ==> Error : ",
            error
        );
        return response.status(500).json({
            status: false,
            message: "Server Error! Failed to add Product Image",
            data: null,
        });
    }
};

// Update Image For Product By Id
module.exports.updateProductImage = async (request, response, next) => {
    try {

        const { id, productImageId } = request.params;

        const checkProduct = await Product.findOne({
            isDeleted: false,
            _id: id,
        });
        if (!checkProduct) {
            return response.status(409).json({
                status: false,
                message: "Product Not Found",
                data: null,
            });
        }

        let fileName;

        if (request.files) {
            const { image } = request.files;
            let tempName = await uploadImage(image);

            fileName = tempName
        } else {
            return response.status(409).json({
                status: false,
                message: "Failed to Upload Image!",
                data: null,
            });
        }

        const updateProduct = await Product.findOneAndUpdate(
            { _id: id, 'image._id': productImageId },
            { $set: { 'image.$.url': fileName } },
            { new: true },
        );

        if (!updateProduct) {
            return response.status(400).json({
                status: false,
                message: "Error While Updating Product Image",
                data: null,
            });
        }

        return response.status(200).json({
            status: true,
            message: "Product Updated Successfully",
            data: updateProduct?._id,
        });
    } catch (error) {
        console.error(
            "Server Error at admin/controller/product.controller in updateProductImage ==> Error : ",
            error
        );
        return response.status(500).json({
            status: false,
            message: "Server Error! Failed to Update Product Image",
            data: null,
        });
    }
};

// Remove Image For Product By Id
module.exports.deleteProductImage = async (request, response, next) => {
    try {
        const { id, productImageId } = request.params;

        const productDetails = await Product.findByIdAndUpdate(
            { _id: id },
            {
                $pull: {
                    image: {
                        _id: productImageId,
                    },
                },
            },
            {
                new: true,
            }
        );

        if (!productDetails) {
            return response.status(400).json({
                status: false,
                message: "Error While Removing Product Image",
                data: null,
            });
        }

        return response.status(200).json({
            status: true,
            message: "Product Image Removed Successfully",
            data: productDetails?._id,
        });
    } catch (error) {
        console.error(
            "Server Error at admin/controller/product.controller in deleteProductImage ==> Error : ",
            error
        );
        return response.status(500).json({
            status: false,
            message: "Server Error! Failed to remove Product Image",
            data: null,
        });
    }
};
