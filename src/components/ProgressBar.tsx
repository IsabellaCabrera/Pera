export const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className="relative h-3 w-full bg-gray rounded-full">
      <div
        className={`absolute top-0 left-0 h-3 ${
          progress === 1 ? "w-1/3" : progress === 2 ? "w-1/2" : "w-full"
        } bg-black rounded-full transition-all`}
      />
    </div>
  );
};
