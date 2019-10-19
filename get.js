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
    const result = await dynamoDbLib.call("get", params);
    if (result.Item) {
      return success(result.Item);
    } else {
      return failure({ status: false, e: "Item not found." });
    }
  } catch (e) {
    failure({ status: false, e });
  }
}
