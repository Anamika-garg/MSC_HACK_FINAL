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

    const { Skills, Experience, Education, Bio, Phone, location, profession } =
      req.body;
    console.log(
      Skills,
      Experience,
      Education,
      Bio,
      Phone,
      location,
      profession
    );

    if (!Skills || !Education || !Bio || !Phone || !location || !profession) {
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
        userID: user.id,
        Skills: JSON.parse(Skills).split(","),
        Experience: JSON.parse(Experience)[0] || null,
        Education: JSON.parse(Education)[0],
        Bio,
        Phone,
        location: JSON.parse(location),
        photoURL: req.cloudinaryUrl,
        profession,
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

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// async function moodJournal(req, res, next) {
//   try {
//     const {moodText , moodEmoji} = req.body;
//     const user = req.body;
//     const userId = user.id;

//     const response = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [
//         {
//           role: "system",  // Use 'system' to set the behavior of the assistant
//           content: `
//             You are a supportive friend who provides uplifting and positive affirmations
//             based on the user's mood and emotions.
//           `
//         },
//         {
//           role: "user",
//           content: `
//             I feel ${moodEmoji} ${moodText}. Can you give me an uplifting affirmation?
//           `
//         }
//       ],
//       store: true,
//     })

//     console.log(response)

//   } catch (err) {
//     console.log(err);
//     return res.status(400).json({
//       error: "Some Error Occured",
//       err,
//     });
//   }
// }

async function moodJournal(req, res, next) {
  const { moodEmoji, moodText } = req.body;

  // Example logic: generate affirmations based on mood
  let affirmations = [];

  switch (moodEmoji) {
    case "😊":
      affirmations = [
        "Your happiness is contagious!",
        "Keep smiling, you're doing great!",
        "Today is a beautiful day because of you.",
      ];
      break;
    case "😭":
      affirmations = [
        "It's okay to feel down sometimes. Better days are ahead.",
        "Your strength is greater than your struggles.",
        "You are loved, even on tough days.",
      ];
      break;
    case "😡":
      affirmations = [
        "Take a deep breath. You are in control.",
        "You have the power to turn frustration into motivation.",
        "Your feelings are valid, but they don't define you.",
      ];
      break;
    case "😐":
      affirmations = [
        "Even neutral days are part of your journey.",
        "Small steps lead to big changes.",
        "You are growing, even if you don't feel it right now.",
      ];
      break;
    case "😪":
      affirmations = [
        "Rest is productive. You deserve it.",
        "Your body and mind are recharging for greatness.",
        "It's okay to pause. Tomorrow is a new day.",
      ];
      break;
    default:
      affirmations = [
        "You are capable of achieving great things.",
        "You choose to be positive and optimistic.",
        "You are worthy of love and respect.",
      ];
  }

  res.json({ affirmations });
}

// const openai = new OpenAIApi(new Configuration({
//   apiKey: 'YOUR_OPENAI_API_KEY',
// }));

// async function resumereview(req,res,next){
//   const { text } = req.body;

//   try {
//     const response = await openai.createCompletion({
//       model: 'gpt-4',
//       prompt: `You are an expert career advisor. Review the following resume and provide constructive feedback on how to improve it for ATS (Applicant Tracking Systems), structure, and readability:\n\n${text}`,
//       max_tokens: 300,
//     });

//     res.json({ feedback: response.data.choices[0].text.trim() });
//   } catch (error) {
//     console.error('OpenAI API Error:', error);
//     res.status(500).send('Failed to process the resume.');
//   }
// }

async function resumereview(req, res, next) {
  try {
    const { text } = req.body;
    const apiKey = process.env.GEMINI_API;

    const apiUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

    // console.log(text)
    let formattedText = text
      .replace(/(Education|EDUCATION)/g, "\n\n[Education]\n")
      .replace(/(Experience|EXPERIENCE|Work History)/g, "\n\n[Experience]\n")
      .replace(/(Skills|SKILLS|Technical Skills)/g, "\n\n[Skills]\n")
      .replace(/(Projects|PROJECTS)/g, "\n\n[Projects]\n")
      .replace(/(Certifications|CERTIFICATIONS)/g, "\n\n[Certifications]\n");

    console.log(formattedText);

    const requestData = {
      contents: [
        {
          parts: [
            {
              text: `
              You are being provided with the text extracted from a resume. Analyze it thoroughly and provide an ATS (Applicant Tracking System) score out of 100 based on the following criteria:
              1. Use of relevant keywords
              2. Grammar and language quality
              3. Overall structure and formatting (ignore visual formatting but consider logical structure)
              
              Return the results in JSON format with the following structure:
              {
  "ATS_Score": number,
  "Sections": {
    "Education": {
      "Score": number,
      "Suggestions": [
        "specific suggestion 1 for Education",
        "specific suggestion 2 for Education",
        "specific suggestion 3 for Education"
      ]
    },
    "Experience": {
      "Score": number,
      "Suggestions": [
        "specific suggestion 1 for Experience",
        "specific suggestion 2 for Experience",
        "specific suggestion 3 for Experience"
      ]
    },
    "Skills": {
      "Score": number,
      "Suggestions": [
        "specific suggestion 1 for Skills",
        "specific suggestion 2 for Skills",
        "specific suggestion 3 for Skills"
      ]
    },
    "Projects": {
      "Score": number,
      "Suggestions": [
        "specific suggestion 1 for Projects",
        "specific suggestion 2 for Projects",
        "specific suggestion 3 for Projects"
      ]
    },
    "Certifications": {
      "Score": number,
      "Suggestions": [
        "specific suggestion 1 for Certifications",
        "specific suggestion 2 for Certifications",
        "specific suggestion 3 for Certifications"
      ]
    }
  },
  "Overall_Suggestions": [
    "overall suggestion 1 to improve the resume",
    "overall suggestion 2 to improve the resume",
    "overall suggestion 3 to improve the resume",
    "overall suggestion 4 to improve the resume"
  ]
}
              }
              
              Here is the resume text:
              ${formattedText}
              `,
            },
            // {
            //   text: `Analyze the following resume text. Provide an ATS (Applicant Tracking System) score out of 100 and suggest specific changes to improve it, focusing on keywords, formatting, and overall structure.\n\nResume:\n${text}`
            // }
          ],
        },
      ],
    };

    const response = await axios.post(`${apiUrl}?key=${apiKey}`, requestData, {
      headers: { "Content-Type": "application/json" }, // Fixed content type
    });

    const review = response.data.candidates[0].content.parts[0].text;
    console.log("Review:", review);

    return res.json({ review }); // Send response back to client
    // return res.send('ok')
  } catch (error) {
    console.error(
      "Gemini API Error:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send("Failed to process the resume.");
  }
}

module.exports = {
  registerUser,
  userDetails,
  login,
  continueWithGoogle,
  profile,
  moodJournal,
  resumereview,
};
