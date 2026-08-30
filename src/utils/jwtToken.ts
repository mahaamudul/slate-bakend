import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const createToken = (payload: JwtPayload, jwt_secret: string, expiresIn: SignOptions) => {

    const token = jwt.sign(payload, jwt_secret, {
        expiresIn: expiresIn
    } as SignOptions)

    return token

}


const verifyToken = (token: string, secret: string) => {
    try {
        const verifiedToken = jwt.verify(token, secret)


        return {
            success: true,
            data: verifiedToken
        }

    }
    catch (error: any) {
        return {
            success: false,
            error: error.message
        }

    }
}



export const jwtUtils = {
    createToken,
    verifyToken
}