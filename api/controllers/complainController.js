const httpStatus = require("http-status")
const complainModel = require('./../models').complain;

const viewAllComplain = (req, res) => {
    complainModel.findAll()
    .then((response) => {
        return res.status(httpStatus.OK).json({
            message: "view all complain",
            data: response,
            responseCode: httpStatus.OK
        });
    })
    .catch((error) => {
        console.error(error)
        return res.status(httpStatus.BAD_REQUEST).json({
            message: "Something went wrong",
            data: error,
            responseCode: httpStatus.BAD_REQUEST
        });
    });
}

const createComplain = (req, res) => {
    complainModel.create(req.body)
    .then((response) => {
        return res.status(httpStatus.CREATED).json({
            message: "complain created successfully",
            data: response,
            responseCode: httpStatus.CREATED
        }); 
    })
    .catch((error) => {
        console.error(error)
        return res.status(httpStatus.BAD_REQUEST).json({
            message: "Something went wrong",
            data: error,
            responseCode: httpStatus.BAD_REQUEST
        });
    }) 
}

const viewComplain = (req, res) => {
    const { id } = req.params;

    complainModel.findOne({
        where: {
            id
        }
    })
    .then((response) => {
        return res.status(httpStatus.OK).json({
            message: "view a complain",
            data: response,
            responseCode: httpStatus.OK
        });  
    })
    .catch((error) => {
        console.error(error)
        return res.status(httpStatus.BAD_REQUEST).json({
            message: "Something went wrong",
            data: error,
            responseCode: httpStatus.BAD_REQUEST
        });
    }) 
}

const deleteComplain = (req, res) => {
    const { id } = req.params;
    complainModel.destroy({
        where: {
            id
        },
        returning: true
    })
    .then((response) => {
        return res.status(httpStatus.OK).json({
            message: "delet a complain",
            data: response,
            responseCode: httpStatus.OK
        });
    })
    .catch((error) => {
        console.error(error)
        return res.status(httpStatus.BAD_REQUEST).json({
            message: "Something went wrong",
            data: error,
            responseCode: httpStatus.BAD_REQUEST
        });
    })
}

const editComplain = (req, res) => {
    const { id } = req.params;
    complainModel.update(req.body,{
        where: {
            id
        },
        returning: true,
    })
    .then((response) => {
        return res.status(httpStatus.OK).json({
            message: "edit a complain",
            data: response[1][0],
            responseCode: httpStatus.OK
        }); 
    })
    .catch((error) => {
        console.error(error)
        return res.status(httpStatus.BAD_REQUEST).json({
            message: "Something went wrong",
            data: error,
            responseCode: httpStatus.BAD_REQUEST
        });
    })
}

module.exports = {
    viewAllComplain,
    createComplain,
    viewComplain,
    deleteComplain,
    editComplain
}