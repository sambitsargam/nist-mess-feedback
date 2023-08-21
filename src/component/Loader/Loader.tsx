// @ts-ignore
import loaderGif from "../../assets/loader.svg";
import "./Loader.css";
export function Loader() {
  return (
    <div className="loader-wrapper flex-center">
      <img src={loaderGif} className="loader" alt="loader" />
    </div>
  );
}
