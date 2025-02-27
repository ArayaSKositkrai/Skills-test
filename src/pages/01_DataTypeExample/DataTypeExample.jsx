import React, { useState } from "react";

const DataTypeExample = () => {
  const [stringVar, setStringVar] = useState("");
  const [integerVar, setIntegerVar] = useState("");
  const [booleanVar, setBooleanVar] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [convertedInt, setConvertedInt] = useState(null);
  const [convertedFloat, setConvertedFloat] = useState(null);
  const [convertedString, setConvertedString] = useState("");
  const [list, setList] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [student, setStudent] = useState({ name: "", age: "", grade: "" });
  const [studentSet, setStudentSet] = useState(new Set());

  const handleInput = () => {
    console.log("String Variable:", stringVar);
    console.log("Integer Variable:", parseInt(integerVar));
    console.log("Boolean Variable:", booleanVar === "1");
  };

  const handleBooleanChange = (e) => {
    const value = e.target.value;
    if (value === "0" || value === "1") {
      setBooleanVar(value);
    }
  };

  const handleConversion = () => {
    setConvertedInt(parseInt(inputValue));
    setConvertedFloat(parseFloat(inputValue));
    setConvertedString(String(inputValue));
  };

  const addItem = () => {
    if (newItem.trim() === "") return;
    setList([...list, newItem]);
    setNewItem("");
  };

  const removeItem = (index) => {
    setList(list.filter((_, i) => i !== index));
  };

  const editItem = (index) => {
    const updatedItem = prompt("แก้ไขข้อมูล:", list[index]);
    if (updatedItem !== null) {
      const updatedList = [...list];
      updatedList[index] = updatedItem;
      setList(updatedList);
    }
  };

  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({ ...prevStudent, [name]: value }));
  };

  const submitStudent = () => {
    if (!student.name.trim() || !student.age.trim() || !student.grade.trim()) {
      alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }
    const studentTuple = JSON.stringify([
      student.name,
      student.age,
      student.grade,
    ]);
    if (studentSet.has(studentTuple)) {
      alert("ชื่อซ้ำ กรุณาใช้ชื่ออื่น");
      return;
    }
    setStudentSet(new Set(studentSet).add(studentTuple));
    setStudent({ name: "", age: "", grade: "" });
  };

  return (
    <div>
      <h3>
        <b>พื้นฐานของตัวแปรและชนิดข้อมูล</b>
      </h3><br />
      <h5><b>สร้างตัวแปรเก็บ string, integer, boolean</b></h5>
      <div style={{ marginBottom: "10px" }}>
        String : &nbsp;
        <input
          type="text"
          placeholder="Enter string"
          value={stringVar}
          onChange={(e) => setStringVar(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        Integer : &nbsp;
        <input
          type="number"
          placeholder="Enter integer"
          value={integerVar}
          onChange={(e) => setIntegerVar(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        Boolean : &nbsp;
        <input
          type="text"
          placeholder="Enter 0 or 1"
          value={booleanVar}
          onChange={handleBooleanChange}
        />
      </div>
      <button onClick={handleInput} style={{ backgroundColor: "lightblue" }}>Submit</button>
      <div>
        <br />
        <h5><b>ทดสอบการแปลงชนิดข้อมูล</b></h5>
        <input
          type="text"
          placeholder="Enter a value to convert"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        &nbsp;
        <button onClick={handleConversion} style={{ backgroundColor: "lightblue" }}>Convert</button>
        <p>Converted to Int : {convertedInt}</p>
        <p>Converted to Float : {convertedFloat}</p>
        <p>Converted to String : {convertedString}</p>
      </div>
      <hr />
      <div>
        <h3>
          <b>สร้างและใช้งานโครงสร้างข้อมูล</b>
        </h3>
        <br />
        <div>
          <h5><b>List & Array → เพิ่ม, ลบ, แก้ไขข้อมูลในลิสต์</b></h5>
          <input
            type="text"
            placeholder="เพิ่มข้อมูลในลิสต์"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          &nbsp;
          <button onClick={addItem} style={{ backgroundColor: "lightblue" }}>เพิ่ม</button>
          <ul>
            {list.map((item, index) => (
              <li key={index}>
                {item} &nbsp;
                <button onClick={() => editItem(index)}>แก้ไข</button>
                <button onClick={() => removeItem(index)}>ลบ</button>
              </li>
            ))}
          </ul>
        </div>
        <h5><b>
          Tuple & Set → ทดสอบสร้าง Tuple และใช้ Set เพื่อกำจัดค่าที่ซ้ำกัน
        </b></h5>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={student.name}
          onChange={handleStudentChange}
        />{" "}
        &nbsp;
        <input
          type="number"
          name="age"
          placeholder="Enter age"
          value={student.age}
          onChange={handleStudentChange}
        />{" "}
        &nbsp;
        <input
          type="number"
          name="grade"
          placeholder="Enter grade"
          value={student.grade}
          onChange={handleStudentChange}
        />{" "}
        &nbsp;
        <button onClick={submitStudent} style={{ backgroundColor: "lightblue" }}>Submit</button>
        <br />
        <h6>ข้อมูลนักเรียนที่บันทึกไว้</h6>
        <ul>
          {[...studentSet].map((s, index) => {
            const [name, age, grade] = JSON.parse(s);
            return (
              <li key={index}>
                Name: {name}, Age: {age}, Grade: {grade}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DataTypeExample;
