import { useState } from "react";

const initialData = {
  amount: "",
  term: "",
  rate: "",
  type: "",
};

export default function MortgageInfo({ onCalculateMortgagePayment, onReset }) {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  function handleChanges(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function validate() {
    const newErrors = {};

    if (!formData.amount) {
      newErrors.amount = "This field is required";
    }
    if (!formData.term) {
      newErrors.term = "This field is required";
    }
    if (!formData.rate) {
      newErrors.rate = "This field is required";
    }
    if (!formData.type) {
      newErrors.type = "This field is required";
    }

    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const checkNewErrors = validate();
    if (Object.keys(checkNewErrors).length > 0) {
      setErrors(checkNewErrors);
    } else {
      setErrors({});
      onCalculateMortgagePayment(
        formData.amount,
        formData.term,
        formData.rate,
        formData.type
      );
    }
  }

  function handleReset() {
    setFormData(initialData);
    setErrors({});
    onReset();
  }
  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <div className="title">
        <h1>Mortgage Calculator</h1>
        <button className="reset" type="reset">
          Clear All
        </button>
      </div>

      <div className="form-control">
        <label htmlFor="amount">Mortgage Amount</label>
        <div className={`details ${errors.amount ? "error" : ""}`}>
          <p>&pound;</p>
          <input
            type="number"
            name="amount"
            id="amount"
            min="0"
            value={formData.amount}
            onChange={handleChanges}
          />
        </div>
        {errors.amount && <p className="error-msg">{errors.amount}</p>}
      </div>

      <div className="term-rate">
        <div className="form-control">
          <label htmlFor="term">Mortgage Term</label>
          <div className={`details ${errors.term ? "error" : ""}`}>
            <input
              type="number"
              name="term"
              id="term"
              min="1"
              value={formData.term}
              onChange={handleChanges}
            />
            <p>years</p>
          </div>
          {errors.term && <p className="error-msg">{errors.term}</p>}
        </div>

        <div className="form-control">
          <label htmlFor="rate">Interest Rate</label>
          <div className={`details ${errors.rate ? "error" : ""}`}>
            <input
              type="number"
              name="rate"
              id="rate"
              min="0"
              max="100"
              step="0.01"
              value={formData.rate}
              onChange={handleChanges}
            />
            <p>%</p>
          </div>
          {errors.rate && <p className="error-msg">{errors.rate}</p>}
        </div>
      </div>

      <fieldset>
        <legend>Mortgage Type</legend>

        <div className="form-control radio-control">
          <input
            type="radio"
            name="type"
            id="repayment"
            value="repayment"
            checked={formData.type === "repayment"}
            onChange={handleChanges}
          />
          <label htmlFor="repayment">Repayment</label>
        </div>

        <div className="form-control radio-control">
          <input
            type="radio"
            name="type"
            id="interest-only"
            value="interest-only"
            checked={formData.type === "interest-only"}
            onChange={handleChanges}
          />
          <label htmlFor="interest-only">Interest Only</label>
        </div>

        {errors.type && <p className="error-msg">{errors.type}</p>}
      </fieldset>

      <button type="submit" className="submit-btn">
        <img src="/public/assets/images/icon-calculator.svg" alt="Calculator" />
        <span>Calculate Repayments</span>
      </button>
    </form>
  );
}
