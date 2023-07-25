const Loader = () => {
  const cells = 4;
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <div className="mosaic-loader flex w-full justify-center">
        {[...Array(cells)].map((_r, i) =>
          [...Array(cells)].map((_c, j) => {
            return (
              <div key={i + j} className={`cell d-${i + j}`}>
                {" "}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Loader;
