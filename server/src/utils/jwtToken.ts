import { Response } from 'express';
import { sign } from 'jsonwebtoken';

export enum GenType {
    access,
    refresh
}

interface payloadType {
    userId: number,
    tokenVersion?: number
}

export const sendRefreshToken = (res: Response, payload: payloadType, httpOnly = true) => {
    const token = genJWTToken(payload, GenType.refresh)

    res.cookie('jrt', token, {
        httpOnly: httpOnly,
        expires: new Date(Date.now() + (7 * 24 * 3600 * 1000)) //1 weeks 
    })

    return token;
}



export const genJWTToken = (payload: payloadType, genType: GenType = GenType.access) => {
    return sign({ ...payload }, genType === GenType.refresh ? (process.env.JWT_REFRESH_TOKEN || 'secret_refresh') : (process.env.JWT_ACCESS_TOKEN || 'secret_access'), {
        expiresIn: genType === GenType.access ? '15m' : '7d'
    });
}
