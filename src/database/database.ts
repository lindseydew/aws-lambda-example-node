import { DynamoDBClient, GetItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb";

abstract class Database {
    tableName: string;
    dynamoClient: DynamoDBClient;
    constructor(tableName: string, dynamoClient: DynamoDBClient) {
        this.tableName = tableName
        this.dynamoClient = dynamoClient

    }
    abstract getByUserId(userId: string): Promise<any>
    abstract updateByUserId(userId: string): Promise<void>
}


export class DatabaseV1 extends Database {
    
    constructor(tableName: string, dynamoClient: DynamoDBClient) {
        super(tableName, dynamoClient)
    }


    getByUserId(userId: string): Promise<any> {
        const queryCommand  = new QueryCommand({
            TableName: this.tableName,
            KeyConditions: {
                "userId": {
                    ComparisonOperator: "EQ",
                    AttributeValueList: [
                        {S : userId}
                    ]
                }
            }
        })
        return this.dynamoClient.send(queryCommand)
    }

    updateByUserId(userId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}