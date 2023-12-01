import {Roles} from "../../ts/enums/Roles";


export const authorizationAdminAccessMiddleWare = (req: any, res: any, next: any) => {
    if (req.user.role === Roles.ADMIN) {
        next()
    } else {
        res.redirect('/')
    }
}