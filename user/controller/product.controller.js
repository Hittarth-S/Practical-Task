const Product = require("../../models/product.model");

const { uploadImage } = require("../../helpers/uploadFile.helper");

/* PRODUCT RELATED CONTROLLERS */
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

