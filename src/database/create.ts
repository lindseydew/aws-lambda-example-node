import { CreateTableCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb"


(async() => {
    const dynamodbClient = new DynamoDBClient({ endpoint: 'http://localhost:8000', region: 'local'});
    const createTable = new CreateTableCommand({
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

    try {
        const result = await dynamodbClient.send(createTable)
        console.log(result)
    } catch (err) {
        console.log(err)
    }
})()

