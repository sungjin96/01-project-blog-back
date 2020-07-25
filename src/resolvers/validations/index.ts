import {UseMiddleware} from "type-graphql";

export default function ValidateArgs<T extends object>(schema: any) {
    return UseMiddleware(async ({ args }, next) => {
        // here place your validation logic, e.g. based on schema using joi
        args || await schema.validate(args);
        return next();
    });
}