export const Text = ({
  children,
  className,
  id,
}: {
  children: string;
  className?: string;
  id?: string;
}) => {
  return (
    <p
      className={`text-2xl pt-[60px] pb-[95px] w-full md:w-[95%] mx-auto leading-10 ${className}`}
      id={id}
    >
      {children}
    </p>
  );
};
