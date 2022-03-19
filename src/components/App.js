import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [ questions, setQuestions ] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
        .then(resp=> resp.json())
        .then(setQuestions)
  },[])
  function handleSubmitEvent(formData) {

    fetch("http://localhost:4000/questions", {
      method : "POST",
      headers : {
         "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        "prompt" : formData.prompt,
        "answers" : [formData.answer1, formData.answer2, formData.answer3, formData.answer4], 
        "correctIndex" : formData.correctIndex 
      })
    })
    setQuestions([ ...questions, formData ])
  }
  function handleDeleteEvent(id) {
    // console.log(id)
    fetch(`http://localhost:4000/questions/${id}`, {
      method : "DELETE"
    })

    const deletedList = questions.filter(question => question.id !== id)
    setQuestions(deletedList)
  }

  function handleUpdateEvent(id, value) {
    // console.log(id)
    // console.log(value)
  fetch(`http://localhost:4000/questions/${id}`, {
  method: "PATCH",
  headers: {
    "Content-Type" : "application/json"
  },
  body: JSON.stringify({
    "correctIndex": value
    })
  })
  .then(resp=>resp.json()).then((question) => {
    console.log(question)
    //find index of item
    const updatedAnswer = question.correctIndex
    console.log(updatedAnswer)
    //use spread operator to create a copy of the questions array
    const updatedQuestions = [ ...questions ]
    //replace index of the copy with the new question
    updatedQuestions.map(question => {
      if(question.id === id) {
        question.correctIndex = updatedAnswer
      } else {
        return true
      }
    })
    //use setQuestions to update the questions
    setQuestions(updatedQuestions)
  }
  )
}


  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm handleSubmitEvent={handleSubmitEvent}/> : <QuestionList questions={questions} handleDeleteEvent={handleDeleteEvent} handleUpdateEvent={handleUpdateEvent}
      />}
    </main>
  );
}

export default App;
