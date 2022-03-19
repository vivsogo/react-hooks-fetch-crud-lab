import React from "react";

function QuestionItem({ question, handleDeleteEvent, handleUpdateEvent }) {
  const { id, prompt, answers, correctIndex } = question;
  const [ updateIndex, setUpdateIndex ] = useState(correctIndex)

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));
  function handleDelete() {
    handleDeleteEvent(question.id)
  }
  function handleUpdate(e) {
    setUpdateIndex(e.target.value)
    handleUpdateEvent(question.id, e.target.value)
  //   // console.log(question.correctIndex)
  //   // setUpdateIndex(e.target.value)
  //   handleUpdateEvent(question.id, e.target.value)
  }


  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleUpdate} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
