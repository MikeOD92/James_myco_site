import S3, { DeleteObjectRequest } from "aws-sdk/clients/s3";

const s3 = new S3({
  region: "us-west-1",
  accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_SECRET_KEY,
  signatureVersion: "v4",
});

const awsUpload = async (files) => {
  const returnArr = [];

  for (let i = 0; i < files.length; i++) {
    try {
      const fileParams = {
        Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
        Key: files[i].name, // change this to assign a random number or string val after name , never have repeating names
        Expires: 600,
        ContentType: files[i].type,
      };
      const url = await s3.getSignedUrlPromise("putObject", fileParams);

      const response = await fetch(url, {
        method: "PUT",
        body: files[i],
        headers: {
          "Content-type": String(files[i].type),
        },
      });

      const assetUrl = response.url.split("?")[0];

      returnArr.push(assetUrl);
    } catch (err) {
      console.error(err);
    }
  }
  return returnArr;
};

export const awsDelete = async (link) => {
  const deleteParams = {
    Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
    Key: link.split("/").pop(),
  };

  console.log(deleteParams);
  s3.deleteObject(deleteParams, function (err, data) {
    if (err) console.error(err, err.stack);
    else console.log(link);
  });
};

export default awsUpload;
