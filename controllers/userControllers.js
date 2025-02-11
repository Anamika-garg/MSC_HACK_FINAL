const { User } = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const OpenAI = require("openai");
const axios = require("axios");
const { model, default: mongoose } = require("mongoose");
const language = require("@google-cloud/language");
const Journal = require("../models/Journal");

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
    let method = "login";
    const emailExists = await User.findOne({ email: email.toLowerCase() });

    if (!emailExists) {
      method = "signup";
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
        method,
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
        method,
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

async function getJournals(req, res, next) {
  try {
    const user = req.user;
    const Journals = await Journal.find({ userID: user.id });
    return res.status(200).json({
      success: "success",
      Journals,
    });
  } catch (error) {
    console.error(
      "Gemini API Error:",
      error.response ? error.response.data : error.message
    );
  }
}
async function moodJournal(req, res, next) {
  try {
    const { moodEmoji, moodText } = req.body;
    const apiKey = process.env.GEMINI_API;
    const user = req.user;

    const apiUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

    const requestData = {
      contents: [
        {
          parts: [
            {
              text: `You are an empathetic and motivational coach specializing in emotional well-being. Based on the mood and journal entry provided, generate personalized affirmations to uplift the user. The affirmations should be positive, supportive, and tailored to their specific feelings.

Mood Emoji: ${moodEmoji}
Mood Text (Journal Entry): ${moodText}

Analyze the sentiment of the journal entry and create 3-5 affirmations that will resonate with the user's emotional state. If the user is feeling down, offer comforting and encouraging affirmations. If they are happy, reinforce positivity and gratitude. Use simple, heartfelt language.

Examples:

For sadness (😭): “It’s okay to feel this way. Brighter days are ahead.”
For happiness (😊): “Your joy is contagious. Keep shining!”
For frustration (😡): “Take a deep breath. You have the strength to overcome any challenge.”
Now, generate customized affirmations based on the provided mood and journal entry.
give the response in array format only!! Like this ["It’s okay to feel this way. Brighter days are ahead.” , "It’s okay to feel this way. Brighter days are ahead.”]
`,
            },
          ],
        },
      ],
    };

    const response = await axios.post(`${apiUrl}?key=${apiKey}`, requestData, {
      headers: { "Content-Type": "application/json" }, // Fixed content type
    });

    const affirmations = response.data.candidates[0].content.parts[0].text;
    // console.log("affirmations:", affirmations);

    const newJournal = new Journal({
      userID: user.id,
      moodText,
      moodEmoji,
      affirmations: JSON.parse(affirmations),
    });
    newJournal.save();

    return res.status(200).json({ affirmations }); // Send response back to client
    // return res.send('ok')
  } catch (error) {
    console.error(
      "Gemini API Error:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send("Failed to process the resume.");
  }
}

async function resumereview(req, res, next) {
  try {
    const { text } = req.body;
    const apiKey = process.env.GEMINI_API;

    const apiUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

    // console.log(text)
    let formattedText = text
      .replace(
        /(Education|Work History|Experience|Professional Experience|Internships)/gi,
        "\n\n[Experience]\n"
      )
      .replace(
        /(Education|Academic Background|Academic Qualifications|EDUCATION)/gi,
        "\n\n[Education]\n"
      )
      .replace(
        /(Skills|Technical Skills|Core Competencies|Areas of Expertise)/gi,
        "\n\n[Skills]\n"
      )
      .replace(
        /(Projects|Personal Projects|PROJECTS|Portfolio)/gi,
        "\n\n[Projects]\n"
      )
      .replace(
        /(Certifications|Licenses|CERTIFICATIONS|Courses|Accreditations)/gi,
        "\n\n[Certifications]\n"
      )
      .replace(/(Awards|Honors|Achievements|Recognitions)/gi, "\n\n[Awards]\n")
      .replace(
        /(Volunteer Work|Volunteering|Community Service)/gi,
        "\n\n[Volunteer Work]\n"
      )
      .replace(/(Publications|Research|Papers)/gi, "\n\n[Publications]\n")
      .replace(/(Languages|Language Proficiency)/gi, "\n\n[Languages]\n")
      .replace(/(References|Referees)/gi, "\n\n[References]\n");

    console.log(formattedText);

    const requestData = {
      contents: [
        {
          parts: [
            {
              text: `
              You are being provided with the text extracted from a resume. Analyze it thoroughly and provide an ATS (Applicant Tracking System) score out of 100 based on the following criteria:
              ### Evaluation Criteria:
1. **Use of Relevant Keywords**:
   - Check for industry-specific and role-specific keywords aligned with common job descriptions in the field.
   - Ensure the use of action verbs (e.g., "developed," "managed," "implemented").
   - Look for quantifiable achievements (e.g., "increased sales by 20%," "reduced processing time by 15%").

2. **Grammar and Language Quality**:
   - Identify grammatical errors, spelling mistakes, and inconsistent tenses.
   - Ensure the use of clear, concise, and professional language.
   - Check for passive voice overuse and suggest more active sentence structures.

3. **Logical Structure and Formatting**:
   - Assess if the resume follows a logical order: Contact Info → Summary (if present) → Skills → Experience → Education → Projects → Certifications.
   - Verify consistent formatting in bullet points, dates, and section headings.
   - Ensure the use of bullet points for listing responsibilities and achievements.
              {
  "ATS_Score": number,
  "Sections": {
    "Education": {
      "Score": number,
      "Suggestions": [
        "Include relevant coursework or academic achievements to highlight expertise.",
        "Ensure consistency in formatting degree names, institutions, and graduation dates.",
        "Add GPA if it’s above 3.0 and relevant to the job you’re applying for."
      ]
    },
    "Experience": {
      "Score": number,
      "Suggestions": [
        "Quantify achievements using metrics (e.g., 'increased sales by 20%').",
        "Use strong action verbs to describe responsibilities (e.g., 'Led', 'Developed').",
        "Include job titles, company names, and clear date ranges for each role."
      ]
    },
    "Skills": {
      "Score": number,
      "Suggestions": [
        "Include industry-specific keywords from the job description.",
        "Separate technical and soft skills for clarity.",
        "Avoid generic skills unless they are highly relevant (e.g., 'Microsoft Office')."
      ]
    },
    "Projects": {
      "Score": number,
      "Suggestions": [
        "Highlight outcomes or impact of each project, not just tasks performed.",
        "Include technologies used and any cross-functional collaboration.",
        "Organize projects in reverse chronological order or by relevance."
      ]
    },
    "Certifications": {
      "Score": number,
      "Suggestions": [
        "Ensure certification names and issuing organizations are accurate.",
        "Include expiration dates if applicable.",
        "Add certifications that align closely with the desired job role."
      ]
    },
    "Volunteer Work": {
      "Score": number,
      "Suggestions": [
        "Highlight leadership roles or skills transferable to the target job.",
        "Include the organization name, your role, and time period.",
        "Focus on measurable impact or outcomes from volunteer activities."
      ]
    },
    "Languages": {
      "Score": number,
      "Suggestions": [
        "Indicate proficiency level (e.g., 'Fluent', 'Intermediate').",
        "Include certifications if available (e.g., TOEFL, DELF).",
        "Only list languages relevant to the job or geographic area."
      ]
    },
    "Awards": {
      "Score": number,
      "Suggestions": [
        "Include the awarding body and date received.",
        "Describe the context or criteria for winning the award.",
        "List awards that demonstrate leadership, excellence, or relevant achievements."
      ]
    }
  },
  "Overall_Suggestions": [
    "Tailor your resume for each job by incorporating keywords from the job description.",
    "Use consistent formatting (e.g., font sizes, bullet points, alignment).",
    "Ensure there are no spelling or grammatical errors to maintain professionalism.",
    "Limit the resume to one or two pages, focusing on relevant experience."
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

async function getAuthor(req, res, next) {
  try {
    const authorId = req.params;
    console.log(authorId);
    const author = await User.findById(authorId.id);
    return res.status(200).json({
      success: "success",
      author,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "SOme Error Occured!",
      err,
    });
  }
}

async function getCourses(req, res, next) {
  try {
    const { course } = req.body;
    const response = await axios.get(
      `https://api.coursera.org/api/courses.v1?q=search&query=${course}`
    );
    const courses = response.data.elements;

    // return res.send(courses);
    const coursesWithLinks = courses.map((course) => ({
      ...course,
      link: `https://www.coursera.org/learn/${course.slug}`,
    }));
    return res.status(200).json({
      success: "success",
      courses: coursesWithLinks,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Some Error Occured",
      err,
    });
  }
}

async function personalisedCourses(req, res, next) {
  try {
    const user = req.user;
    const currentUser = await User.findById(user.id);
    const response = await axios.get(
      `https://api.coursera.org/api/courses.v1?q=search&query=${
        currentUser.details?.profession || `Web Development`
      }`
    );
    const courses = response.data.elements;

    // return res.send(courses);
    const coursesWithLinks = courses.map((course) => ({
      ...course,
      link: `https://www.coursera.org/learn/${course.slug}`,
    }));
    return res.status(200).json({
      success: "success",
      courses: coursesWithLinks,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Some Error Occured",
      err,
    });
  }
}

async function editProfile(req, res, next) {}

module.exports = {
  registerUser,
  userDetails,
  login,
  continueWithGoogle,
  profile,
  moodJournal,
  resumereview,
  getJournals,
  getAuthor,
  getCourses,
  personalisedCourses,
  editProfile,
};
