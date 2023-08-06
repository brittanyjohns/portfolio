import { v4 as uuidv4 } from "uuid";
const EVENT_ID_KEY = "vht_event_id";
const EVENT_ID_REGEX_KEY = new RegExp(EVENT_ID_KEY, "g");
const ATTRIBUTES_WHITELIST = [
  EVENT_ID_KEY,
  "user_id",
  "userId",
  "username",
  "cognito:username",
  "sub",
  "id",
  "organization_id",
  "organizationId",
  "eventType",
  "detail-type",
  "eventName",
  "field",
  "issuer",
  "dataSetTemplateId",
  "created_at",
  "updated_at",
  "call_id",
  "client_id",
  "source_env",
  "confirmedAt",
  "updatedAt",
  "appointmentAt",
  "timeToExpire",
];

export const addEventId = (payload: string) => {
  if (!payload.match(EVENT_ID_REGEX_KEY) && isJson(payload)) {
    const parsedPayload = JSON.parse(payload);
    const value = uuidv4();
    parsedPayload[EVENT_ID_KEY] = value;
    payload = JSON.stringify(parsedPayload);
  }
  return payload;
};

export const isJson = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const logEvent = (event: any, data: Record<any, any>) => {
  const output = JSON.stringify(eventDataToLog(event, data), null, " ");
  console.log("EVENT - ", output);
  return output;
};

export const eventDataToLog = (event: any, data: Record<string, any>) => {
  console.log(`eventDataToLog`);
  return {
    ...keysToLog(event),
    ...data,
  };
};

export const attributesToLog = (attributes: any) => {
  const argsToLog: Record<string, any> = {};
  ATTRIBUTES_WHITELIST.forEach((arg: string | number) => {
    if (attributes[arg]) {
      argsToLog[arg] = attributes[arg];
    }
  });
  return argsToLog;
};

export const keysToLog = (data: Record<any, any>) => {
  try {
    for (const [key, value] of Object.entries(data)) {
      if (value === null) {
        data[key] = undefined;
      } else if (typeof value === "object") {
        keysToLog(value);
      } else {
        if (typeof value === "string" && value.length > 0) {
          if (!ATTRIBUTES_WHITELIST.includes(key)) {
            data[key] = undefined;
          }
        }
      }
    }
  } catch (error) {
    console.error(`Unable to log payload | Error: ${error}`);
    throw error;
  }
  return data;
};

// get diff in time and return substring of ISO time (HH:MM:SS)
export const getDuration = (startTime: string | number) => {
  const diff = new Date().getTime() - new Date(startTime).getTime();
  return new Date(diff).toISOString().substr(11, 8);
};

// run a promise within a given period of time
export const promiseTimeout = (
  ms: number,
  promise: Promise<any>
): Promise<any> => {
  let id: ReturnType<typeof setTimeout>;
  const timeout = new Promise((resolve, reject) => {
    id = setTimeout(() => reject(new Error("[promisetimeout]")), ms);
  });

  // Returns a race between our timeout and the passed in promise
  return Promise.race([promise, timeout]).then(() => clearTimeout(id));
};

// return timeout as a promise
export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// leading zero padding function
export const zeroPad = (num: number, places: number): string => {
  return String(num).padStart(places, "0");
};
