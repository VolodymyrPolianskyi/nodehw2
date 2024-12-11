import Ajv from 'ajv'
const ajv = new Ajv()

const schema = {
    type: "object",
    properties: {
        header: {type: "string", maxLength: 50},
        text: {type: "string", maxLength: 256}
    },
    required: ['header', 'text'],
    additionalProperties: false
}

export const validatePost = ajv.compile(schema)

