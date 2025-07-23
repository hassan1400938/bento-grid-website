export default function Widget({ col, row, innerRef, children }) {
  return (
    <div ref={innerRef} className={`bento-tile ${col} ${row} overflow-hidden`}>
      {children}
    </div>
  );
}
