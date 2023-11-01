import {Request, Response, NextFunction} from "express";
const errorHandlerMiddleWare = (error: Error, request: Request, response: Response, next: NextFunction) => {
    response.status(500).json({
        message: 'There was an error'
    })
}

export default errorHandlerMiddleWare;