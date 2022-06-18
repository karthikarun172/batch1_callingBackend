import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Card from "./Components/Card";

function App() {
  const initialValue = { title: "", brief: "", priority: "" };

  const [formValue, setFormValue] = useState(initialValue);
  const [updatedID, setUpdatedID] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const [dataValue, setDataValue] = useState([]);

  useEffect(() => {
    getData();
  }, [dataValue]);

  const getData = async () => {
    const { data } = await axios.get(
      "https://guarded-crag-39247.herokuapp.com/api/todo"
    );
    setDataValue(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post("https://guarded-crag-39247.herokuapp.com/api/todo", formValue)
      .then(() => console.log("done"));
  };

  const handleDelete = async (id_Value) => {
    await axios.delete(
      `https://guarded-crag-39247.herokuapp.com/api/todo/${id_Value}`
    );
  };

  const handleSelectUpdate = (id) => {
    const SelectedData = dataValue.find((c) => c._id === id);

    const UpdatedData = {
      title: SelectedData.title,
      priority: SelectedData.priority,
      brief: SelectedData.brief,
    };

    setUpdatedID(SelectedData._id);
    setFormValue(UpdatedData);

    // console.log(SelectedData);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `https://guarded-crag-39247.herokuapp.com/api/todo/${updatedID}`,
        formValue
      )
      .then(() => setFormValue(initialValue));
  };

  return (
    <div className="App">
      <h2>hello world</h2>

      <form>
        <input
          value={formValue.title}
          placeholder="Title"
          name="title"
          onChange={handleChange}
        ></input>
        <input
          value={formValue.brief}
          placeholder="brief"
          name="brief"
          onChange={handleChange}
        ></input>
        <input
          value={formValue.priority}
          placeholder="priority"
          name="priority"
          onChange={handleChange}
        ></input>
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          sumbit
        </button>
        <button type="submit" onClick={(e) => handleUpdate(e)}>
          Update
        </button>
      </form>
      <ul>
        {dataValue.map((d) => (
          <Card
            onDelete={() => handleDelete(d._id)}
            onUpdate={() => handleSelectUpdate(d._id)}
            key={d._id}
            title={d.title}
            brief={d.brief}
            priority={d.priority}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
