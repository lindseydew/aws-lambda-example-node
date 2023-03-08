import { DynamoDBClient, ListTablesCommand, ListTablesCommandOutput } from "@aws-sdk/client-dynamodb";
import { createTableExampleOne, createTableExampleTwo } from "./createTable";
import { getCommandExampleTwo, putCommandsExampleTwo, updateCommandExampleTwo } from "./queryTable";

const tableNotExists: (existingTables: ListTablesCommandOutput, tableName: string) => boolean = (exisitingTables, tableName) => {
    return !exisitingTables.TableNames?.find(r => r === tableName)
}

(async() => {
    const dynamodbClient = new DynamoDBClient({ endpoint: 'http://localhost:8000', region: 'local'});

    const existingTables = await dynamodbClient.send(new ListTablesCommand({}))

    if(tableNotExists(existingTables, 'ExampleOne')) {
        console.log("Creating table ExampleTwo") 
        await dynamodbClient.send(createTableExampleOne())
    }

    if(tableNotExists(existingTables, 'ExampleTwo')) {
        console.log("Creating table ExampleTwo") 
        await dynamodbClient.send(createTableExampleTwo())
    }


    await dynamodbClient.send(putCommandsExampleTwo)

    const result = await dynamodbClient.send(getCommandExampleTwo)

    console.log(result)

    await dynamodbClient.send(updateCommandExampleTwo)

    const updatedResult = await dynamodbClient.send(getCommandExampleTwo)

    console.log(updatedResult)


    
})()

