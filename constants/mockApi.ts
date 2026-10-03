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

const MOCK_USERS: Record<string, { password: string; user: MockUser }> = {
  'allen@university.edu': {
    password: 'password123',
    user: {
      id: 'u001',
      name: 'Allen Joseph Bucayong',
      email: 'allen@university.edu',
      role: 'student',
      studentId: 'STU-1001',
      course: 'Information Technology',
    },
  },
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

    const account = MOCK_USERS[email.toLowerCase().trim()];

    if (!account || account.password !== password) {
      throw new Error('Invalid email or password.');
    }

    return {
      accessToken: makeToken(account.user),
      user: account.user,
    };
  },

  getProfile: async (token: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const decoded = parseToken(token);

    if (!decoded || Date.now() > decoded.exp) {
      throw { status: 401, message: 'Token expired or invalid.' };
    }

    const account = Object.values(MOCK_USERS).find(
      (item) => item.user.id === decoded.userId
    );

    if (!account) {
      throw { status: 404, message: 'User not found.' };
    }

    return {
      user: account.user,
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