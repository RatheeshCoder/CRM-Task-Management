// File path: AddNewStudent.jsx

import React, { useState } from "react";
import styled from "styled-components";
import toast, { Toaster } from 'react-hot-toast';

const Message = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Form = styled.form`
  margin: 2.5rem 3.5rem;
  border: 2px solid #929090;
  border-radius: 0.5rem;
`;

const Title = styled.div`
  margin-top: 2.5rem;
  text-align: center;
  font-weight: bold;
`;

const FormContent = styled.div`
  padding: 2rem;
`;

const FlexDiv = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const Input = styled.input`
  margin-top: 0.25rem;
  display: block;
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid #929090;
  background-color: transparent;
  padding: 1rem 0.75rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  &::placeholder {
    font-weight: 600;
    color: #929090;
  }
  &:focus {
    border-color: #000;
    outline: none;
    box-shadow: 0 0 0 1px #000;
  }
  @media (min-width: 640px) {
    font-size: 0.875rem;
  }
`;

const SubmitButton = styled.button`
  cursor: pointer;
  /* border-radius: 0.5rem; */
  background-color: #929090;
  padding: 1.25rem 2rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
  text-align: center;
  margin-top: 2.5rem;
  width: 100%;
`;

const AddNewStudent = () => {
  const [student, setStudent] = useState({
    name: "",
    department: "",
    fatherName: "",
    phoneNumber: "",
    collegeID: "",
    emailID: "",
    address: "",
    section: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      });
      if (response.ok) {
        toast.success('Student added successfully')
      } else {
        toast.error("Error adding student");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error adding student");
    }
  };

  return (
    <Message>
      <Form onSubmit={handleSubmit}>
        <Title>Add New Student</Title>
        <FormContent>
          <FlexDiv>
            <Input
              type="text"
              name="name"
              value={student.name}
              onChange={handleChange}
              placeholder="Full Name *"
              required
              style={{ width: "50%" }}
            />
            <Input
              type="email"
              name="emailID"
              value={student.emailID}
              onChange={handleChange}
              placeholder="Email *"
              required
              style={{ width: "50%" }}
            />
          </FlexDiv>
          <FlexDiv>
            <Input
              type="text"
              name="department"
              value={student.department}
              onChange={handleChange}
              placeholder="Department *"
              required
              style={{ width: "50%" }}
            />
            <Input
              type="text"
              name="fatherName"
              value={student.fatherName}
              onChange={handleChange}
              placeholder="Father's Name *"
              required
              style={{ width: "50%" }}
            />
          </FlexDiv>
          <FlexDiv>
            <Input
              type="text"
              name="phoneNumber"
              value={student.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number *"
              required
              style={{ width: "50%" }}
            />
            <Input
              type="text"
              name="collegeID"
              value={student.collegeID}
              onChange={handleChange}
              placeholder="College ID *"
              required
              style={{ width: "50%" }}
            />
          </FlexDiv>
          <FlexDiv>
            <Input
              type="text"
              name="address"
              value={student.address}
              onChange={handleChange}
              placeholder="Address *"
              required
              style={{ width: "100%" }}
            />
          </FlexDiv>
          <FlexDiv>
            <Input
              type="text"
              name="section"
              value={student.section}
              onChange={handleChange}
              placeholder="Section *"
              required
              style={{ width: "100%" }}
            />
          </FlexDiv>
          <SubmitButton type="submit">Add Student</SubmitButton>
        </FormContent>
      </Form>
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
    </Message>
  );
};

export default AddNewStudent;
