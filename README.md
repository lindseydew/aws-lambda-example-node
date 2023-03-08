## Getting set up:

To use the SAM CLI, you need the following tools.

* SAM CLI - [Install the SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
* Node.js - [Install Node.js 18](https://nodejs.org/en/), including the NPM package management tool.
* Docker - [Install Docker community edition](https://hub.docker.com/search/?type=edition&offering=community)

You may find these tools helpful for integrating with VSCode
- Install AWS toolkit: [Installing the AWS Toolkit for Visual Studio Code - AWS Toolkit for VS Code](https://docs.aws.amazon.com/toolkit-for-vscode/latest/userguide/setup-toolkit.html#setup-prereq)
- CodeLens
[Programmatic Language Features | Visual Studio Code ExtensionAPI](https://code.visualstudio.com/api/language-extensions/programmatic-language-features#codelens-show-actionable-context-information-within-source-code)


## Running the App

### Command line
#### Invoke calling using API Gateway
- `npm run compile && sam build && sam local start-api`
- `curl http://localhost:3000/hello/developer`
#### Invoke lambda directly
- `npm run compile && sam build`
- `sam local invoke HelloWorldFunction --event events/event.json`

### Debugging with VSCode
Make sure you have a `launch.json` file in `.vscode`
Hit the run button on the run and debug tab


### Steps for deploying
Create a zip folder:
- create a lambda on aws
- zip -r function.zip .
Upload the zip file
- `aws lambda update-function-code --function-name lindsey-delete-me --zip-file fileb://function.zip --profile mobile`
Configure the lambda to use the right handler
- `aws lambda update-function-configuration --function-name lindsey-delete-me --handler app.lambdaHandler --profile mobile --region eu-west-1`

Download dynamo locally:
https://dev.to/ajinkabeer/run-a-dynamodb-instance-locally-with-node-js-without-an-aws-account-58k6

docker run -p 8000:8000 -v $(pwd)/local/dynamodb:/data/ amazon/dynamodb-local -jar DynamoDBLocal.jar -sharedDb -dbPath /data

add 
`sudo ifconfig lo0 alias 172.16.123.1`