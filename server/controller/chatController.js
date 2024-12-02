const pool = require('../config/db');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');

const sendMessage = async (req, res) => {
    const { content, senderId, courseId } = req.body;
    //console.log(req.body);

    if (!content || !senderId || !courseId) {
        return res.status(400).json({ message: "Please provide content, senderId, and courseId." });
    }

    try {
        const encryptedContent = cryptr.encrypt(content);


        const cid = await pool.query(
            `select cid from course where course_code = $1`,[courseId]
        );
        
        const result = await pool.query(
            `INSERT INTO message (mtime, content, senderId, CID) VALUES (CURRENT_TIMESTAMP, $1, $2, $3) RETURNING MSG_ID`,
            [encryptedContent, senderId, cid.rows[0].cid]
        );
        const messageId = result.rows[0].msg_id;

        req.io.to(courseId).emit("messageReceived", {
            MSG_ID: messageId,
            content, 
            senderId,
            courseId,
            mtime: new Date() 
        });

        return res.status(201).json({ messageId });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error sending message" });
    }
};

const getMessages = async (req, res) => {
    const { courseId } = req.body;
    //console.log(req.body);
    if (!courseId) {
        return res.status(400).json({ message: "Please provide a courseId." });
    }
    try {

        const cid = await pool.query(
            `select cid from course where course_code = $1`,[courseId]
        )
        // console.log(cid.rows)
        const result = await pool.query(
            `SELECT * FROM message WHERE CID = $1 ORDER BY mtime`,
            [cid.rows[0].cid]
        );

        //console.log(result.rows)

       //console.log(result.rows);
        const decryptedMessages = result.rows.map((message) => ({
            ...message,
            content: cryptr.decrypt(message.content),
        }));
        //console.log(decryptedMessages);

        return res.status(200).json(decryptedMessages);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching messages" });
    }
};




  const courseList = async (req, res) => {
    //console.log(req.body);
    const sid = req.body.SID;
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // Months are 0-indexed (Jan = 0)

    // Determine the current semester based on the month
    let semester = '';
    if (currentMonth >= 1 && currentMonth <= 5) {
        semester = 'Winter';  // Winter semester (Jan - Mar)
    } else if (currentMonth >= 7 && currentMonth <= 12) {
        semester = 'Autumn';  // Autumn semester (Oct - Dec)
    } else {
        return res.status(400).json({ message: 'Current month does not correspond to Winter or Autumn semester.' });
    }

    try {
        const result = await pool.query(
            `SELECT c.Course_code, c.year, c.semester, c.credit, p.prof_name
            FROM Course_enrolled_list cel
            JOIN Course c ON cel.CID = c.CID
            JOIN Professors p ON c.prof_id = p.prof_id
            WHERE cel.SID = $1
            AND c.year = $2
            AND c.semester = $3`, 
            [sid, currentYear, semester]
        );
        console.log(result.rows);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No courses found for the given SID this semester.' });
        }

        // Return the list of courses for the student in the current semester
        //console.log(result.rows);
        return res.json(result.rows);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error occurred' });
    }
};

const professorCourseList = async (req, res) => {
    const profId = req.body.SID;
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    // Determine the current semester based on the month
    let semester = '';
    if (currentMonth >= 1 && currentMonth <= 5) {
        semester = 'Winter';  // Winter semester (Jan - Mar)
    } else if (currentMonth >= 7 && currentMonth <= 12) {
        semester = 'Autumn';  // Autumn semester (Oct - Dec)
    } else {
        return res.status(400).json({ message: 'Current month does not correspond to Winter or Autumn semester.' });
    }

    try {
        const result = await pool.query(
            `SELECT c.Course_code, c.year, c.semester, c.credit, p.prof_name
            FROM Course c
            JOIN Professors p ON c.prof_id = p.prof_id
            WHERE c.prof_id = $1
            AND c.year = $2
            AND c.semester = $3`, 
            [profId, currentYear, semester]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No courses found for the given professor this semester.' });
        }

        // Return the list of courses taught by the professor in the current semester
        return res.json(result.rows);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error occurred' });
    }
};



module.exports = {
    sendMessage,
    getMessages,
    courseList,
    professorCourseList
};
