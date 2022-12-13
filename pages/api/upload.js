import { NextApiRequest, NextApiResponse } from "next";
import S3 from "aws-sdk/clients/s3";
import { Upload } from "@aws-sdk/lib-storage";
import handler from "../../utils/handler";
import { hasTokenMiddleware } from "../../utils/checkUser";
import busboy from "busboy";

handler.use(hasTokenMiddleware).post(upload);

// const s3 = new S3({
//   region: "us-west-1",
//   accessKeyId: process.env.ACCESS_KEY,
//   secretAccessKey: process.env.SECRET_KEY,
//   signatureVersion: "v4",
// });

// async function upload(req, res) {
//   if (req.method !== "POST") {
//     console.log(req.method);
//     return res.status(405).json({ message: "Method Not Allowed" });
//   }
//   console.log("////////look here");
//   //   console.log(req.body);
//   if (req.body) {
//     // console.log("starting img upload loop", req.body);
//     try {
//       //   const imgUrls = [];
//       //   for (let i = 0; i < images.length; i++) {
//       const params = {
//         Bucket: process.env.BUCKET_NAME,
//         Key: req.body.name,
//         Expires: 600,
//         ContentType: req.body.type,
//         ACL: "public-read",
//       };
//       const url = await s3.getSignedUrlPromise("putObject", params);
//       // imgUrls.push(url);
//       // console.log(imgUrls);
//       //   }
//       res.status(200).json({ url });
//     } catch (err) {
//       console.error(err);
//       res.status(400).json({ message: err });
//     }
//   }
// }

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};

const s3 = new S3({
  region: "us-west-1",
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  signatureVersion: "v4",
});

function upload(req, res) {
  const bb = busboy({ headers: req.headers });

  bb.on("file", async (_, file, info) => {
    const fileName = info.filename;

    try {
      const parallelUploads = new Upload({
        client: s3,
        queueSize: 4,
        partSize: 1024 * 1024 * 5,
        leavePartsOnError: false,
        params: {
          Bucket: process.env.BUCKET_NAME,
          Key: fileName,
          Body: file,
        },
      });
    } catch (err) {
      console.error(err);
    }
  });
  bb.on("close", () => {
    res.writeHead(200, { connection: "close" });
    res.end("File Uploaded");
  });
  req.pipe(bb);
  return;
}
