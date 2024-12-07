import Ajv from 'ajv';
const ajv = new Ajv();
const schema = {
    type: "object",
    properties: {
        title: { type: "string", maxLength: 50 },
        text: { type: "string", maxLength: 256 }
    },
    required: ['title', 'text'],
    additionalProperties: false
};
export const validatePost = ajv.compile(schema);
