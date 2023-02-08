import formidable from "./formidable-serverless";
import * as gcs from "./gcs";
import { PassThrough } from "stream";
import parseForm from "./parseForm";
import { createReadStream } from "fs";

// const uploadStream = (file) => {
//   const pass = new PassThrough();

//   const stream = gcs.createStream(
//     file.originalFilename ?? file.newFilename,
//     file.mimetype ?? undefined
//   );
//   pass.pipe(stream);

//   return pass;
// };

export const uploadUtil = async (req, res) => {
  const form = formidable({ keepExtensions: true });

  const { files } = await parseForm(form, req);

  const file = files.file;

  console.log(file);

  createReadStream(file.filepath)
    .pipe(gcs.createStream(file.newFilename, file.mimetype))
    .on("finish", () => {
      res.status(200).json("upload complete");
    })
    .on("error", (err) => {
      console.error(err);
      res.status(500).json("File upload error:" + err.message);
    });
  //   const from = formidable({ createWriteStreamHandler: uploadStream });

  //   from.parse(req, () => {
  //     res.status(200).json(res.body);
  //   });
};
