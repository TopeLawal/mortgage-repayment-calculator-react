export default function EmptyResult() {
  return (
    <section className="result result-empty">
      <img
        src="../assets/images/illustration-empty.svg"
        alt="illustration-empty"
      />

      <h1>Result shown here</h1>
      <p>
        Complete the form and click "calculate repayments" to see what your
        monthly repayments would be
      </p>
    </section>
  );
}
