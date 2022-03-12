/*
import { Handler } from "aws-lambda";
import middy from "@middy/core";
import cors from "@middy/http-cors";
import middyJsonBodyParser from "@middy/http-json-body-parser";

export const middify = (handler: Handler) => {
  return middy(handler).use(middyJsonBodyParser()).use(cors());
};

export const formatJSONResponse = (statusCode: number, response: any): any => {
  return {
    statusCode,
    body: JSON.stringify(response),
  };
};

*/
