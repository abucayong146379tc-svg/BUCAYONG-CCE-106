import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import TaskCard from '@/components/TaskCard';
import { tasks } from '@/constants/tasks';

export default function Tasks() {
  const [filter, setFilter] = useState<
    'All' | 'Pending' | 'Completed'
  >('All');

  const [, refresh] = useState(0);

  useFocusEffect(
    useCallback(() => {
      refresh((value) => value + 1);
    }, [])
  );

  const filteredTasks =
    filter === 'All'
      ? tasks
      : tasks.filter((task) => task.status === filter);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Tasks</Text>

      <View style={styles.filters}>
        {(['All', 'Pending', 'Completed'] as const).map(
          (item) => (
            <Pressable
              key={item}
              onPress={() => setFilter(item)}
              style={({ pressed }) => [
                styles.filterButton,
                filter === item && styles.activeFilter,
                pressed && styles.pressed,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === item && styles.activeFilterText,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          )
        )}
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard
            title={item.title}
            subject={item.subject}
            dueDate={item.dueDate}
            status={item.status}
            onPress={() =>
              router.push({
                pathname: '/task/[id]',
                params: { id: item.id },
              })
            }
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 35,
    marginBottom: 20,
  },

  filters: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 18,
  },

  filterButton: {
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#e5e5e5',
  },

  activeFilter: {
    backgroundColor: '#222',
  },

  filterText: {
    fontWeight: '600',
  },

  activeFilterText: {
    color: '#fff',
  },

  pressed: {
    opacity: 0.6,
  },
});