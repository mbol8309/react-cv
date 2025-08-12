const CircleRating = ({ value, max = 3 }) => {
  return (
    <div className="circles-container">
      {Array.from({ length: max }).map((_, index) => (
        <div
          key={index}
          className={`circle ${
            index < value ? "filled" : ""
          }`}
        />
      ))}
    </div>
  );
};

export default CircleRating;