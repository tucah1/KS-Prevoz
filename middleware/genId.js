const uuid = require('uuid')

exports.genNewLineId = function(req, res, next) {
    const newLineId = uuid.v4()
    req.newLineId = newLineId
    next()
}