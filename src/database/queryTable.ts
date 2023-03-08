import { GetItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";

const itemsv1 = [
    {
        "name": "football",
        "position": 1
    },
    {
        "name": "sport",
        "position": 2
    },
    {
        "name": "hello",
        "position": 3
    }
]

const itemsv2 = [
    {
        "name": "football",
        "position": 1
    },
    {
        "name": "sport",
        "position": 3
    },
    {
        "name": "hello",
        "position": 2
    }

]
const tableName = 'ExampleTwo'

export const putCommandsExampleTwo = new PutItemCommand({
    TableName: tableName,
    Item: {
        "userId": {
            S: "1"
        },
        "item": {
            S: JSON.stringify(itemsv1)
        }
    }  
})

export const getCommandExampleTwo  = new GetItemCommand({
    TableName: tableName,
    Key: {
        'userId': {
            S: '1'
        }
    }
})

export const updateCommandExampleTwo = new PutItemCommand({
    TableName: tableName, 
    Item: {
        "userId": {
            S: "1"
        },
        "item": {
            S: JSON.stringify(itemsv2)
        }
    } 

})