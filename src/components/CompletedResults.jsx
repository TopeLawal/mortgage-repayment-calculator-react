export default function CompletedResult({ mortgage }) {
  function formatCurrency(value) {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      maximumFractionDigits: 2,
    }).format(value);
  }
  return (
    <section className="result result-completed">
      <h2>Your results</h2>
      <p>
        Your results are shown below based on the information you provided. To
        adjust the results, edit the form and click "calculate repayments" again
      </p>

      <div className="repayments-summary">
        <div className="monthly-repayments">
          <p>Your monthly repayments</p>
          <h1 className="monthly-amount">
            {formatCurrency(mortgage.monthlyPayment)}
          </h1>
        </div>
        <div className="total-repayments">
          <p>Total you'll repay over the term</p>
          <h2>{formatCurrency(mortgage.totalRepayment)}</h2>
        </div>
      </div>
    </section>
  );
}
