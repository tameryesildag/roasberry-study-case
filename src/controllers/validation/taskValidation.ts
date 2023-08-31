import { object, string, number, date, InferType } from 'yup';

const taskSchema = object({
    title: string().required(),
    description: string().required(),
    dueDate: date().required()
});

export default taskSchema;