export type MockUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  studentId: string;
  course: string;
};

export type MockStudent = {
  id: string;
  name: string;
  email: string;
  course: string;
};

const MOCK_USER: MockUser = {
  id: 'u001',
  name: 'Allen Joseph Bucayong',
  email: 'allen@university.edu',
  role: 'student',
  studentId: 'STU-1001',
  course: 'Information Technology',
};

const MOCK_STUDENTS: MockStudent[] = [
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

// SHA-256 hash of the demo login password.
// The plaintext password is not stored in the project.
const DEMO_PASSWORD_HASH =
  'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f';

const hashPassword = async (password: string) => {
  const data = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);

  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
};

const makeToken = (user: MockUser) => {
  const payload = btoa(
    JSON.stringify({
      userId: user.id,
      exp: Date.now() + 300000,
    })
  );

  return `mockHeader.${payload}.signature`;
};

const parseToken = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
};

export const MockApi = {
  login: async (email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const passwordHash = await hashPassword(password);

    if (
      email.toLowerCase().trim() !== MOCK_USER.email ||
      passwordHash !== DEMO_PASSWORD_HASH
    ) {
      throw new Error('Invalid email or password.');
    }

    return {
      accessToken: makeToken(MOCK_USER),
      user: MOCK_USER,
    };
  },

  getProfile: async (token: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const decoded = parseToken(token);

    if (!decoded || Date.now() > decoded.exp) {
      throw { status: 401, message: 'Token expired or invalid.' };
    }

    if (decoded.userId !== MOCK_USER.id) {
      throw { status: 401, message: 'Token is invalid.' };
    }

    return {
      user: MOCK_USER,
    };
  },

  getStudents: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_STUDENTS;
  },

  getStudent: async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const student = MOCK_STUDENTS.find((item) => item.id === id);

    if (!student) {
      throw { status: 404, message: 'Student not found.' };
    }

    return student;
  },
};