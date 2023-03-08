import {  DynamoDBClient,  PutItemCommand, QueryCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb"

(async() => {
    const dynamodbClient = new DynamoDBClient({ endpoint: 'http://localhost:8000', region: 'local'});

    const putCommands = ["football", "sport", "hello"].map((v, idx) => new PutItemCommand({
        TableName: 'ExampleOne',
        Item: {
            "userId": {
                S: "1"
            },
            "item": {
                S: v
            },
            "position": {
                N: idx.toString()
            }
        }  
    }))
    
    await Promise.all(putCommands.map(p => dynamodbClient.send(p)))

    const queryCommand  = new QueryCommand({
        TableName: 'ExampleOne',
        KeyConditions: {
            "userId": {
                ComparisonOperator: "EQ",
                AttributeValueList: [
                    {S : '1'}
                ]
            }
        }
    })

    const results = await dynamodbClient.send(queryCommand)
    console.log(results.Items?.map(r => JSON.stringify(r)))

    const updateCommand = new UpdateItemCommand({
        TableName: 'ExampleOne',
        Key: {
            "userId": {
                S: "1"
            },
            item: {
                S: "sport"
            }
        },
        AttributeUpdates: {
            "position": {
                Value: {
                    N: "4"
                }
            }
        }        
    })

    await dynamodbClient.send(updateCommand)

    const updatedResults = await dynamodbClient.send(queryCommand)
    console.log(updatedResults.Items?.map(r => JSON.stringify(r)))

})()