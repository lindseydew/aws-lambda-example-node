"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lambdaHandler = void 0;
const lambdaHandler = async (event, context) => {
    const name = event.pathParameters && event.pathParameters['name'];
    const foo = event.queryStringParameters && event.queryStringParameters['foo'];
    return {
        'statusCode': 200,
        'body': `hello ${name}, params: ${foo}`
    };
};
exports.lambdaHandler = lambdaHandler;
//# sourceMappingURL=app.js.map