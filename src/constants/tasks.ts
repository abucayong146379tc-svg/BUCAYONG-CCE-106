export type Task = {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: 'Pending' | 'Completed';
};

export const tasks: Task[] = [
  {
    id: '1',
    title: 'Create Network Diagram',
    subject: 'CCS 106 - Networking',
    dueDate: 'September 18, 2026',
    status: 'Pending',
  },
  {
    id: '2',
    title: 'Submit React Native Activity',
    subject: 'CCS 106 - Mobile Development',
    dueDate: 'September 19, 2026',
    status: 'Pending',
  },
  {
    id: '3',
    title: 'Study for Laboratory Exam',
    subject: 'Networking',
    dueDate: 'September 20, 2026',
    status: 'Completed',
  },
  {
    id: '4',
    title: 'Finish Research Paper',
    subject: 'Research',
    dueDate: 'September 22, 2026',
    status: 'Pending',
  },
  {
    id: '5',
    title: 'Prepare Presentation',
    subject: 'Disruptive Technology',
    dueDate: 'September 25, 2026',
    status: 'Completed',
  },
];

export function toggleTaskStatus(id: string) {
  const task = tasks.find((item) => item.id === id);

  if (task) {
    task.status =
      task.status === 'Pending'
        ? 'Completed'
        : 'Pending';
  }
}