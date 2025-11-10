// Test script for backend priority API
const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3030/api';

async function testPriorityAPI() {
  console.log('Testing Priority API endpoints...\n');
  
  try {
    // Test 1: Create task with P1 priority
    console.log('1. Creating task with P1 priority...');
    const createResponse = await fetch(`${BASE_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'High Priority Task',
        description: 'This is a P1 task',
        priority: 'P1'
      })
    });
    const newTask = await createResponse.json();
    console.log('Created task:', newTask);
    
    // Test 2: Create task with default priority (P3)
    console.log('\n2. Creating task with default priority...');
    const defaultResponse = await fetch(`${BASE_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Default Priority Task',
        description: 'This should get P3'
      })
    });
    const defaultTask = await defaultResponse.json();
    console.log('Created task:', defaultTask);
    
    // Test 3: Update task priority using PUT
    console.log('\n3. Updating task priority using PUT...');
    const updateResponse = await fetch(`${BASE_URL}/tasks/${newTask.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Updated High Priority Task',
        description: 'Now changed to P2',
        priority: 'P2'
      })
    });
    const updatedTask = await updateResponse.json();
    console.log('Updated task:', updatedTask);
    
    // Test 4: Get all tasks
    console.log('\n4. Getting all tasks...');
    const listResponse = await fetch(`${BASE_URL}/tasks`);
    const tasks = await listResponse.json();
    console.log('All tasks:', tasks);
    
    // Test 5: Try invalid priority
    console.log('\n5. Testing invalid priority (should fail)...');
    const invalidResponse = await fetch(`${BASE_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Invalid Priority Task',
        priority: 'P4'
      })
    });
    const invalidResult = await invalidResponse.json();
    console.log('Invalid priority result:', invalidResult);
    
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testPriorityAPI();