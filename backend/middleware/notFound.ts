import {Request, Response} from "express";
const notFoundMiddleWare = (request: Request, response: Response) => {
    response.status(404).send('Route does not exist')
}

export default notFoundMiddleWare;