import React from "react";

function QuestionList({ questions, onDeleteQuestion }) {
  function handleDelete(id) {
    // Send DELETE request to the server
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          onDeleteQuestion(id); // Update the state in App to remove the question
        } else {
          console.error("Failed to delete question");
        }
      })
      .catch((error) => console.error("Error deleting question:", error));
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <h2>{question.prompt}</h2>
            <ol type="A">
              {question.answers.map((answer, index) => (
                <li key={index}>{answer}</li>
              ))}
            </ol>
            <button onClick={() => handleDelete(question.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
