import {check} from 'express-validator';

export const readerValidator = ()=>{

    return[
        check('username').exists().isString().trim().withMessage('Invalid reader username.'),
        check('books').exists().isArray().custom(list=>{ return list.every(book=>typeof book === 'string')}).withMessage('Invalid book list.')
    ]
}