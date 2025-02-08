const { User } = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const OpenAI = require("openai");
const axios = require("axios");
const { model } = require("mongoose");
const language = require("@google-cloud/language");

// const completion = openai.chat.completions.create({
//   model: "gpt-4o-mini",
//   store: true,
//   messages: [
//     {"role": "user", "content": "write a haiku about ai"},
//   ],
// });

// completion.then((result) => console.log(result.choices[0].message));

// Register User
async function registerUser(req, res, next) {
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    if (!fullName || !email || !password || !confirmPassword) {
      return res.status(422).json({
        error: "Kindly fill all the details",
      });
    }

    if (!email.includes("@")) {
      return res.status(422).json({
        error: "Invalid email",
      });
    }

    if (password != confirmPassword) {
      return res.status(422).json({
        error: "Passwords do not match",
      });
    }

    if (password < 8) {
      return res.status(422).json({
        error: "Passwords must be of 8 characters!",
      });
    }

    const emailExists = await User.findOne({
      email,
    });
    if (emailExists) {
      return res.status(422).json({
        error: "User with this email already exists!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email: email.toLowerCase(),
      password: hashedPass,
    });

    await newUser.save();
    payload = {
      id: newUser._id,
      email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    console.log(token);

    res.status(201).json({
      success: "User registration Successful",
      user: newUser,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: "Some Error Occured",
      err,
    });
  }
}

// Add Details to User profile
async function userDetails(req, res, next) {
  try {
    const user = req.user;
    console.log(user);
    const exists = await User.findById(user.id);
    if (!exists) {
      res.status(400).json({
        error: "Some Error Occured",
        err,
      });
    }

    const { Skills, Experience, Education, Bio, Phone, location, profession} = req.body;

    if (!Skills || !Experience || !Education || !Bio || !Phone || !location || !profession) {
      return res.status(422).json({
        error: "Kindly fill all the details",
      });
    }

    if (Phone.length != 10) {
      return res.status(422).json({
        error: "Invalid Phone Number",
      });
    }

    const addInUserSchema = await User.findByIdAndUpdate(user.id, {
      details: {
        Skills: Skills.split(","),
        Experience: Experience,
        Education: Education,
        Bio,
        Phone,
        location: location,
        photoURL: req.cloudinaryUrl,
        profession
      },
    });
    addInUserSchema.save();

    const UpdatedUser = await User.findById(user.id);
    return res.status(200).json({
      success: "Updated Successfully",
      UpdatedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: "Some Error Occured",
      err,
    });
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({
        error: "Fill all the fields!",
      });
    }
    if (!email.includes("@")) {
      return res.status(422).json({
        error: "Invalid Email ID",
      });
    }

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (!userExists) {
      return res.status(422).json({
        error: "No such user exists!",
      });
    }

    const hashedPassword = await bcrypt.compare(password, userExists.password);
    if (hashedPassword) {
      const payload = {
        id: userExists._id,
        email,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      return res.status(200).json({
        success: "Login Successful!",
        user: userExists,
        token,
      });
    }

    return res.status(422).json({
      error: "Invalid Credentials",
    });
  } catch (err) {
    return res.status(400).json({
      error: "Error Login, please try again",
    });
  }
}

async function continueWithGoogle(req, res, next) {
  const { providerId, email, fullName, photoURL } = req.body;
  if (!providerId || !email || !fullName) {
    return res.status(422).json({
      error: "No proper info",
    });
  }
  try {
    const emailExists = await User.findOne({ email });

    if (!emailExists) {
      const newUser = new User({
        email,
        fullName,
        providerId,
        details: {
          photoURL,
        },
      });

      newUser.save();

      const payload = {
        id: newUser._id,
        email,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      return res.status(200).json({
        success: "Success",
        user: newUser,
        token,
      });
    } else {
      const payload = {
        id: emailExists._id,
        email,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      return res.status(200).json({
        success: "Success",
        user: emailExists,
        token,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Try Again , Some Error Occured",
      err,
    });
  }
}

async function profile(req, res, next) {
  try {
    const user = req.user;
    const profile = await User.findById(user.id);
    if (!profile) {
      return res.status(404).json({
        error: "Some Error Occured",
        err,
      });
    }

    return res.status(200).json({
      success: "User detals fetched successfully",
      profile,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Some Error Occured",
      err,
    });
  }
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function moodJournal(req, res, next) {
  try {
    const {moodText , moodEmoji} = req.body;
    const user = req.body;
    const userId = user.id;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",  // Use 'system' to set the behavior of the assistant
          content: `
            You are a supportive friend who provides uplifting and positive affirmations
            based on the user's mood and emotions.
          `
        },
        {
          role: "user",
          content: `
            I feel ${moodEmoji} ${moodText}. Can you give me an uplifting affirmation?
          `
        }
      ],
      store: true,
    })

    console.log(response)


  //   const client = new language.LanguageServiceClient();

  //   async function analyzeSentiment(text) {
  //     const document = {
  //       content: text,
  //       type: "PLAIN_TEXT",
  //     };

  //     const [result] = await client.analyzeSentiment({ document });
  //     const sentiment = result.documentSentiment;
  //     console.log(
  //       `Score: ${sentiment.score}, Magnitude: ${sentiment.magnitude}`
  //     );
  //   }

  //   analyzeSentiment("I am feeling fantastic today!");
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Some Error Occured",
      err,
    });
  }
}

module.exports = {
  registerUser,
  userDetails,
  login,
  continueWithGoogle,
  profile,
  moodJournal,
};
