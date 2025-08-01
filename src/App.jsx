import MortgageInfo from "./components/MortgageInfo";
import EmptyResult from "./components/EmptyResults";
import CompletedResult from "./components/CompletedResults";
import { useState } from "react";
export default function App() {
  const [mortgage, setMortage] = useState({
    monthlyPayment: 0,
    totalRepayment: 0,
  });
  const [isMortgageCalculated, setIsMortgageCalculated] = useState(false);
  function calculateMortgagePayment(amount, term, rate, type) {
    const P = parseFloat(amount);
    const r = parseFloat(rate) / 100 / 12;
    const t = parseFloat(term) * 12;

    let monthlyPayment;
    let totalRepayment;

    if (type === "interest-only") {
      monthlyPayment = P * r;
      totalRepayment = monthlyPayment * t;
    } else if (type === "repayment") {
      monthlyPayment =
        (P * (r * Math.pow(1 + r, t))) / (Math.pow(1 + r, t) - 1);

      totalRepayment = monthlyPayment * t;
    }

    setMortage((prev) => ({
      ...prev,
      monthlyPayment,
      totalRepayment,
    }));

    setIsMortgageCalculated(true);
  }

  function resetAll() {
    setIsMortgageCalculated(false);
  }
  return (
    <main>
      <MortgageInfo
        onCalculateMortgagePayment={calculateMortgagePayment}
        onReset={resetAll}
      />
      {isMortgageCalculated ? (
        <CompletedResult mortgage={mortgage} />
      ) : (
        <EmptyResult />
      )}
    </main>
  );
}
