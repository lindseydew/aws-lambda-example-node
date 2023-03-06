/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
import { 
    APIGatewayProxyEvent,
    APIGatewayProxyResult } 
  from "aws-lambda/trigger/api-gateway-proxy";
import { Context } from 'aws-lambda'

export const lambdaHandler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    const name = event.pathParameters && event.pathParameters['name']
    const foo = event.queryStringParameters && event.queryStringParameters['foo']
    return {
        'statusCode': 200,
        'body': `hello ${name}, params: ${foo}`
    }
    
};
