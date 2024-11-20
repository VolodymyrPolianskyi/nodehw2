const Ajv = require('ajv')
const ajv = new Ajv()

const schema = {
    type: "object",
    properties: {
        title: {type: "string", maxLength: 50},
        text: {type: "string", maxLength: 256},
        genre: {type: "string",enum: ['Politic', 'Business', 'Sport', 'Other']},
        isPrivate: {type: "boolean"}
    },
    required: ['title', 'text','genre','isPrivate'],
    additionalProperties: false
}

const validatePost = ajv.compile(schema)

module.exports = {
    validatePost
}