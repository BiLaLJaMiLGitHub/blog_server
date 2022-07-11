const setRole = (req) => {
  let userRole
  if (req.user.role === 8585 || req.user.role === 7575) {
    userRole = {
      staff_id: req.user._id,
      organization_id: req.user.organization_id,
    }
    console.log('Role: ', userRole)
    return userRole
  } else if (req.user.role === 9595) {
    userRole = { organization_id: req.user.organization_id }
    console.log('Role: ', userRole)
    return userRole
  }
}

module.exports = setRole
