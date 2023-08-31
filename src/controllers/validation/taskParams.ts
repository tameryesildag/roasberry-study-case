import { object, string, number, date, InferType } from 'yup';

const paramSchema = object({
    taskId: number().required()
});

export default paramSchema;