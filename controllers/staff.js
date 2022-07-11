const Staff = require('../models/staff')
const respond = require('../util/respond')
const bcrypt = require('bcrypt')

const emailAvailability = async (req, res) => {
  try {
    const { email } = req.body
    const staff = await Staff.findOne({ email: email })
    if (staff) {
      return respond.data(res, 'false')
    } else {
      return respond.data(res, 'true')
    }
  } catch (error) {
    return respond.errorWithMessage(res, error)
  }
}

const allStaff = async (req, res) => {
  try {
    const staffs = await Staff.find({
      organization_id: req.user.organization_id,
    })
    let StaffList = []
    staffs.map((staff) => {
      let newStaff = staff.toObject()
      if (newStaff.role_type === 8585) {
        newStaff.role_type = 'Supervisor'
        StaffList.push(newStaff)
      } else {
        newStaff.role_type = 'Staff'
        StaffList.push(newStaff)
      }
    })
    return respond.data(res, StaffList)
  } catch (error) {
    return respond.errorWithMessage(res, error)
  }
}

const create = async (req, res) => {
  try {
    const saltRounds = 10
    const isHash = await bcrypt.hash(req.body.password, saltRounds)
    const staff = new Staff({
      ...req.body,
      password: isHash,
      organization_id: req.user.organization_id,
    })
    const staffResponse = await staff.save()
    if (staffResponse) {
      respond.data(res, staffResponse)
    } else {
      return respond.errorWithMessage(res, 'Error in staff data!')
    }
  } catch (error) {
    return respond.errorWithMessage(res, error)
  }
}

const update = async (req, res) => {
  try {
    const saltRounds = 10
    const isHash = await bcrypt.hash(req.body.password, saltRounds)
    const organization_id = req.user.organization_id
    const _id = req.params.id
    const response = await Staff.findOneAndUpdate(
      { _id, organization_id },
      { ...req.body, password: isHash },
      { new: true },
    )
    if (response) {
      return respond.data(res, response)
    } else {
      return respond.data(res, response)
    }
  } catch (error) {
    return respond.errorWithMessage(res, error)
  }
}

const destroy = async (req, res) => {
  try {
    const organization_id = req.user.organization_id
    const _id = req.params.id
    const response = await Staff.findOneAndDelete({
      $and: [{ _id }, { organization_id }],
    })
    if (response) {
      return respond.data(res, 'Staff deleted!')
    } else {
      return respond.notFoundWithMessage(res, 'Staff not found!')
    }
  } catch (error) {
    return respond.errorWithMessage(res, error)
  }
}

module.exports = { emailAvailability, create, update, destroy, allStaff }
