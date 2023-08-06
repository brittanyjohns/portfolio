import { S3 } from "aws-sdk";
const USE_FIPS_ENDPOINTS = process.env.USE_FIPS_ENDPOINTS === "true";
const USE_DUALSTACK_ENDPOINTS = process.env.USE_DUALSTACK_ENDPOINTS === "true";

const s3 = new S3({
  useFipsEndpoint: USE_FIPS_ENDPOINTS,
  useDualstackEndpoint: USE_DUALSTACK_ENDPOINTS,
});

export const copyObject = async (
  CopySource: string,
  Bucket: string,
  Key: string
): Promise<S3.CopyObjectOutput> => {
  const params = {
    Bucket,
    CopySource,
    Key,
  };

  try {
    return await s3.copyObject(params).promise();
  } catch (error) {
    throw error;
  }
};

export const getObject = async (
  Bucket: string,
  Key: string
): Promise<S3.GetObjectOutput> => {
  const params = {
    Bucket,
    Key,
  };

  try {
    return await s3.getObject(params).promise();
  } catch (error) {
    throw error;
  }
};

export const headObject = async (
  Bucket: string,
  Key: string
): Promise<S3.HeadObjectOutput> => {
  const params = {
    Bucket,
    Key,
  };

  try {
    return await s3.headObject(params).promise();
  } catch (error) {
    throw error;
  }
};

export const listObjects = async (
  Bucket: string,
  Prefix: string
): Promise<S3.ListObjectsV2Output> => {
  const params = {
    Bucket,
    Prefix,
  };

  try {
    return await s3.listObjectsV2(params).promise();
  } catch (error) {
    throw error;
  }
};

export const putObject = async (
  Bucket: string,
  Key: string,
  Body: string | Buffer,
  Tagging?: string
): Promise<S3.PutObjectOutput> => {
  const params = {
    Body,
    Bucket,
    Key,
    Tagging,
  };

  try {
    return await s3.putObject(params).promise();
  } catch (error) {
    throw error;
  }
};
