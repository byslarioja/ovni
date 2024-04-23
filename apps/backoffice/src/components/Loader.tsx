import { Spinner } from "./Spinner";

export function Loader() {
  return (
    <div className="h-full flex items-center justify-center">
      <Spinner />
    </div>
  );
}
