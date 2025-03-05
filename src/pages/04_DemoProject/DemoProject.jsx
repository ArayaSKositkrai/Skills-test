import { useState, useEffect } from "react";
import axios from "axios";

function DemoProject() {
  const [subjects, setSubjects] = useState({
    CSI101: { score: "", credits: "3" },
    CSI102: { score: "", credits: "3" },
    CSI203: { score: "", credits: "3" },
    CSI204: { score: "", credits: "3" },
    CSI305: { score: "", credits: "3" },
  });
  const [gpa, setGpa] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userError, setUserError] = useState(null);
  const [lotteryNumber, setLotteryNumber] = useState("");
  const [generatedNumber, setGeneratedNumber] = useState("");
  const [result, setResult] = useState("");
  const [count, setCount] = useState(0); // เก็บค่าจำนวนที่กรอก

  useEffect(() => {
    try {
      const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
      if (Array.isArray(savedTodos)) {
        setTodos(savedTodos);
      }
    } catch (e) {
      console.error("Error reading localStorage", e);
      setTodos([]); 
    }
  }, []);

useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setUserError(error.message);
        setLoading(false);
      });
  }, []);


  const [todos, setTodos] = useState(() => {
    return JSON.parse(localStorage.getItem("todos")) || [];
  });
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
      if (Array.isArray(savedTodos)) {
        setTodos(savedTodos);
      }
    } catch (e) {
      console.error("Error reading localStorage", e);
      setTodos([]);
    }
  }, []);

  const addTodo = () => {
    if (inputValue.trim() === "") return;
    if (todos.some((todo) => todo.text === inputValue.trim())) {
      alert("ข้อมูลซ้ำ! กรุณาเพิ่มรายการที่ไม่ซ้ำกัน");
      setError("ข้อมูลซ้ำ");
      return;
    }
    const newTodos = [...todos, { text: inputValue.trim(), status: "waiting" }];
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setInputValue("");
    setError("");
  };

  const toggleStatus = (index) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, status: todo.status === "waiting" ? "success" : "waiting" } : todo
    );
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const removeTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };


  const handleInputChange = (subject, field, value) => {
    if (
      field === "score" &&
      (value === "" || (Number(value) >= 0 && Number(value) <= 100))
    ) {
      setSubjects({
        ...subjects,
        [subject]: { ...subjects[subject], [field]: value },
      });
    } else if (field === "credits" && (value === "" || Number(value) > 0)) {
      setSubjects({
        ...subjects,
        [subject]: { ...subjects[subject], [field]: value },
      });
    }
  };

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    Object.keys(subjects).forEach((subject) => {
      const score = Number(subjects[subject].score);
      const credits = Number(subjects[subject].credits);
      if (!isNaN(score) && !isNaN(credits)) {
        let gradePoint = 0;
        if (score >= 80) gradePoint = 4.0;
        else if (score >= 75) gradePoint = 3.5;
        else if (score >= 70) gradePoint = 3.0;
        else if (score >= 65) gradePoint = 2.5;
        else if (score >= 60) gradePoint = 2.0;
        else if (score >= 55) gradePoint = 1.5;
        else if (score >= 50) gradePoint = 1.0;
        totalPoints += gradePoint * credits;
        totalCredits += credits;
      }
    });
    setGpa(totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : null);
  };

  const generateLotteryNumbers = () => {
    const randomNumber = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedNumber(randomNumber);
    setResult("");
  };

  const checkLottery = () => {
    if (lotteryNumber === "000000") {
      setResult("ยินดีด้วย! คุณถูกรางวัล 🎉");
    } else if (lotteryNumber === generatedNumber) {
      setResult("ยินดีด้วย! คุณถูกรางวัล 🎉");
    } else {
      setResult(`เสียใจด้วย เลขที่ออกคือ : ${generatedNumber}`);
    }
  };

  return (
    <div>
      <div>
      <h3><b><center>Demo Project</center></b></h3>
      <h5><b><center>To-Do List Web App</center></b></h5>
      <div style={{ textAlign: "center", padding: "20px", maxWidth: "400px", margin: "auto" }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task..."
          style={{ padding: "8px", width: "70%", marginRight: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button onClick={addTodo} style={{ padding: "8px", borderRadius: "5px", background: "lightblue", color: "black", border: "none" }}>Add</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <table style={{ width: "50%", margin: "auto", borderCollapse: "collapse", textAlign: "center", background: "lightblue", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", borderRadius: "10px", overflow: "hidden" }}>
        <thead>
          <tr style={{ background: "#ADD8E6", color: "black" }}>
            <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>Task</th>
            <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>Status</th>
            <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={index} style={{ background: index % 2 === 0 ? "#f9f9f9" : "#fff" }}>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{todo.text}</td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                <button onClick={() => toggleStatus(index)} style={{ background: todo.status === "waiting" ? "orange" : "green", color: "white", border: "none", borderRadius: "20px", padding: "5px" }}>
                  {todo.status}
                </button>
              </td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                <button onClick={() => removeTodo(index)} style={{ background: "red", color: "white", border: "none", borderRadius: "20px", padding: "5px" }}>x</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      <hr />
      <h5>
        <b>
          <center>Student Grade Calculator</center>
        </b>
      </h5>
      <table
        style={{
          width: "60%",
          margin: "auto",
          borderCollapse: "collapse",
          textAlign: "center",
          background: "#fff",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr style={{ background: "#ADD8E6", color: "black" }}>
            <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>
              รหัสวิชา
            </th>
            <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>
              คะแนนที่ได้
            </th>
            <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>
              หน่วยกิต
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(subjects).map((subject, index) => (
            <tr
              key={subject}
              style={{ background: index % 2 === 0 ? "#f9f9f9" : "#fff" }}
            >
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                {subject}
              </td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                <input
                  type="number"
                  value={subjects[subject].score}
                  onChange={(e) =>
                    handleInputChange(subject, "score", e.target.value)
                  }
                  style={{
                    width: "60px",
                    padding: "5px",
                    textAlign: "center",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
              </td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                <input
                  type="number"
                  value={subjects[subject].credits}
                  onChange={(e) =>
                    handleInputChange(subject, "credits", e.target.value)
                  }
                  style={{
                    width: "60px",
                    padding: "5px",
                    textAlign: "center",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ textAlign: "center", padding: "20px" }}>
        <button
          onClick={calculateGPA}
          style={{
            padding: "10px",
            borderRadius: "5px",
            background: "#ADD8E6",
            color: "black",
            border: "none",
          }}
        >
          Calculate GPA
        </button>
        {gpa !== null && <p>Your GPA: {gpa}</p>}
      </div>
      <hr />
      <div>
      <h3>
        <b>รายชื่อผู้ใช้</b>
      </h3>
      <input
        type="number"
        className="OK"
        value={count}
        onChange={(e) => setCount(Number(e.target.value))} // อัปเดตค่าจำนวนที่กรอก
      />
      {loading ? (
        <p>Loading...</p>
      ) : userError ? (
        <p>Error: {userError}</p>
      ) : (
        <ul>
          {users.slice(0, count).map((user) => (
            <li key={user.id}>
              <h5>{user.name}</h5>
              <p>
                <strong>Email :</strong> {user.email}
              </p>
              <p>
                <strong>Address :</strong> {user.address.street},{" "}
                {user.address.city}
              </p>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
      <hr />
      <div>
        <h3>
          <b><center>Lottery Generator</center></b>
        </h3>
        <div style={{ textAlign: "center" }}>
          <input
            type="text"
            value={lotteryNumber}
            onChange={(e) => {
              if (/^\d{0,6}$/.test(e.target.value)) {
                setLotteryNumber(e.target.value);
              }
            }}
            style={{ width: "150px", textAlign: "center", borderRadius: "10px" }}
            maxLength="6"
            placeholder="กรอกเลข 6 หลัก"
          />
          <div style={{ margin: "10px" }}>
            <button onClick={generateLotteryNumbers} style={{ backgroundColor: "lightblue" }}>Generate</button>
            <button onClick={checkLottery} style={{ marginLeft: "10px", backgroundColor: "lightblue" }}>
              Check
            </button>
          </div>
          {result && <p>{result}</p>}
        </div>
      </div>
    </div>
  );
}

export default DemoProject;