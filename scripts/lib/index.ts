/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { getDuration, sleep, zeroPad, isJson } from "../../common/utils";
import { getObject } from "../../common/s3";
import fs from "fs";
import { S3 } from "aws-sdk";

export const s3 = new S3();
const NUM_OF_EVENTS = 3;
const TEST_TIME = 700;

export const listAllContents = async (bucket: string, prefix: string) => {
  // repeatedly calling AWS list objects because it only returns 1000 objects
  let list: S3.ObjectList = [];
  let shouldContinue = true;
  let nextContinuationToken;
  let count = 0;
  while (shouldContinue) {
    count++;
    let results: S3.ListObjectsV2Output;
    results = await listAllObjects(bucket, prefix, nextContinuationToken);

    if (results.Contents && results.Contents.length > 0) {
      list = [...list, ...results.Contents];
    }

    console.log(`\n==== Batch #${count}|items: ${results.KeyCount} ====\n`);

    if (count > 10) {
      shouldContinue = false;
    }

    if (!results.IsTruncated) {
      shouldContinue = false;
      nextContinuationToken = null;
    } else {
      nextContinuationToken = results.NextContinuationToken;
    }
  }
  return list;
};
export const pollBucket = async (
  bucketToPoll: string,
  key: string,
  payload: string,
  startTime: string,
  testIds: string[]
) => {
  try {
    const parsedPayload = JSON.parse(payload);
    let eventType = "";
    if (parsedPayload.eventType === "Cognito") {
      eventType = "cognito/";
    } else if (parsedPayload.eventType === "DynamoDBStream") {
      eventType = "dynamodb/";
    } else if (parsedPayload.eventType === "GraphQL") {
      eventType = "appsync/";
    } else if (parsedPayload.eventType === "config") {
      eventType = "config/";
    } else if (parsedPayload.eventType === "call") {
      eventType = "calls/";
    }
    console.log(`Event Type: ${eventType} `);
    if (key.includes("sdx/")) {
      key = "feedback/";
    }

    let prefix = key;

    // set prefix using current date and uuid
    if (eventType === "") {
      prefix =
        key +
        `${new Date(startTime).getUTCFullYear()}/` +
        `${zeroPad(new Date(startTime).getUTCMonth() + 1, 2)}/` +
        `${zeroPad(new Date(startTime).getUTCDate(), 2)}/` +
        `${zeroPad(new Date(startTime).getUTCHours(), 2)}/`;
    } else {
      prefix =
        key +
        eventType +
        `${new Date(startTime).getUTCFullYear()}/` +
        `${zeroPad(new Date(startTime).getUTCMonth() + 1, 2)}/` +
        `${zeroPad(new Date(startTime).getUTCDate(), 2)}/` +
        `${zeroPad(new Date(startTime).getUTCHours(), 2)}/`;
    }

    console.log(`polling from: ${bucketToPoll}/${prefix}`);
    const poll = async () => {
      let success = false;
      let stopTest = false;
      // make request to list objects in the s3 path
      const results = await listAllContents(bucketToPoll, prefix);
      console.log(
        `Polling s3 bucket: ${bucketToPoll}/${prefix}| Record Count: ${results.length}`
      );

      let finalTestResults: any[] = [];
      const foundIds: Record<string, any> = {};
      const foundResults: any[] = [];
      if (results.length !== 0) {
        console.log(
          `[${getDuration(startTime)}] Results from masked bucket, found ${
            results.length
          } files.`
        );
        try {
          await Promise.all(
            results.map(async (object) => {
              const results = await getObject(bucketToPoll, object.Key!);
              const body = results.Body!.toString();
              const eventRecords = body.split("}{");

              const objectInfo: Record<any, any> = (foundIds[
                object.Key!.substring(55, 78)
              ] = {});
              objectInfo["LastModified"] = object.LastModified;
              objectInfo["Size"] = object.Size;

              for (let [_idx, eventRecord] of Object.entries(eventRecords)) {
                const record = cleanEvent(eventRecord);
                if (!isJson(record)) {
                  console.log(`${_idx} BAD Payload: ${record}`);
                  continue;
                }
                const parsedEvent = JSON.parse(record);
                const eventDetail = parsedEvent.detail;
                const eventTestId = eventDetail.test_id;

                if (testIds.includes(eventTestId)) {
                  objectInfo[eventTestId] = eventTestId;

                  foundResults.push(eventTestId);
                  console.log(
                    `[${getDuration(startTime)}] (${
                      foundResults.length
                    } of ${NUM_OF_EVENTS}) *** EVENT RECORD FOUND ***\n===> ${eventTestId}`
                  );
                  if (foundResults.length === NUM_OF_EVENTS) {
                    stopTest = true;
                    success = true;
                    break;
                  }
                }
              }
              if (foundResults.length !== 0) {
                return foundResults;
              } else {
                return false;
              }
            })
          ).then((values) => {
            return values.forEach((value) => {
              if (value) finalTestResults.push(value);
            });
          });
        } catch (e) {
          console.error(`Error: ${e}`);
        }
      }
      // sleep 1 seconds
      await sleep(1000);
      const duration = getDuration(startTime);
      const durationx = duration.split(":");
      let n = `${durationx[1]}${durationx[2]}`;

      const testTime = parseInt(n);
      const timesUp = testTime >= TEST_TIME;

      if (stopTest || timesUp) {
        if (success) {
          logResults(
            `== SUCCESS:\nPrefix: ${prefix}
            \nFound Events: ${JSON.stringify(
              foundIds,
              null,
              " "
            )}\nRESULTS:\n${JSON.stringify(finalTestResults, null, " ")}`,
            `${new Date()}  [${getDuration(startTime)}] `
          );
          return process.exit();
        } else {
          logResults(
            `FAIL:\nPrefix: ${prefix} - Last Modified: ${
              foundIds["LastModified"]
            }\nTEST IDs:\n${testIds.join("\n")}\nFOUND IDs: ${JSON.stringify(
              foundIds,
              null,
              " "
            )}\nRESULTS:\n${JSON.stringify(finalTestResults, null, " ")}`,
            `${new Date()}  [${getDuration(startTime)}] `
          );
          return process.exit(1);
        }
      } else {
        // show polling message
        console.log(
          `[${getDuration(startTime)}] Polling masked bucket, found ${
            results.length
          } files but no matches...`
        );
        // self invoke
        await poll();
      }
      console.log(
        `[${getDuration(startTime)}] Something went wrong. found ${
          results.length
        } files but no matches...`
      );
      return process.exit(1);
    };

    // return invoked function to start polling
    await poll();
  } catch (e) {
    console.log(
      `[${getDuration(startTime)}] Something went wrong. ERROR: ${e}`
    );
    return process.exit(1);
  }
  console.log(
    `[${getDuration(startTime)}] Something went wrong. Unknown error.`
  );
  return process.exit(1);
};

