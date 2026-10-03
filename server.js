const express = require('express');
const crypto = require('crypto');

const app = express();
const PORT = 3001;

app.use(express.json());

// Allow Expo Web to communicate with the local API.
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8081');
  res.header(
    'Access-Control-Allow-Methods',
    'GET,POST,PUT,DELETE,OPTIONS'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

const USER = {
  id: 'u001',
  name: 'Allen Joseph Bucayong',
  email: 'allen@university.edu',
  role: 'student',
  studentId: 'STU-1001',
  course: 'Information Technology',
};

const STUDENTS = [
  {
    id: '1',
    name: 'Allen Joseph Bucayong',
    email: 'allen@university.edu',
    course: 'Information Technology',
  },
  {
    id: '2',
    name: 'John Santos',
    email: 'john.santos@university.edu',
    course: 'Information Technology',
  },
  {
    id: '3',
    name: 'Mark Reyes',
    email: 'mark.reyes@university.edu',
    course: 'Computer Science',
  },
  {
    id: '4',
    name: 'Ana Cruz',
    email: 'ana.cruz@university.edu',
    course: 'Information Technology',
  },
];

// SHA-256 hash of the demo password.
// Plain-text password is not stored.
const DEMO_PASSWORD_HASH =
  'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f';

const activeTokens = new Set();

const hashPassword = (password) => {
  return crypto
    .createHash('sha256')
    .update(password)
    .digest('hex');
};

const createToken = () => {
  return crypto.randomBytes(24).toString('hex');
};

const authenticate = (req) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }

  const token = authHeader.substring(7);

  return activeTokens.has(token);
};

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const passwordHash = hashPassword(password || '');

  if (
    email?.toLowerCase().trim() === USER.email &&
    passwordHash === DEMO_PASSWORD_HASH
  ) {
    const accessToken = createToken();

    activeTokens.add(accessToken);

    return res.json({
      accessToken,
      user: USER,
    });
  }

  return res.status(401).json({
    message: 'Invalid email or password.',
  });
});

app.get('/students', (req, res) => {
  if (!authenticate(req)) {
    return res.status(401).json({
      message: 'Unauthorized.',
    });
  }

  return res.json(STUDENTS);
});

app.get('/students/:id', (req, res) => {
  if (!authenticate(req)) {
    return res.status(401).json({
      message: 'Unauthorized.',
    });
  }

  const student = STUDENTS.find(
    (item) => item.id === req.params.id
  );

  if (!student) {
    return res.status(404).json({
      message: 'Student not found.',
    });
  }

  return res.json(student);
});

app.get('/profile', (req, res) => {
  if (!authenticate(req)) {
    return res.status(401).json({
      message: 'Unauthorized.',
    });
  }

  return res.json({
    user: USER,
  });
});

app.listen(PORT, () => {
  console.log(`Exam API running at http://localhost:${PORT}`);
});