
module.exports = (req, res, next) => {
    const originalJson = res.json;

    res.json = function (data) {

        if (req.isActiveSession !== undefined) {
            data = {
                ...data,
                isActiveSession: req.isActiveSession
            };
        }
        originalJson.call(this, data);
    };

    next();
};