export default function Page2() {
  return (
    <>
      <h1 className="text-6xl font-bold">page 2</h1>

      <div className="item">
        I am displayed in <code>color: rebeccapurple</code> because the
        <code>utilities</code> layer comes after the <code>base</code> layer. My green border,
        font-size, and padding come from the <code>base</code> layer.
      </div>
    </>
  );
}
