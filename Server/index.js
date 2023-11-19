const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const port = 3000;

// MySQL Connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "healthcare",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");});

const upload = multer({ dest: "uploads/" });
app.use(bodyParser.json());
app.use(cors());

// Set up file upload storage
/* const storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, 'uploads/');
	},
	filename: function (req, file, cb) {
	  const ext = path.extname(file.originalname);
	  cb(null, Date.now() + ext);
	},
  });
const upload = multer({ storage });   */

/* app.post('/patient/signup', upload.single('image'), (req, res) => {
	const { username, email, password } = req.body;
	const image = req.filename;
	const query = 'INSERT INTO patients (username, email, password, image) VALUES (?, ?, ?, ?)';
	connection.query(query, [username, email, password, image], (error, results) => {
	  if (error) {
		console.error('Error registering user:', error);
		res.status(500).json({ error: 'Failed to register user' });
		return;
	  }
	  res.json({ success: true });
	});
  }); */
app.post("/patient/signup", (req, res) => {
  const { username, password, email } = req.body;

  const newUser = {
    username,
    password,
    email,
  };

  connection.query("INSERT INTO patients SET ?", newUser, (error, results) => {
    if (error) throw error;

    console.log("New user registered:", newUser);
    res.json({ message: "User registered successfully" });
  });
});
// Upload Image
app.post("/patient/upload", upload.single("image"), (req, res) => {
  const { username } = req.body;
  const image = req.file;

  connection.query(
    "UPDATE patients SET image = ? WHERE username = ?",
    [image, username],
    (error, results) => {
      if (error) throw error;

      console.log("User image uploaded:", username);
      res.json({ message: "Image uploaded successfully" });
    }
  );
});

app.post("/doctor/signup", (req, res) => {
  const {
    username,
    password,
    email,
    specialization,
    appoinments,
    price,
    specialization_image,
  } = req.body;

  const newUser = {
    username,
    password,
    email,
    specialization,
    appoinments,
    price,
    specialization_image,
  };

  connection.query("INSERT INTO doctors SET ?", newUser, (error, results) => {
    if (error) throw error;

    console.log("New user registered:", newUser);
    res.json({ message: "User registered successfully" });
  });
});
// Upload Image
app.post("/doctor/upload", upload.single("image"), (req, res) => {
  const { username } = req.body;
  const { image } = req.file;

  connection.query(
    "UPDATE doctors SET image = ? WHERE username = ?",
    [image, username],
    (error, results) => {
      if (error) throw error;

      console.log("User image uploaded:", username);
      res.json({ message: "Image uploaded successfully" });
    }
  );
});

app.post("/lab/signup", (req, res) => {
  const { username, password, email, address, license } = req.body;

  const newUser = {
    username,
    password,
    email,
    address,
    license,
  };

  connection.query("INSERT INTO labs SET ?", newUser, (error, results) => {
    if (error) throw error;

    console.log("New user registered:", newUser);
    res.json({ message: "User registered successfully" });
  });
});
// Upload Image
app.post("/upload", upload.single("image"), (req, res) => {
  const { username } = req.body;
  const filename = req.file;

  connection.query(
    "UPDATE labs SET image = ? WHERE username = ?",
    [filename, username],
    (error, results) => {
      if (error) throw error;

      console.log("User image uploaded:", username);
      res.json({ message: "Image uploaded successfully" });
    }
  );
});

app.post("/pharmacy/signup", (req, res) => {
  const { username, password, email, address, license } = req.body;

  const newUser = {
    username,
    password,
    email,
    address,
    license,
  };

  connection.query(
    "INSERT INTO pharmacies SET ?",
    newUser,
    (error, results) => {
      if (error) throw error;

      console.log("New user registered:", newUser);
      res.json({ message: "User registered successfully" });
    }
  );
});
// Upload Image
app.post("/upload", upload.single("image"), (req, res) => {
  const { username } = req.body;
  const filename = req.file;

  connection.query(
    "UPDATE pharmacies SET image = ? WHERE username = ?",
    [filename, username],
    (error, results) => {
      if (error) throw error;

      console.log("User image uploaded:", username);
      res.json({ message: "Image uploaded successfully" });
    }
  );
});

