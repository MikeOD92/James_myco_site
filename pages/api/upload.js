import S3 from "aws-sdk/clients/s3";
import { Storage } from "@google-cloud/storage";
import handler from "../../utils/handler";
import { hasTokenMiddleware } from "../../utils/checkUser";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = async (req, res) => {
  console.log("backend upload service running");
  const promise = new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm({ keepExtensions: true });
    form.uploadDir = "./public/img/";
    // so it is uploading to the public dir but it gives me an invalid name and does not have an extension/

    form.parse(req, (err, fields, files) => {
      // files[0].newFilename = files[0].orginalFilename;
      // console.log(files);
      // console.log("///////////////////////");
      // if (err) {
      //   return res.status(500).json(err);
      // }
      if (err) reject(err);
      resolve({ fields, files });
      // console.log(err, fields, files);
    });
  });
  return promise.then(({ fields, files }) => {
    res.status(200).json({ fields, files });
  });
};
handler.use(hasTokenMiddleware).post(upload);

// async function upload(req, res) {
//   const form = new formidable.IncomingForm();
//   form.uploadDir = "../../public/img/";
//   form.keepExtensions = true;
//   form.parse(req, (err, fields, files) => {
//     console.log(err, fields, files);
//   });
//   res.status(200).json({ msg: "uploaded" });
// }
// handler.use(hasTokenMiddleware).post(gcpUpload);

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

// // const localUpload = async (file) => {

// // }

// async function gcpUpload(req, res) {
//   console.log("reached");
//   console.log(req.body);

//   const storage = new Storage({
//     projectId: process.env.NEXT_PUBLIC_GCP_PROJECTID,
//     credentials: {
//       type: "service_account",
//       project_id: process.env.NEXT_PUBLIC_GCP_PROJECTID,
//       private_key_id: process.env.NEXT_PUBLIC_PRIVATE_KEY_ID,
//       private_key: process.env.NEXT_PUBLIC_PRIVATE_KEY,
//       client_email: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
//       client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
//       auth_uri: "https://accounts.google.com/o/oauth2/auth",
//       token_uri: "https://oauth2.googleapis.com/token",
//       auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
//       client_x509_cert_url: process.env.NEXT_PUBLIC_CLIENT_X509_CERT_URL,
//     },
//   });

//   const bucketName = process.env.NEXT_PUBLIC_BUCKET;

//   // const filePath = req.body.file.path;clear

//   const response = await storage
//     .bucket(bucketName)
//     .upload(toString(req.body.path));
//   // this seems to be the issue, we do not have a filePath for the .upload() method
//   return response.json();
// }

// export default awsUpload;
// export default gcpUpload;

export default handler;
