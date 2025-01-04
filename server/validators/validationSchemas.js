const Joi = require('joi')

const colorSchema = Joi.object({
  color: Joi.string().required()
})

const imageSchema = Joi.object({
  id: Joi.string().required(),
  src: Joi.string().required(),
  width: Joi.number().required(),
  height: Joi.number().required(),
  x: Joi.number().optional(),
  y: Joi.number().optional()
})

const annotationSchema = Joi.object({
  id: Joi.number().required(),
  text: Joi.string().required(),
  x: Joi.number().required(),
  y: Joi.number().required(),
  width: Joi.number().required(),
  height: Joi.number().required()
})

module.exports = {
  colorSchema,
  imageSchema,
  annotationSchema
}
