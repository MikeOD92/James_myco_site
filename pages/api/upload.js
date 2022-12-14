import S3 from "aws-sdk/clients/s3";

const awsUpload = async (files) => {
  // this should be changed to accept multiple files probably pass 'files' not file as an array of files, and loop over
  const s3 = new S3({
    region: "us-west-1",
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_KEY,
    signatureVersion: "v4",
  });
  const returnArr = [];
  console.log(files, "files in the awsUpload function////////");
  // seeing mystery file uploaded with link ending in /item and no file attached.

  for (let idx in files) {
    // if (typeof files[idx] !== File) return;
    try {
      // console.log(files[idx]);
      // console.log("BUCKET NAME");
      // console.log(process.env.NEXT_PUBLIC_BUCKET_NAME);
      const fileParams = {
        Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
        Key: files[idx].name,
        Expires: 600,
        ContentType: files[idx].type,
      };
      const url = await s3.getSignedUrlPromise("putObject", fileParams);

      const response = await fetch(url, {
        method: "PUT",
        body: files[idx],
        headers: {
          "Content-type": String(files[idx].type),
        },
      });

      // return response;
      const assetUrl = response.url.split("?")[0];
      // console.log(assetUrl);
      returnArr.push(assetUrl);
      console.log(returnArr);
      /// issue we are facing not is that the response does not have the actual asset url
      // asset url should be https://{BUCKET_NAME}.s3.{REGION}.amazonaws.com/{KEY || filename}
      // so between our S3 instance, and file params all the data minus a few fixed strings are there.
      // how to go about returning that will be what we need to figure out.
    } catch (err) {
      console.error(err);
    }
  }
  return returnArr;
};

export default awsUpload;
