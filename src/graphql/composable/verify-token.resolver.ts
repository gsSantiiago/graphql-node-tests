import * as jwt from "jsonwebtoken";

import * as dotenv from 'dotenv';

import { GraphQLFieldResolver } from "graphql";

import { ComposableResolver } from "./composable.resolver";

import { ResolverContext } from "../../interfaces/ResolverContextInterface";


export const verifyTokenResolver : ComposableResolver<any, ResolverContext> =
    (resolver: GraphQLFieldResolver<any, ResolverContext>): GraphQLFieldResolver<any, ResolverContext> => {

        return (parent, args, context: ResolverContext, info) => {

            const token: string = context.authorization ? context.authorization.split(' ')[1] : undefined;

            dotenv.config();

            return jwt.verify(token, process.env.JWT_SECRET, (err, decoded: any) => {

                if (!err){
                    return resolver(parent, args, context, info);
                }

                throw new Error(`${err.name} : ${err.message}`);

            });

        };

    };