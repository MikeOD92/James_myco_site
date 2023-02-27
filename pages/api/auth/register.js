import User from "../../../models/user";
import dbConnect from "../../../utils/dbConnect";
import handler from "../../../utils/handler";
import bcrypt from "bcrypt";

// currently this does not check if the user is authenticated to create a
// new user the register page should redirect unauthorized users
handler.post(createUser);
handler.put(editUser);

async function createUser(req, res) {
  // const data = req.body;

  // const { email, password } = data;

  dbConnect();

  const user = await User.create(req.body);

  res.status(201).json({ message: "Created user!" });
}

async function editUser(req, res) {
  dbConnect();
  try {
    const doc = await User.updateOne(
      { _id: req.body._id },
      {
        password: await bcrypt.hash(req.body.password, 10),
      }
    );
  } catch (err) {
    console.error(err);
  }
  res.status(202).json({ message: "password Updated" });
}
export default handler;