export const listAllObjects = async (
  Bucket: string,
  Prefix: string,
  nextContinuationToken: string | undefined | null
): Promise<S3.ListObjectsV2Output> => {
  const params: S3.ListObjectsV2Request = {
    Bucket,
    Prefix,
    ContinuationToken: nextContinuationToken || undefined,
    MaxKeys: 500,
  };

  try {
    return await s3.listObjectsV2(params).promise();
  } catch (error) {
    console.log(`ERROR: ${error}`);
    throw error;
  }
};

export const logResults = (content: string, duration?: string) => {
  duration = duration ? duration : new Date().toISOString();
  console.log(`${duration} | ${content}`);
  fs.writeFile(
    "test.txt",
    `\n${duration} | ${content}`,
    { flag: "a+" },
    (err: any) => {
      if (err) {
        console.error(err);
        return;
      }
    }
  );
};

export const cleanEvent = (eventRecord: string) => {
  if (!isJson(eventRecord)) {
    if (eventRecord.slice(-1) !== "}") {
      eventRecord = `${eventRecord}}`;
    }
    if (eventRecord.slice(0, 1) !== "{") {
      eventRecord = `{${eventRecord}`;
    }
    let open_count = (eventRecord.match(/{/g) || []).length;
    let close_count = (eventRecord.match(/}/g) || []).length;
    if (open_count > close_count) {
      eventRecord = `${eventRecord}}`;
    }
  }
  return eventRecord;
};
