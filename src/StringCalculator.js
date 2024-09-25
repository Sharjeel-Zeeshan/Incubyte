import React, { useState } from "react";
import './StringCalculator.css'; 

const StringCalculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  
  const Add = (numbers) => {
    try {
      if (!numbers) return 0;

      let delimiters = [",", "\n"];
      let customDelimiter = null;

      
      if (numbers.startsWith("//")) {
        const delimiterEndIndex = numbers.indexOf("\n");
        const delimiterPart = numbers.slice(2, delimiterEndIndex);
        customDelimiter = delimiterPart.match(/\[.*?\]/g);

        if (customDelimiter) {
          delimiters = customDelimiter.map((delim) => delim.slice(1, -1));
        } else {
          delimiters = [delimiterPart];
        }

        numbers = numbers.slice(delimiterEndIndex + 1);
      }

      const delimiterRegex = new RegExp(`[${delimiters.join("")}]`);
      let numberArray = numbers.split(delimiterRegex).map(Number);

      
      const negatives = numberArray.filter((n) => n < 0);
      if (negatives.length > 0) {
        throw new Error(`Negatives not allowed: ${negatives.join(", ")}`);
      }

     
      numberArray = numberArray.filter((n) => n <= 1000);

      return numberArray.reduce((acc, num) => acc + num, 0);
    } catch (err) {
      setError(err.message);
      return 0;
    }
  };

  const handleCalculate = () => {
    setError(null);
    const sum = Add(input);
    setResult(sum);
  };

  return (
    <div className="calculator-container">
      <h1 className="title">String Calculator</h1>
      <input
        className="input-box"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter numbers"
      />
      <button className="calculate-button" onClick={handleCalculate}>
        Calculate
      </button>
      {result !== null && <div className="result">Result: {result}</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default StringCalculator;
