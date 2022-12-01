const { response } = require("../../utilities/response");
const { getTokens } = require("./google.user.controller");
const { register } = require("../../repository/user.repository");
const { userCollection } = require("../../database/models/userSchema");
const { slugify } = require("../../utilities/compare");
const emailService = require("../../services/email.service"); 
const { SIGNUP_TEMPLATE } = require("../../utilities/email.template");
const { generateEmailVerificationLink, verifyLink } = require("../../utilities/generateToken");

async function registerUser(req, res) {
  try {
    let {
      email,
      firstName,
      lastName,
      username,
      password,
      confirm_password,
      language,
    } = req.body;
    
    //Check if the user already exist
    password =
      password === confirm_password
        ? password
        : res.status(422).json(
            response({
              success: false,
              message: "Password mismatch, Comfirm your password",
            })
          );
  
    const checkEmailExist = await userCollection.findOne({ email });
  
    if (checkEmailExist)
      return res
        .status(409)
        .json(response({ message: "User already exist", success: false }));
  
    const data = { email, firstName, lastName, username, password, language };
    
    let verificationLink = await generateEmailVerificationLink(data)
    

  await emailService({  to: email,
    subject: "Verify your Email",
    templateId: SIGNUP_TEMPLATE,
    dynamicTemplateData: {
      name: firstName,
      action_url: verificationLink,
    }});

      
    const user = await register(data);

    if (!user)
      return res
        .status(500)
        .json(response({ success: false, message: "User not created" }));
  
    return res.status(201).json(
      response({
        success: true,
        message: "User created successfully, Check your email for confirmation",
        data: user,
      })
    );
  } catch (error) {
    return res.status(500).json(
      response({
        success: false,
        message: "Something went wrong, please contact an Admin",
        data: user,
      })
    );
  }
}

async function googleAuthUserSignUp(req, res) {
  const { name, email } = await getTokens(req.query.code);

  //Check if user already exist
  const user = await userCollection.findOne({ email });

  if (user) {
    const data = {
      _id: user._id,
      firstname: user.firstName,
      lastname: user.lastName,
      username: user.username,
      email: user.email,
      language: user.language,
      token: user.generateAuthToken(),
    };
    return res.status(200).json(
      response({
        success: true,
        message: "User logged in Sucessfully",
        data: data,
      })
    );
  } else {
    const randomUserCode = (Math.random() + 1).toString(36).substring(7);
    const newName = name.split(" ");

    const data = {
      firstName: newName[0],
      lastName: newName[1],
      email: email,
      username: slugify(name) + randomUserCode,
      password: "password",
    };
    const user = await register(data);

    if (!user)
      return res
        .status(500)
        .json(response({ success: false, message: "User not created" }));

    return res.status(201).json(
      response({
        success: true,
        message: "User created successfully",
        data: user,
      })
    );
  }
}

async function verifyMail (req, res) {
  let verificationLink = req.params.link

  try {
      let user = await verifyLink(verificationLink)
      if (!user) {
          throw new Error("Link expired")
      }

      res
      .status(201)
      .redirect("/v1/auth/signin");
  }
  catch (err) {
      res.status(400).json({
          error: err.message
      })
  }
}

module.exports = { registerUser, googleAuthUserSignUp, verifyMail };
