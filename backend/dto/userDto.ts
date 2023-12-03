import {ObjectId} from "mongodb";

export class UserDto {
    email: string;
    isVerified: boolean;
    role: string;
    language: string;
    timeZone: string;
    createdAt: Date;
    updatedAt: Date;
    _id: ObjectId;

    constructor(model: {
        email: string;
        isVerified: boolean;
        role: string;
        timeZone: string;
        language: string;
        createdAt: Date;
        updatedAt: Date;
        _id: ObjectId;
    }) {
        const {
            email,
            isVerified,
            role,
            timeZone,
            language,
            createdAt,
            updatedAt,
            _id,
        } = model;

        this.email = email;
        this.isVerified = isVerified;
        this.role = role;
        this.timeZone = timeZone;
        this.language = language;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this._id = _id;
    }
}