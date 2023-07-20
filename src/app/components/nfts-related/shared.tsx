export const MessageWrapper = (props: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props} className="flex justify-center w-100">
      <div className="p-4 text-center">{props.children}</div>
    </div>
  );
};
