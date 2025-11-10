import React, { useState } from 'react';
import { CssBaseline, Container, AppBar, Toolbar, Typography, Box } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

function App() {
  const [editingTask, setEditingTask] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Helper functions for localStorage
  const getTasks = () => {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  };

  const saveTasks = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const handleSave = async (task) => {
    try {
      if (editingTask) {
        // Edit existing task using PUT request
        const response = await fetch(`/api/tasks/${editingTask.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: task.title,
            description: task.description,
            due_date: task.due_date,
            priority: task.priority || 'P3'
          })
        });
        
        if (!response.ok) {
          throw new Error('Failed to update task');
        }
        
        const updatedTask = await response.json();
        
        // Also update localStorage for consistency
        const tasks = getTasks();
        const updatedTasks = tasks.map(t => 
          t.id === editingTask.id ? updatedTask : t
        );
        saveTasks(updatedTasks);
        setEditingTask(null);
      } else {
        // Add new task using POST request
        const response = await fetch('/api/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: task.title,
            description: task.description,
            due_date: task.due_date,
            priority: task.priority || 'P3'
          })
        });
        
        if (!response.ok) {
          throw new Error('Failed to create task');
        }
        
        const newTask = await response.json();
        
        // Also update localStorage for consistency
        const tasks = getTasks();
        saveTasks([...tasks, newTask]);
      }
      
      setRefreshKey(k => k + 1);
    } catch (error) {
      console.error('Error saving task:', error);
      // Fallback to localStorage only if backend is unavailable
      const tasks = getTasks();
      
      if (editingTask) {
        const updatedTasks = tasks.map(t => 
          t.id === editingTask.id ? { ...task, id: editingTask.id, completed: t.completed } : t
        );
        saveTasks(updatedTasks);
        setEditingTask(null);
      } else {
        const newTask = {
          ...task,
          id: Date.now().toString(),
          completed: false,
          priority: task.priority || 'P3'
        };
        saveTasks([...tasks, newTask]);
      }
      
      setRefreshKey(k => k + 1);
    }
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: '#f5f5f5',
          pb: 4
        }}
      >
        <AppBar
          position="static"
          sx={{
            background: '#1976d2',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Toolbar>
            <CheckCircleOutlineIcon sx={{ mr: 2, fontSize: 28 }} />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                letterSpacing: '0.5px'
              }}
            >
              TODO App
            </Typography>
          </Toolbar>
        </AppBar>
        <Container 
          maxWidth="md" 
          sx={{ 
            mt: 4,
            height: 'calc(100vh - 120px)', 
            display: 'flex', 
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          <Box sx={{ mb: 2, flexShrink: 0 }}>
            <TaskForm onSave={handleSave} initialTask={editingTask} />
          </Box>
          <Box sx={{ flexGrow: 1, minHeight: 0, overflow: 'hidden' }}>
            <TaskList key={refreshKey} onEdit={setEditingTask} />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default App;
