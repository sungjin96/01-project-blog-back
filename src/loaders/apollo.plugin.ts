import Logger from './logger';

export const logging = {

    requestDidStart(requestContext) {
        // Logger.info('Request started! Query:\n' +
        //     requestContext.request.query);

        return {
            parsingDidStart(requestContext) {
            },

            validationDidStart(requestContext) {
            }

        }
    },
};