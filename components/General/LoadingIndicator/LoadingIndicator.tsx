import { SyncLoader } from "react-spinners";

interface Props {
  className?: string;
}

const LoadingIndicator = ({ className }: Props) => {
  return (
    <div
      className={`${className} flex items-center justify-center w-full h-36`}
    >
      <SyncLoader />
    </div>
  );
};
export default LoadingIndicator;
