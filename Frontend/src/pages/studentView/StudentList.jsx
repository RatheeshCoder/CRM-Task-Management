import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import StudentCard from './StudentCard';
import StudentModal from './StudentModal';

const Container = styled.div`
  padding: 1rem;
  width: 78%;
  float: right;
  display: flex;
  justify-content: end;
  flex-direction: column;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const PaginationContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  margin-right: ${props => props.$isNext ? '0' : '0.5rem'};
  border-radius: 0.5rem;
  background-color: #929090;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: white;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Title = styled.h1`
  
  font-size: 1.5rem;
  font-weight: 600;
`

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetchStudents(page);
  }, [page]);

  const fetchStudents = async (page) => {
    try {
      const response = await fetch(`http://localhost:5000/api/students?page=${page}&limit=10`);
      const data = await response.json();
      setStudents(data.students);
      setTotalPages(data.pages);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
  };

  const closeModal = () => {
    setSelectedStudent(null);
  };

  return (
    <Container>

      <Title>All Student</Title>
      <Grid>
        {students.map((student) => (
          <StudentCard key={student._id} student={student} onView={handleViewStudent} />
        ))}
      </Grid>
      <PaginationContainer>
        <Button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button
          $isNext
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </PaginationContainer>
      {selectedStudent && <StudentModal student={selectedStudent} onClose={closeModal} />}
    </Container>
  );
};

export default StudentList;