// Route for patient login
app.post("/patient/signin", (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM patients WHERE username = ? AND password = ?";
  connection.query(query, [username, password], (error, results) => {
    if (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Failed to log in" });
      return;
    }
    if (results.length === 0) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }
    //const user = results[0];
    res.json(results);
  });
});

// Route for doctor login
app.post("/doctor/signin", (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM doctors WHERE username = ? AND password = ?";
  connection.query(query, [username, password], (error, results) => {
    if (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Failed to log in" });
      return;
    }
    if (results.length === 0) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }
    //const user = results[0];
    res.json(results);
  });
});

// Route for lab login
app.post("/lab/signin", (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM labs WHERE username = ? AND password = ?";
  connection.query(query, [username, password], (error, results) => {
    if (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Failed to log in" });
      return;
    }
    if (results.length === 0) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }
    //const user = results[0];
    res.json(results);
  });
});

// Route for pharmacy login
app.post("/pharmacy/signin", (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM pharmacies WHERE username = ? AND password = ?";
  connection.query(query, [username, password], (error, results) => {
    if (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Failed to log in" });
      return;
    }
    if (results.length === 0) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }
    const user = results[0];
    res.json(results);
  });
});

// Route for getting the list of doctors
app.get("/doctors", (req, res) => {
  const query = `SELECT * FROM doctors`;
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error getting doctors list:", error);
      res.status(500).json({ error: "Failed to get doctors list" });
      return;
    }
    res.json(results);
  });
});

// Route for adding a friend
app.post("/addfriend", (req, res) => {
  const { pat_id, friend_doc_id } = req.body;
  const query = `INSERT INTO friends_of_doctors (pat_id,friend_doc_id) 
  SELECT patients.id, doctors.id 
  FROM patients JOIN doctors ON doctors.id = ${mysql.escape(friend_doc_id)} 
  AND patients.id = ${mysql.escape(pat_id)}
	`;
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error adding friend:", error);
      res.status(500).json({ error: "Failed to add friend" });
      return;
    }
    res.json(results);
  });
});

// Route for getting the list of friends
app.get("/friendsOfDoc", (req, res) => {
  const { pat_id } = req.query;

  // Perform the database query
  const query = `
	  SELECT doctors.username, doctors.image, doctors.email
	  FROM doctors
	  INNER JOIN friends_of_doctors ON doctors.id = friends_of_doctors.friend_doc_id
	  WHERE friends_of_doctors.pat_id = ${mysql.escape(pat_id)}
	`;

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error executing the query: ", error);
      res
        .status(500)
        .json({ error: "An error occurred while executing the query." });
      return;
    }

    res.json(results);
  });
});

app.get("/friendsOfpatdoc", (req, res) => {
  const { friend_doc_id } = req.query;

  // Perform the database query
  const query = `
	SELECT patients.email, patients.username, patients.image FROM patients
	INNER JOIN friends_of_doctors ON patients.id = friends_of_doctors.pat_id
	WHERE friends_of_doctors.friend_doc_id = ${mysql.escape(friend_doc_id)}
	`;

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error executing the query: ", error);
      res
        .status(500)
        .json({ error: "An error occurred while executing the query." });
      return;
    }

    res.json(results);
  });
});
///////////////////////////////

app.get("/labs", (req, res) => {
  const query = `SELECT * FROM labs`;
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error getting doctors list:", error);
      res.status(500).json({ error: "Failed to get doctors list" });
      return;
    }
    res.json(results);
  });
});

app.post("/addfriendlab", (req, res) => {
  const { pat_id, friend_lab_id } = req.body;
  const query = `INSERT INTO friends_of_labs  (pat_id,friend_lab_id) 
  SELECT patients.id, labs.id FROM patients 
  JOIN labs ON labs.id = ${mysql.escape(friend_lab_id)} 
  AND patients.id = ${mysql.escape(pat_id)}
	`;
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error adding friend:", error);
      res.status(500).json({ error: "Failed to add friend" });
      return;
    }
    res.json(results);
  });
});

