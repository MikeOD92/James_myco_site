import S3 from "aws-sdk/clients/s3";
import { Storage } from "@google-cloud/storage";
import handler from "../../utils/handler";
import { hasTokenMiddleware } from "../../utils/checkUser";

handler.use(hasTokenMiddleware).post(gcpUpload);

async function gcpUpload(req, res) {
  // console.log("/////////////", req.body);
  console.log("im i reached?");

  let projectId = process.env.NEXT_PUBLIC_GCP_PROJECTID;

  const storage = new Storage({
    projectId,
    credentials: {
      client_email: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
      private_key: process.env.NEXT_PUBLIC_PRIVATE_KEY,
    },
  });

  const bucket = storage.bucket(process.env.NEXT_PUBLIC_BUCKET);
  // console.log("////////////////");
  // console.log(req.body);
  const file = bucket.file(req.body.file.name);
  const options = {
    expires: Date.now() + 1 * 60 * 1000, //  1 minute,
    fields: { "x-goog-meta-test": "data" },
  };
  const [response] = await file.generateSignedPostPolicyV4(options);

  return res.status(200).json(response);

  // /////////////////////////
  // const returnArr = [];
  // for (let i = 0; i < req.files.length; i++) {
  //   try {
  //     const blob = bucket.file(files[i]);
  //     const blobStream = blob.createWriteStream();
  //     blobStream.on("finish", () => {
  //       res.status(200).send("Success");
  //       console.log("Success");
  //     });
  //     blobStream.end(req.file.buffer);
  //     console.log(blobStream);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }
  // return "working";
}

// const awsUpload = async (files) => {
//   const s3 = new S3({
//     region: "us-west-1",
//     accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY,
//     secretAccessKey: process.env.NEXT_PUBLIC_SECRET_KEY,
//     signatureVersion: "v4",
//   });
//   const returnArr = [];

//   for (let i = 0; i < files.length; i++) {
//     try {
//       const fileParams = {
//         Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
//         Key: files[i].name, // change this to assign a random number or string val after name , never have repeating names
//         Expires: 600,
//         ContentType: files[i].type,
//       };
//       const url = await s3.getSignedUrlPromise("putObject", fileParams);

//       const response = await fetch(url, {
//         method: "PUT",
//         body: files[i],
//         headers: {
//           "Content-type": String(files[i].type),
//         },
//       });

//       const assetUrl = response.url.split("?")[0];

//       returnArr.push(assetUrl);
//     } catch (err) {
//       console.error(err);
//     }
//   }
//   return returnArr;
// };

// export default gcpUpload;
// // export default awsUpload;

export default handler;
