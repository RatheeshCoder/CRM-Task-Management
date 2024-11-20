// JobDescriptionGenerator.js

import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import toast, { Toaster } from "react-hot-toast";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;

const FormGroup = styled.div`
  height: fit-content;
  max-height: 150px;
  overflow: auto;
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  min-height: 100px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #929090;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 15px;

  &:hover {
    background-color: #929090b7;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
`;

const Container = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
`;

const JobDescriptionGenerator = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobResponsibilities, setJobResponsibilities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateJobContent = async () => {
    if (!jobTitle.trim()) {
      toast.error("Please enter a job title");
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading("Generating job content...");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/generate-job-content",
        {
          jobTitle,
        }
      );

      console.log("API Response:", response.data);

      setJobDescription(response.data.jobDescription || "");
      setJobResponsibilities(response.data.jobResponsibilities || []);
      toast.success("Job content generated successfully", { id: toastId });
    } catch (error) {
      console.error("Error generating job content:", error);
      toast.error(
        "Error generating job content: " +
          (error.response?.data?.error || error.message),
        { id: toastId }
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Title:", jobTitle);
    console.log("Job Description:", jobDescription);
    toast.success("Job description saved");
  };
  console.log("Job Responsibilities:", jobResponsibilities[10]);

  return (
    <Container>
      <Title>Generate Job Description for Freshers</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input
            id="jobTitle"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Enter the job title"
            disabled={isLoading}
            required
          />
        </FormGroup>
        <Button type="button" onClick={generateJobContent} disabled={isLoading}>
          Generate Job Content
        </Button>
        <FormGroup>
          <Label htmlFor="jobDescription">Job Description</Label>
          <TextArea
            id="jobDescription"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Job description will appear here..."
            disabled={isLoading}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Job Responsibilities</Label>
          <ul>
            {jobResponsibilities.length > 0 ? (
              jobResponsibilities.map((responsibility, index) => (
                <li key={index}>{responsibility}</li>
              ))
            ) : (
              <li>No responsibilities generated yet.</li>
            )}
          </ul>
        </FormGroup>
        <Button type="submit" disabled={isLoading || !jobDescription}>
          Save Job Description
        </Button>
      </Form>
      <Toaster position="top-center" reverseOrder={false} />
    </Container>
  );
};

export default JobDescriptionGenerator;
