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
    setQuestions(questions.filter((question) => question.id !== id)); // Remove the deleted question from state
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
