import {ObjectId} from "mongodb";

export class UserDto {
    email: string;
    isVerified: boolean;
    roles: string[];
    createdAt: Date;
    updatedAt: Date;
    _id: ObjectId

    constructor(model: { email: string, isVerified: boolean, roles: string[], createdAt: Date, updatedAt: Date, _id: ObjectId}) {
        this.email = model.email;
        this.isVerified = model.isVerified;
        this.roles = model.roles;
        this.createdAt = model.createdAt;
        this.updatedAt = model.updatedAt;
        this._id = model._id
    }
}