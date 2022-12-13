import S3 from "aws-sdk/clients/s3";

const awsUpload = async (file) => {
  const s3 = new S3({
    region: "us-west-1",
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_KEY,
    signatureVersion: "v4",
  });
  try {
    // console.log("BUCKET NAME");
    // console.log(process.env.NEXT_PUBLIC_BUCKET_NAME);
    const fileParams = {
      Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
      Key: file.name,
      Expires: 600,
      ContentType: file.type,
    };
    const url = await s3.getSignedUrlPromise("putObject", fileParams);

    const response = await fetch(url, {
      method: "PUT",
      body: file,
      headers: {
        "Content-type": String(file.type),
      },
    });

    return response;
    /// issue we are facing not is that the response does not have the actual asset url
    // asset url should be https://{BUCKET_NAME}.s3.{REGION}.amazonaws.com/{KEY || filename}
    // so between our S3 instance, and file params all the data minus a few fixed strings are there.
    // how to go about returning that will be what we need to figure out.
  } catch (err) {
    console.error(err);
  }
};

export default awsUpload;
