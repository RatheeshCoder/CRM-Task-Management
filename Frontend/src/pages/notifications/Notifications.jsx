import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import studentData from './studentData.json';
import Modal from '../../components/Modal/Modal.jsx';
import toast, { Toaster } from 'react-hot-toast';

const Container = styled.div`
  margin: 2.5rem 3.5rem;
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

const Table = styled.table`
  min-width: 100%;
  background-color: white;
`;

const TableHeader = styled.th`
  padding: 0.5rem 1rem;
`;

const TableCell = styled.td`
  border: 1px solid #929090;
  padding: 0.5rem 1rem;
`;

const Button = styled.button`
  border-radius: 0.5rem;
  background-color: ${props => props.$color || '#929090'};
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
  cursor: pointer;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #929090;
  border-radius: 0.375rem;
  margin-bottom: 0.5rem;
`;

const StudentDetails = () => {
  const [students, setStudents] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [isTaskDetailsModalOpen, setTaskDetailsModalOpen] = useState(false);
  const [isRejectionModalOpen, setRejectionModalOpen] = useState(false);

  useEffect(() => {
    fetchStudentDetails();
  }, []);

  const fetchStudentDetails = async () => {
    try {
      const data = studentData;
      const studentsWithPendingTasks = data.students.map(student => ({
        ...student,
        tasks: student.tasks.map(task => ({ ...task, pending: true }))
      }));
      setStudents(studentsWithPendingTasks);
    } catch (error) {
      toast.error('Error fetching student details:(');
    }
  };

  const handleVerify = (studentId, taskId) => {
    setStudents(prevStudents => 
      prevStudents.map(student => 
        student._id === studentId
          ? {
              ...student,
              tasks: student.tasks.map(task => 
                task._id === taskId
                  ? { ...task, pending: !task.pending }
                  : task
              )
            }
          : student
      )
    );
    toast.success(`Task with ID ${taskId} verified!`);
  };

  const handleReject = (task) => {
    setSelectedTask(task);
    setRejectionModalOpen(true);
  };

  const handleSendRejection = () => {
    toast.error(`Rejection message sent for task with ID ${selectedTask._id}`);
    setSelectedTask(null);
    setRejectionReason('');
    setRejectionModalOpen(false);
    fetchStudentDetails();
  };

  const openTaskDetailsModal = (task) => {
    setSelectedTask(task);
    setTaskDetailsModalOpen(true);
  };

  const closeTaskDetailsModal = () => {
    setSelectedTask(null);
    setTaskDetailsModalOpen(false);
  };

  return (
    <Container>
      <Title>Student Details</Title>
      <div style={{ overflowX: 'auto' }}>
        <Table>
          <thead>
            <tr>
              <TableHeader>Student Name</TableHeader>
              <TableHeader>Task Name</TableHeader>
              <TableHeader>View Details</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Rejected</TableHeader>
            </tr>
          </thead>
          <tbody>
            {students.map((student) =>
              student.tasks.map((task) => (
                <tr key={task._id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>
                    <Button $color="#4a91e298" onClick={() => openTaskDetailsModal(task)}>
                      View Details
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button 
                      $color={task.pending ? "#ffa6007d" : "#50c87881"} 
                      onClick={() => handleVerify(student._id, task._id)}
                    >
                      {task.pending ? "Pending" : "Verify"}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button $color="#ff634775" onClick={() => handleReject(task)}>
                      Reject
                    </Button>
                  </TableCell>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      <Modal isOpen={isTaskDetailsModalOpen} onClose={closeTaskDetailsModal}>
        {selectedTask && (
          <div>
            <Title>{selectedTask.title}</Title>
            {selectedTask.subTasks.map((subTask, index) => (
              <div key={index} style={{ marginBottom: '0.5rem' }}>
                <h4 style={{ fontWeight: '600' }}>{subTask.title}</h4>
                <ul style={{ listStyleType: 'disc', marginLeft: '1rem' }}>
                  {subTask.tasks.map((taskDetail, idx) => (
                    <li key={idx}>{`${taskDetail.type.charAt(0).toUpperCase() + taskDetail.type.slice(1)}: ${taskDetail.value}`}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </Modal>

      <Modal isOpen={isRejectionModalOpen} onClose={() => setRejectionModalOpen(false)}>
        <div>
          <Title>Rejection Reason</Title>
          <TextArea
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            rows="4"
          />
          <Button $color="#FF6347" onClick={handleSendRejection}>
            Send Rejection Message
          </Button>
        </div>
      </Modal>
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
    </Container>
  );
};

export default StudentDetails;