import { useState } from "react";
import { reset, calcularTip, calcularTotal } from "../utilities.js";
function Body() {
  const [tip, setTip] = useState(0);
  const [bill, setBill] = useState(0);
  const [people, setPeople] = useState(1);
  const [tipAmount, setTipAmount] = useState(0);
  const [total, setTotal] = useState(0);

  const handleBillChange = (e) => {
    setBill(parseFloat(e.target.value) || 0);
    runProgram();
  };
  const handleTipChange = (value) => {
    setTip(parseFloat(value) || 0);
    runProgram();
  };
  const handleCustomTipChange = (e) => {
    handleTipChange(e.target.value);
  };
  const handlePeopleChange = (e) => {
    setPeople(parseFloat(e.target.value) || 0);
    runProgram();
  };
  const handleReset = () => {
    reset(setBill, setTip, setPeople, setTipAmount, setTotal);
  };

  const runProgram = () => {
    const resultTipAmount = calcularTip(bill, tip, people);
    const resultTotal = calcularTotal(bill, tip, people);

    setTipAmount(resultTipAmount);
    setTotal(resultTotal);
  };
  return (
    <>
      <header>
        <img src="./images/logo.svg" alt="" />
      </header>
      <div className="general-wrapper">
        <div className="data-wrapper">
          <h1>Bill</h1>
          <label htmlFor="input-bill">
            <input
              className="input-bill"
              id="input-bill"
              type="number"
              defaultValue={0}
              min={0}
              onChange={handleBillChange}
            />
          </label>
          <h2>Select Tip %</h2>
          <ul>
            {[5, 10, 15, 25, 50].map((percentage) => (
              <li key={`percentage-${percentage}`}>
                <button
                  type="button"
                  className={`percentage-button ${
                    tip === percentage ? "selected" : ""
                  }`}
                  value={percentage}
                  onClick={() => handleTipChange(percentage)}
                >
                  {percentage}%
                </button>
              </li>
            ))}

            <li>
              <input
                type="number"
                placeholder="Custom"
                id="custom-percentage-button"
                className="percentage-button"
                value={tip === 0 ? "" : tip}
                onChange={handleCustomTipChange}
              />
            </li>
          </ul>
          <span id="people-error-message" className="error-people" />
          <h2>Number of People</h2>
          <label htmlFor="input-people">
            <input
              id="input-people"
              className="input-people"
              type="number"
              defaultValue={1}
              min={1}
              onChange={handlePeopleChange}
            />
          </label>
        </div>
        <div className="result-wrapper">
          <div className="result-txt">
            <div className="text-amount">
              <div>
                <h2>Tip Amount</h2>
                <p>/ person</p>
              </div>
              <h3>
              ${tipAmount.toFixed(2)}<span id="tip-amount"></span>
              </h3>
            </div>
            <div className="total-amount">
              <div>
                <h2>Total</h2>
                <p>/ person</p>
              </div>
              <h3>
              ${total.toFixed(2)}<span id="total"></span>
              </h3>
            </div>
          </div>
          <button
            type="button"
            id="reset-button"
            className="reset-button"
            onClick={handleReset}
          >
            RESET
          </button>
        </div>
      </div>
    </>
  );
}

export default Body;
