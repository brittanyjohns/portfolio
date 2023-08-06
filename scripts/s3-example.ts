import { logResults, listAllContents } from "./lib";
import program from "commander";
import { getDuration } from "../common/utils";
import { copyObject } from "../common/s3";
import { IResultTotals } from "../common/types";

const MAX_BATCH_MIGRATION_SIZE = process.env.MAX_BATCH_MIGRATION_SIZE || 500;

program
  .description("")
  .version("0.0.1")
  .usage("[options]")
  .requiredOption("-s, --stage <string>", "ex. dev")
  .requiredOption("-p, --prefix <string>", "ex. callback/calls/2023")
  .requiredOption(
    "-b, --bucket <string>",
    "source bucket name (ex. waterworld-test-data)",
    "waterworld-test-data"
  )
  .requiredOption("-d, --dry_run <string>", "ex. false")
  .parse(process.argv);

const addResult = (
  type: string,
  resultTotals: IResultTotals,
  message: string,
  key = ""
) => {
  switch (type) {
    case "Failed":
      resultTotals.failedCount++;
      resultTotals.failed.push(
        `${resultTotals.failedCount}: ${key} ${message}`
      );
      break;
    case "Error":
      resultTotals.errorCount++;
      resultTotals.errors.push(`${resultTotals.errorCount}: ${key} ${message}`);
      break;
    case "Success":
      resultTotals.successfulCount++;
      resultTotals.successful.push(`${resultTotals.successfulCount}: ${key}`);
      break;
  }
  return resultTotals;
};

const migrate = async (
  stage: string,
  filePrefix: string,
  source?: string,
  dryRun?: boolean
) => {
  let resultTotals: IResultTotals = {
    processedAt: new Date().toISOString(),
    total_results: 0,
    successfulCount: 0,
    failedCount: 0,
    removedCount: 0,
    errorCount: 0,
    successful: [],
    failed: [],
    removed: [],
    errors: [],
    completedAt: "",
  };
  // const startTime = resultTotals.processedAt;
  const sourceBucket = source || `waterworld-test-data`; // Bucket with SP1 formatted test data (from waterworld dev swamp)
  const destinationBucket = `datalake-${stage}-migration`;
  const prefix = filePrefix || `callback/calls/`;

  // make request to list objects in the s3 path
  const results = await listAllContents(sourceBucket, prefix);

  let finalTestResults: any[] = [];
  const testInfo: Record<string, any> = {};
  try {
    const recordCount = results.length;
    if (recordCount > 0) {
      if (recordCount > MAX_BATCH_MIGRATION_SIZE) {
        console.warn(
          `Must be less than ${MAX_BATCH_MIGRATION_SIZE} objects at a time. ${recordCount}`
        );
        addResult(
          "Failed",
          resultTotals,
          `Must be less than ${MAX_BATCH_MIGRATION_SIZE} objects at a time. ${recordCount}`
        );
        logResults(
          JSON.stringify(resultTotals, null, " "),
          getDuration(resultTotals.processedAt)
        );
        return false;
      }
      if (dryRun) {
        console.log(
          `DRY RUN: ${resultTotals.processedAt}\nFound ${recordCount} records to copy from ${sourceBucket}/${prefix}`
        );
      } else {
        console.log(
          `${resultTotals.processedAt}\nCopying ${recordCount} records from ${sourceBucket}/${prefix}`
        );
        await Promise.all(
          results.map(async (object) => {
            const key = decodeURIComponent(object.Key!.replace(/\+/g, " "));
            const copySource = `${sourceBucket}/${key}`;
            try {
              const results = await copyObject(
                copySource,
                destinationBucket,
                key
              );
              const copyResult = results.CopyObjectResult;
              testInfo[key] = copyResult;

              addResult(
                "Success",
                resultTotals,
                JSON.stringify(copyResult),
                key
              );

              return copyResult;
            } catch (e) {
              addResult("Error", resultTotals, JSON.stringify(e), key);
              return false;
            }
          })
        ).then((values) => {
          return values.forEach((value) => {
            if (value) finalTestResults.push(value);
          });
        });
      }
      resultTotals.completedAt = new Date().toISOString();

      return true;
    } else {
      resultTotals.completedAt = new Date().toISOString();

      return false;
    }
  } catch (e) {
    addResult("Error", resultTotals, JSON.stringify(e));
    logResults(
      `${JSON.stringify(resultTotals, null, " ")}`,
      getDuration(resultTotals.processedAt)
    );
    return false;
  }
};

const handler = async () => {
  // get program args
  let { stage, prefix, bucket, dry_run } = program.opts();

  const startTime = new Date().toISOString();
  const isDryRun = dry_run === "false" ? false : true;

  console.log(
    `Migrating data to the ${stage} data lake. Source bucket: ${bucket}`
  );

  const result = await migrate(stage, prefix, bucket, isDryRun);

  if (result) {
    return process.exit();
  } else {
    return process.exit(1);
  }
};

// exec handler
handler();
