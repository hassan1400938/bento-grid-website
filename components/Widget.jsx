export default function Widget({ col, row, innerRef, children }) {
  return (
    <div
      ref={innerRef}
      className={`bento-tile ${col} ${row} bg-white shadow-md rounded-3xl overflow-hidden`}
    >
      {children}
    </div>
  );
}