app.get("/friendsOfLab", (req, res) => {
  const { pat_id } = req.query;

  // Perform the database query
  const query = `
	  SELECT labs.username, labs.image, labs.email
	  FROM labs
	  INNER JOIN friends_of_labs ON labs.id = friends_of_labs.friend_lab_id
	  WHERE friends_of_labs.pat_id = ${mysql.escape(pat_id)}
	`;

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error executing the query: ", error);
      res
        .status(500)
        .json({ error: "An error occurred while executing the query." });
      return;
    }

    res.json(results);
  });
});

app.get("/friendsOfpatlab", (req, res) => {
  const { friend_lab_id } = req.query;

  // Perform the database query
  const query = `
	SELECT patients.email, patients.username, patients.image FROM patients
	INNER JOIN friends_of_labs ON patients.id = friends_of_labs.pat_id
	WHERE friends_of_labs.friend_lab_id = ${mysql.escape(friend_lab_id)}
	`;

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error executing the query: ", error);
      res
        .status(500)
        .json({ error: "An error occurred while executing the query." });
      return;
    }

    res.json(results);
  });
});
////////////////////////////////////////

app.get("/pharmacies", (req, res) => {
  const query = `SELECT * FROM pharmacies`;
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error getting doctors list:", error);
      res.status(500).json({ error: "Failed to get doctors list" });
      return;
    }
    res.json(results);
  });
});

app.post("/addfriendpharm", (req, res) => {
  const { pat_id, friend_pharm_id } = req.body;
  const query = `INSERT INTO friends_of_pharmacies  (pat_id,friend_pharm_id) 
  SELECT patients.id, pharmacies.id FROM patients 
  JOIN pharmacies ON pharmacies.id = ${mysql.escape(friend_pharm_id)} 
  AND patients.id = ${mysql.escape(pat_id)}
	`;
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error adding friend:", error);
      res.status(500).json({ error: "Failed to add friend" });
      return;
    }
    res.json(results);
  });
});

app.get("/friendsOfPharm", (req, res) => {
  const { pat_id } = req.query;

  // Perform the database query
  const query = `
	  SELECT pharmacies.username, pharmacies.image, pharmacies.email
	  FROM pharmacies
	  INNER JOIN friends_of_pharmacies ON pharmacies.id = friends_of_pharmacies.friend_pharm_id
	  WHERE friends_of_pharmacies.pat_id = ${mysql.escape(pat_id)}
	`;

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error executing the query: ", error);
      res
        .status(500)
        .json({ error: "An error occurred while executing the query." });
      return;
    }

    res.json(results);
  });
});

app.get("/friendsOfpatpharm", (req, res) => {
  const { friend_pharm_id } = req.query;

  // Perform the database query
  const query = `
	SELECT patients.email, patients.username, patients.image FROM patients
	INNER JOIN friends_of_pharmacies ON patients.id = friends_of_pharmacies.pat_id
	WHERE friends_of_pharmacies.friend_pharm_id = ${mysql.escape(friend_pharm_id)}
	`;

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error executing the query: ", error);
      res
        .status(500)
        .json({ error: "An error occurred while executing the query." });
      return;
    }

    res.json(results);
  });
});

// Route for sending a message

app.post("/message", (req, res) => {
  const { sender, receiver, message } = req.body;
  const timestamp = new Date().toLocaleTimeString().slice(0,5);

  const sql =
    `INSERT INTO messages (sender, receiver, message, timestamp) VALUES (?, ?, ?,${mysql.escape(timestamp)})`;
  connection.query(sql, [sender, receiver, message], (err, result) => {
    if (err) {
      console.error("Error sending message: " + err.stack);
      res
        .status(500)
        .json({ error: "An error occurred while sending the message." });

      return;
    }

    res.json({ message: "Message sent successfully." });
  });
});

app.get("/getmessage", (req, res) => {
  //const timestamp = new Date();
  const { sender,receiver, } = req.query;
  const sql =`SELECT message, sender, timestamp, id_message FROM messages WHERE (sender = ? AND receiver = ?)OR (sender = ?  AND receiver = ?) `;
  connection.query(
    sql,[sender,receiver,receiver,sender],(err, result) => {
      if (err) {
        console.error("Error sending message: " + err.stack);
        res
          .status(500)
          .json({ error: "An error occurred while sending the message." });
        return;
      }

      res.json(result);
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

