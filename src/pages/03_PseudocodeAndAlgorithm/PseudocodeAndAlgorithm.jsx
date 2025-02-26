import { useState } from "react";

function PseudocodeAndAlgorithm() {
  const [radius, setRadius] = useState("");
  const [area, setArea] = useState(null);
  const [age, setAge] = useState("");
  const [category, setCategory] = useState("");
  const [number, setNumber] = useState("");
  const [parity, setParity] = useState("");
  const [userInput, setUserInput] = useState("");
  const [inputHistories, setInputHistories] = useState([[]]);
  const [forLoopNumbers, setForLoopNumbers] = useState([]);
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [sortedRandomNumbers, setSortedRandomNumbers] = useState([]);
  const [factorialNumber, setFactorialNumber] = useState("");
  const [factorialResult, setFactorialResult] = useState(null);
  const [fibonacciNumber, setFibonacciNumber] = useState("");
  const [fibonacciResult, setFibonacciResult] = useState(null);

  const generateRandomNumbers = () => {
    let numbers = Array.from({ length: 100 }, () =>
      Math.floor(Math.random() * 1000)
    );
    setRandomNumbers(numbers);
    setSortedRandomNumbers([]); // Reset sorted numbers when generating new ones
  };

  const sortRandomNumbers = () => {
    setSortedRandomNumbers([...randomNumbers].sort((a, b) => a - b));
  };

  const calculateArea = () => {
    try {
      const r = parseFloat(radius);
      console.log("Radius Input:", r);
      if (!isNaN(r) && r > 0) {
        setArea(3.14 * r * r);
      } else {
        throw new Error("Invalid radius value");
      }
    } catch (error) {
      console.error("Error calculating area:", error);
      setArea(null);
    }
  };

  const checkAgeCategory = () => {
    const ageNum = parseInt(age);
    if (!isNaN(ageNum)) {
      if (ageNum < 13) {
        setCategory("เด็ก");
      } else if (ageNum >= 13 && ageNum <= 19) {
        setCategory("วัยรุ่น");
      } else {
        setCategory("ผู้ใหญ่");
      }
    } else {
      setCategory("");
    }
  };

  const checkParity = () => {
    const num = parseInt(number);
    if (!isNaN(num)) {
      setParity(num % 2 === 0 ? "เลขคู่" : "เลขคี่");
    } else {
      setParity("");
    }
  };

  const generateForLoopNumbers = () => {
    let numbers = [];
    for (let i = 1; i <= 10; i++) {
      numbers.push(i);
    }
    setForLoopNumbers(numbers);
  };

  const handleUserInput = () => {
    if (userInput.toLowerCase() === "exit") {
      setInputHistories([...inputHistories, []]);
    } else {
      let newHistories = [...inputHistories];
      newHistories[newHistories.length - 1] = [
        ...newHistories[newHistories.length - 1],
        userInput,
      ];
      setInputHistories(newHistories);
    }
    setUserInput("");
  };

  const [numbers, setNumbers] = useState("");
  const [sortedNumbers, setSortedNumbers] = useState([]);

  const bubbleSort = (arr) => {
    let len = arr.length;
    for (let i = 0; i < len - 1; i++) {
      for (let j = 0; j < len - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return arr;
  };

  const handleSort = () => {
    let numArray = numbers
      .split(",")
      .map((num) => parseInt(num.trim()))
      .filter((num) => !isNaN(num));
    setSortedNumbers(bubbleSort([...numArray]));
  };

  const factorial = (n) => {
    if (n < 0) return "Undefined";
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
  };

  const calculateFactorial = () => {
    const num = parseInt(factorialNumber);
    if (!isNaN(num)) {
      setFactorialResult(factorial(num));
    } else {
      setFactorialResult("Invalid input");
    }
  };

  const fibonacci = (n) => {
    if (n < 0) return "Undefined";
    if (n === 0) return 0;
    if (n === 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
  };

  const calculateFibonacci = () => {
    const num = parseInt(fibonacciNumber);
    if (!isNaN(num)) {
      setFibonacciResult(fibonacci(num));
    } else {
      setFibonacciResult("Invalid input");
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">03 Pseudocode and Algorithm</h3>
      <h5 className="text-xl font-bold mt-4">Calculate Area of Circle (มี console, Try-Catch)</h5>
      <input
        type="number"
        value={radius}
        onChange={(e) => setRadius(e.target.value)}
        placeholder="Enter radius"
        className="border p-2 w-full rounded"
      />
      &nbsp;
      <button
        onClick={calculateArea}
        className="mt-2 bg-blue-500 text-black p-2 rounded w-full"
      >
        Calculate Area
      </button>
      &nbsp;
      {area !== null && (
        <p className="mt-2 text-lg">Area : {area.toFixed(2)}</p>
      )}
      <hr />
      <h5 className="text-xl font-bold mt-4">Check Age Category</h5>
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Enter age"
        className="border p-2 w-full rounded"
      />
      &nbsp;
      <button
        onClick={checkAgeCategory}
        className="mt-2 bg-green-500 text-black p-2 rounded w-full"
      >
        Check Age
      </button>
      {category && <p className="mt-2 text-lg">Category : {category}</p>}
      <hr />
      <h5 className="text-xl font-bold mt-4">Check Even or Odd</h5>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Enter a number"
        className="border p-2 w-full rounded"
      />
      &nbsp;
      <button
        onClick={checkParity}
        className="mt-2 bg-red-500 text-black p-2 rounded w-full"
      >
        Check Number
      </button>
      {parity && <p className="mt-2 text-lg">Number is : {parity}</p>}
      <hr />
      <h5>For Loop : Display Numbers 1-10</h5>
      <button
        onClick={generateForLoopNumbers}
        className="mt-2 bg-purple-500 text-black p-2 rounded w-full"
      >
        Generate Numbers
      </button>
      <p>{forLoopNumbers.join(", ")}</p>
      <hr />
      <h5>While Loop : User Input</h5>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Type something (type 'exit' to reset)"
        className="border p-2 w-full rounded"
      />
      &nbsp;
      <button
        onClick={handleUserInput}
        className="mt-2 bg-yellow-500 text-black p-2 rounded w-full"
      >
        Submit Input
      </button>
      {inputHistories.map((history, index) => (
        <p key={index} className="mt-2 text-lg">
          Input History {index + 1} : {history.join(", ")}
        </p>
      ))}
      <hr />
      <div>
        <h5 className="text-xl font-bold mb-2">Bubble Sort</h5>
        <input
          type="text"
          value={numbers}
          onChange={(e) => setNumbers(e.target.value)}
          placeholder="Enter numbers separated by commas"
          className="border p-2 w-full rounded"
        />
        &nbsp;
        <button
          onClick={handleSort}
          className="mt-2 bg-blue-500 text-black p-2 rounded w-full"
        >
          Sort Numbers
        </button>
        {sortedNumbers.length > 0 && (
          <p className="mt-2 text-lg">
            Sorted Numbers: {sortedNumbers.join(", ")}
          </p>
        )}
      </div>
      <hr />
      <div>
        <h5>
          ใช้ JavaScript สร้าง Array มีขนาด 100 ช่อง Random
          ตัวเลขแล้วเรียงลำดับข้อมูล
        </h5>
        <button
          onClick={generateRandomNumbers}
          className="mt-2 bg-gray-500 text-black p-2 rounded w-full"
        >
          Random
        </button>
        <p className="mt-2">Random Numbers: {randomNumbers.join(", ")}</p>
        <button
          onClick={sortRandomNumbers}
          className="mt-2 bg-gray-700 text-black p-2 rounded w-full"
        >
          Sort
        </button>
        {sortedRandomNumbers.length > 0 && (
          <p className="mt-2">
            Sorted Numbers: {sortedRandomNumbers.join(", ")}
          </p>
        )}
      </div>
      <hr />
      <div>
        <h5>
          <b>Recursive Algorithm</b>
        </h5>
        <div>
          <h5>Calculate Factorial</h5>
          <input
            type="number"
            value={factorialNumber}
            onChange={(e) => setFactorialNumber(e.target.value)}
            placeholder="Enter a number"
            className="border p-2 w-full rounded"
          />
          &nbsp;
          <button
            onClick={calculateFactorial}
            className="mt-2 bg-blue-500 text-black p-2 rounded w-full"
          >
            Calculate Factorial
          </button>
          {factorialResult !== null && (
            <p className="mt-2 text-lg">Factorial : {factorialResult}</p>
          )}
        </div>
        <div>
          <h5>Calculate Fibonacci</h5>
          <input
            type="number"
            value={fibonacciNumber}
            onChange={(e) => setFibonacciNumber(e.target.value)}
            placeholder="Enter a number"
            className="border p-2 w-full rounded"
          />
          &nbsp;
          <button
            onClick={calculateFibonacci}
            className="mt-2 bg-blue-500 text-black p-2 rounded w-full"
          >
            Calculate Fibonacci
          </button>
          {fibonacciResult !== null && (
            <p className="mt-2 text-lg">Fibonacci : {fibonacciResult}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PseudocodeAndAlgorithm;
