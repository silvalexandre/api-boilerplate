'use strict'

const express = require('express')
const router = express.Router()

const ru = require('../tools/router')
const Users = require('../controllers/users')

const _get = async (req, res, next) => {
  const data = await Users.find()
  return ru.data(res, data, 'users')
}
const _post = async (req, res, next) => {
  const data = await Users.create(req.body.user)
  return ru.data(res, data, '_id')
}

const _getOne = async (req, res, next) => {
  const data = await Users.findById(req.params.id)
  return ru.data(res, data, 'user')
}
const _put = async (req, res, next) => {
  const data = await Users.update(req.params.id, req.body.user)
  return ru.data(res, data)
}
const _delete = async (req, res, next) => {
  const data = await Users.remove(req.params.id)
  return ru.data(res, data)
}

router
  .route('/')
  .get(ru._jwtAuth, ru.async(_get))
  .post(ru._jwtAuth, ru.async(_post))

router
  .route('/:id')
  .get(ru._jwtAuth, ru.async(_getOne))
  .put(ru._jwtAuth, ru.async(_put))
  .delete(ru._jwtAuth, ru.async(_delete))

module.exports = router
