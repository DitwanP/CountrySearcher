import { useEffect } from "react";
import resolveConfig from "tailwindcss/resolveConfig";

// @ts-ignore
import tailwindConfig from "../../tailwind.config.js";

interface LoaderProps {
  theme: string;
}

const Loader = ({ theme }: LoaderProps) => {
  const cells = 4;
  const fullConfig = resolveConfig(tailwindConfig);
  const lightModeBg = fullConfig.theme.colors["main-dark"];
  const darkModeBg = fullConfig.theme.colors["main-light"];

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.style.setProperty("--cell-color", lightModeBg);
    } else {
      document.documentElement.style.setProperty("--cell-color", darkModeBg);
    }
  }, [theme]);

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
