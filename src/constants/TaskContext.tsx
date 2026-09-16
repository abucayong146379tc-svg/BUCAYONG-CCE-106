import { createContext, useContext, useState } from 'react';

export type Task = {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: 'Pending' | 'Completed';
};

const initialTasks: Task[] = [
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

type TaskContextType = {
  tasks: Task[];
  toggleTaskStatus: (id: string) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

export function TaskProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTaskStatus = (id: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status:
                task.status === 'Pending'
                  ? 'Completed'
                  : 'Pending',
            }
          : task
      )
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, toggleTaskStatus }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error('useTasks must be used inside TaskProvider');
  }

  return context;
}