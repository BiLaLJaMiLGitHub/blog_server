const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.user?.role) return res.sendStatus(401)
    const rolesArray = [...allowedRoles]
    const roles = [req.user.role]
    const result = roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true)
    if (!result) return res.sendStatus(401)
    next()
  }
}

module.exports = verifyRoles
