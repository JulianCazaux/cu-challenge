<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

RESTful API developed with [Nest](https://github.com/nestjs/nest) framework in Typescript for [CookUnity](https://www.cookunity.com/) Engineer Coding Challenge.

## Manual Installation

```bash
$ npm install
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Or build & run with Docker

```bash
docker-compose up --build
```

## Demo

Deployed PostgreSQL using AWS RDS. But could not finish deployment to AWS Lambda (and API Gateway) because of an error loading "Prisma Client" which I will continue trying to solve.

This is API Gateway log with the error:

```
Wed Jun 05 19:31:05 UTC 2024 : Sending request to https://lambda.sa-east-1.amazonaws.com/2015-03-31/functions/arn:aws:lambda:sa-east-1:211125630558:function:cookunity-api-production-api/invocations
Wed Jun 05 19:31:06 UTC 2024 : Received response. Status: 200, Integration latency: 426 ms
Wed Jun 05 19:31:06 UTC 2024 : Endpoint response headers: {Date=Wed, 05 Jun 2024 19:31:06 GMT, Content-Type=application/json, Content-Length=982, Connection=keep-alive, x-amzn-RequestId=7097a698-d600-46fe-b5bc-38df32f3c557, X-Amz-Function-Error=Unhandled, x-amzn-Remapped-Content-Length=0, X-Amz-Executed-Version=$LATEST, X-Amzn-Trace-Id=root=1-6660bcf9-027e50c6c72ac166edbf23cd;parent=4f450fe1d12b3092;sampled=0;lineage=01a1bf8f:0}
Wed Jun 05 19:31:06 UTC 2024 : Endpoint response body before transformations: {"errorType":"Runtime.ImportModuleError","errorMessage":"Error: Cannot find module '.prisma/client/default'\nRequire stack:\n- /var/task/node_modules/@prisma/client/default.js\n- /var/task/dist/src/prisma/prisma.service.js\n- /var/task/dist/src/prisma/prisma.module.js\n- /var/task/dist/src/app.module.js\n- /var/task/dist/serverless.js\n- /var/runtime/index.mjs","trace":["Runtime.ImportModuleError: Error: Cannot find module '.prisma/client/default'","Require stack:","- /var/task/node_modules/@prisma/client/default.js","- /var/task/dist/src/prisma/prisma.service.js","- /var/task/dist/src/prisma/prisma.module.js","- /var/task/dist/src/app.module.js","- /var/task/dist/serverless.js","- /var/runtime/index.mjs","    at _loadUserApp (file:///var/runtime/index.mjs:1087:17)","    at async UserFunction.js.module.exports.load (file:///var/runtime/index.mjs:1119:21)","    at async start (file:///var/runtime/index.mjs:1282:23)","    at async file:///var/runtime/index.mjs:1288 [TRUNCATED]
Wed Jun 05 19:31:06 UTC 2024 : Lambda execution failed with status 200 due to customer function error: Error: Cannot find module '.prisma/client/default'
Require stack:
- /var/task/node_modules/@prisma/client/default.js
- /var/task/dist/src/prisma/prisma.service.js
- /var/task/dist/src/prisma/prisma.module.js
- /var/task/dist/src/app.module.js
- /var/task/dist/serverless.js
- /var/runtime/index.mjs. Lambda request id: 7097a698-d600-46fe-b5bc-38df32f3c557
Wed Jun 05 19:31:06 UTC 2024 : Method completed with status: 502
```

## API Documentation

API has been documented using [Swagger](https://swagger.io/).

[WIP] Access deployed version at [???](http://...) 

Or if running locally: [http://localhost:3000/api](http://localhost:3000/api)

## Test

Some Unit test where written for card.controller, for the following endpoints:

- create (POST)
- findOne (GET)

```bash
# unit tests
$ npm run test
```
