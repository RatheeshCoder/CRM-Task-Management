import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import toast, { Toaster } from 'react-hot-toast';

const Container = styled.div`
  margin: 2.5rem 3.5rem;
  border: 2px solid #929090;
  border-radius: 0.5rem;
  padding: 2rem;
  width: 70%;
  float: right;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: bold;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #929090;
  border-radius: 0.375rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #929090;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  border-radius: 0.5rem;
  background-color: #929090;
  padding: 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
  cursor: pointer;
  margin-top: 1rem;
  width: 100%;
`;

const ScrollableContainer = styled.div`
  max-height: 16rem;
  overflow-y: auto;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
`;

const AssignTask = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [subTasks, setSubTasks] = useState([{ title: '', tasks: [] }]);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [assignOption, setAssignOption] = useState('all');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/students');
      const data = await response.json();
      setStudents(data.students);
      setFilteredStudents(data.students);
    } catch (error) {
      toast.error('Error fetching students');
    }
  };

  const handleTaskTitleChange = (e) => setTaskTitle(e.target.value);

  const handleSubTaskChange = (index, field, value) => {
    const newSubTasks = [...subTasks];
    newSubTasks[index][field] = value;
    setSubTasks(newSubTasks);
  };

  const addSubTask = () => {
    setSubTasks([...subTasks, { title: '', tasks: [] }]);
  };

  const addTaskToSubTask = (index) => {
    const newSubTasks = [...subTasks];
    newSubTasks[index].tasks.push({ type: 'input', value: '' });
    setSubTasks(newSubTasks);
  };

  const handleTaskTypeChange = (subIndex, taskIndex, type) => {
    const newSubTasks = [...subTasks];
    newSubTasks[subIndex].tasks[taskIndex].type = type;
    setSubTasks(newSubTasks);
  };

  const handleTaskValueChange = (subIndex, taskIndex, value) => {
    const newSubTasks = [...subTasks];
    newSubTasks[subIndex].tasks[taskIndex].value = value;
    setSubTasks(newSubTasks);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    const filtered = students.filter(student =>
      student.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
      student.department.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredStudents(filtered);
  };

  const handleAssignOptionChange = (e) => setAssignOption(e.target.value);

  const handleStudentSelect = (studentId) => {
    const newSelectedStudents = [...selectedStudents];
    const index = newSelectedStudents.indexOf(studentId);
    if (index > -1) {
      newSelectedStudents.splice(index, 1);
    } else {
      newSelectedStudents.push(studentId);
    }
    setSelectedStudents(newSelectedStudents);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = { title: taskTitle, subTasks, assignOption, selectedStudents };
    try {
      await toast.promise(
        fetch('http://localhost:5000/api/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(task),
        }),
        {
          loading: 'Assigning Task...',
          success: 'Task assigned successfully!',
          error: 'Error assigning task.',
        }
      );
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container>
      <Title>Assign New Task</Title>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Task Title</Label>
          <Input
            type="text"
            value={taskTitle}
            onChange={handleTaskTitleChange}
            required
          />
        </FormGroup>
        {subTasks.map((subTask, subIndex) => (
          <FormGroup key={subIndex}>
            <Label>Sub Task Title</Label>
            <Input
              type="text"
              value={subTask.title}
              onChange={(e) => handleSubTaskChange(subIndex, 'title', e.target.value)}
              required
            />
            {subTask.tasks.map((task, taskIndex) => (
              <FormGroup key={taskIndex}>
                <Select
                  value={task.type}
                  onChange={(e) => handleTaskTypeChange(subIndex, taskIndex, e.target.value)}
                >
                  <option value="input">Input</option>
                  <option value="image">Image Upload</option>
                  <option value="file">File Upload</option>
                  <option value="url">URL</option>
                </Select>
                <Input
                  type="text"
                  value={task.value}
                  onChange={(e) => handleTaskValueChange(subIndex, taskIndex, e.target.value)}
                  placeholder={`Enter ${task.type}`}
                />
              </FormGroup>
            ))}
            <Button type="button" onClick={() => addTaskToSubTask(subIndex)}>
              Add Task
            </Button>
          </FormGroup>
        ))}
        <Button type="button" onClick={addSubTask}>
          Add Sub Task
        </Button>
        <FormGroup>
          <Label>Assign To</Label>
          <Select value={assignOption} onChange={handleAssignOptionChange}>
            <option value="all">All Students</option>
            <option value="selected">Selected Students</option>
          </Select>
          {assignOption === 'selected' && (
            <>
              <Input
                type="text"
                value={filter}
                onChange={handleFilterChange}
                placeholder="Filter students"
              />
              <ScrollableContainer>
                {filteredStudents.map((student) => (
                  <CheckboxLabel key={student._id}>
                    <Checkbox
                      type="checkbox"
                      checked={selectedStudents.includes(student._id)}
                      onChange={() => handleStudentSelect(student._id)}
                    />
                    <span>{student.name} - {student.department}</span>
                  </CheckboxLabel>
                ))}
              </ScrollableContainer>
            </>
          )}
        </FormGroup>
        <Button type="submit" $large>
          Assign Task
        </Button>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </Container>
  );
};

export default AssignTask;
