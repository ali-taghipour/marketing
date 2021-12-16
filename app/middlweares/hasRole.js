module.exports = (needRoles) => async (req, res, next) => {
    const roles = {
        "advertiser": "733a4d01-163d-4728-9c36-2c988c4b0b47",
        "marketer": "88aabc9e-49c3-4e58-89b8-ecd42e05cb48",
        "user": "45669204-9842-4747-b7b1-9dd58e718779",
    }
    if (needRoles.includes('admin') && req.user.role == "admin") {
        return next()
    }
    const result = [];
    needRoles.forEach((role) => {
        roles[role] == req.user.role_id ? result.push(true) : result.push(false)
    });
    if (result.includes(true)) {
        return next()
    }
    return next(
        new Error(
            "not authorized you don't have the proper roles to access this resource"
        )
    );
};
