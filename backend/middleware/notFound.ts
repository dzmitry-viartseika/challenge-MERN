import {Request, Response} from "express";
import {ResponseStatus} from "../ts/enums/ResponseStatus";
const notFoundMiddleWare = (request: Request, response: Response) => {
    response.status(ResponseStatus.NOT_FOUND).send('Route does not exist')
}

export default notFoundMiddleWare;