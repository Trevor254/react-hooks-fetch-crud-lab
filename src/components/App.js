import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List"); // Tracks current page (Form or List)
  const [questions, setQuestions] = useState([]); // Manages question data

  // Fetch questions on component mount
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  // Function to handle adding a new question
  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]); // Add the new question to the existing list
  }

  // Function to handle deleting a question
  function handleDeleteQuestion(id) {
    // Send DELETE request to the API
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        // Remove the question from state after it's deleted on the server
        setQuestions(questions.filter((question) => question.id !== id));
      })
      .catch((error) => console.error("Error deleting question:", error));
  }
  
  function handleCorrectAnswerChange(id, newCorrectIndex) {
    const updatedQuestions = questions.map((question) => {
      if (question.id === id) {
        // Update the correct answer
        return { ...question, correctIndex: newCorrectIndex };
      }
      return question;
    });
  
    // Send PATCH request to update the question on the server
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
      .then(() => {
        // Update state to reflect the change
        setQuestions(updatedQuestions);
      })
      .catch((error) => console.error("Error updating correct answer:", error));
  }
  

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList questions={questions} onDeleteQuestion={handleDeleteQuestion} />
      )}
    </main>
  );
}

export default App;
