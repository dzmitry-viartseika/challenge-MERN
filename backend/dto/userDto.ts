import {ObjectId} from "mongodb";

export class UserDto {
    email: string;
    isVerified: boolean;
    role: string;
    language: string;
    timeZone: string;
    createdAt: Date;
    updatedAt: Date;
    _id: ObjectId

    constructor(model: { email: string, isVerified: boolean, role: string, timeZone: string, language: string, createdAt: Date, updatedAt: Date, _id: ObjectId}) {
        this.email = model.email;
        this.timeZone = model.timeZone;
        this.language = model.language;
        this.isVerified = model.isVerified;
        this.role = model.role;
        this.createdAt = model.createdAt;
        this.updatedAt = model.updatedAt;
        this._id = model._id
    }
}