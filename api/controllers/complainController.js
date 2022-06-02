const httpStatus = require("http-status")

const viewAllComplain = (req, res) => {
    return res.status(httpStatus.OK).json({
        message: "view all complain",
        data: null,
        responseCode: httpStatus.OK
    });    
}

const createComplain = (req, res) => {
    return res.status(httpStatus.CREATED).json({
        message: "create complain",
        data: null,
        responseCode: httpStatus.OK
    });   
}

const viewComplain = (req, res) => {
    return res.status(httpStatus.OK).json({
        message: "view a complain",
        data: null,
        responseCode: httpStatus.OK
    });   
}

const deleteComplain = (req, res) => {
    return res.status(httpStatus.OK).json({
        message: "delet a complain",
        data: null,
        responseCode: httpStatus.OK
    });
}

const editComplain = (req, res) => {
    return res.status(httpStatus.OK).json({
        message: "edit a complain",
        data: null,
        responseCode: httpStatus.OK
    });  
}

module.exports = {
    viewAllComplain,
    createComplain,
    viewComplain,
    deleteComplain,
    editComplain
}