import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

import { DbConnection } from "../../../interfaces/DbConnectionInterface";
import { UserInstance } from "../../../models/userModel";

export const tokenResolvers = {

    Mutation: {

        createToken: (parent, {email, password}, {db}: {db: DbConnection}) => {
            return db.User.findOne({
                where: {email: email},
                attributes: ['id', 'password']
            }).then((user: UserInstance) => {

                let errorMessage: string = 'Unauthorized, wrong email or password!';
                if(!user || !user.isPassword(user.get('password'), password)) { throw new Error(errorMessage); }

                const payload = {sub: user.get('id')};

                dotenv.config();

                return {
                    token: jwt.sign(payload, process.env.JWT_SECRET)
                }

            });
        }
    }
}