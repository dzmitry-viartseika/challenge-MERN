import {ApiError} from "../exceptions/apiError";

const errorMiddleWare =  (err: any, req: any, res: any, next: any) => {
    if (err instanceof ApiError) {
        return res.status(err.status).json({
            message: err.message,
            errors: err.errors,
        })
    }

    return res.status(500).json({
        message: 'Something went wrong'
    })
};

export default errorMiddleWare;