import nc from "next-connect";
// import fs from "fs";

function onError(err, req, res, next) {
  console.error(err);
  res.status(500).end(err.toString());
}
const handler = nc({
  onError: onError,
  onNoMatch: (req, res) => {
    res.status(400).send("Page does not exist");
  },
  // api: {
  //   bodyParser: false,
  // },
});

export default handler;
