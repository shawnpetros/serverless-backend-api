import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(e, ctx) {
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: e.requestContext.identity.cognitoIdentityId,
      noteId: e.pathParameters.id
    }
  };

  try {
    await dynamoDbLib.call("delete", params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
