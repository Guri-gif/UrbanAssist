const User = require("../../Models/user_model");
const sendEmail = require("../../Utils/sendMail");
const { createUserValidation } = require("../../Services/createUserValidation");

const createUser = async (req, res, next) => {
  try {
    const createUserValues = await createUserValidation.validateAsync(req.body);

    const { email, password, username, role } = createUserValues;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists!",
      });
    }

    const newUser = new User({
      email,
      password,
      username,
      role,
    });

    await newUser.save();

    await sendEmail(
      newUser.email,
      "Welcome to our platform",
      `<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
  <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
    <div style="background-color: #4CAF50; color: white; padding: 20px; text-align: center;">
      <h2>Welcome to UrbanAssist</h2>
    </div>
    <div style="padding: 20px;">
      <p>Hi <strong>${newUser.username}</strong>,</p>
      <p>Your account has been successfully created. Below are your login credentials:</p>
      <table style="width: 100%; margin-top: 10px; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px; font-weight: bold;">Email:</td>
          <td style="padding: 10px;">${newUser.email}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold;">Password:</td>
          <td style="padding: 10px;">${newUser.password}</td>
        </tr>
      </table>
      <p style="margin-top: 20px;">You can now login and start using the platform.</p>
      <p>Cheers,<br/>Team UrbanAssist</p>
    </div>
  </div>
</body>`
    );

    res.status(201).json({
      success: true,
      message: "User created successfully!",
      data: {
        username: newUser.username,
        email: newUser.email,
        _id: newUser._id,
      },
    });
  } catch (error) {}
};

module.exports = createUser;
