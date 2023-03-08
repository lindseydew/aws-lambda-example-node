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
import { DatabaseV1 } from "./database/database";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const lambdaHandler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    const userId = event.pathParameters && event.pathParameters['userId']
    const dynamodbClient = new DynamoDBClient({ endpoint: 'http://172.16.123.1:8000/', region: 'local'});
    const db = new DatabaseV1("ExampleOne", dynamodbClient)
    if(userId) {
        const result = await db.getByUserId(userId)
        return {
            'statusCode': 200,
            'body': `${JSON.stringify(result)}`
        }
    }
    else {
        return {
            'statusCode': 400,
            'body': 'missing paramater userId'
        }
    }    
};
