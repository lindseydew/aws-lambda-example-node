import { CreateTableCommand } from "@aws-sdk/client-dynamodb"


export const createTableExampleOne = () => {
    return new CreateTableCommand({
        TableName : "ExampleOne",
        KeySchema: [
            { AttributeName: "userId", KeyType: "HASH"},  //Partition key
            { AttributeName: "item", KeyType: "RANGE"}
        ],
        AttributeDefinitions: [
            { AttributeName: "userId", AttributeType: "S" },
            { AttributeName: "item", AttributeType: "S" }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    })
}

export const createTableExampleTwo = () => {
    return new CreateTableCommand({
        TableName : "ExampleTwo",
        KeySchema: [
            { AttributeName: "userId", KeyType: "HASH"},  //Partition key
        ],
        AttributeDefinitions: [
            { AttributeName: "userId", AttributeType: "S" },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    })
}
