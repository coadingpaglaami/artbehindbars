export const HeadingTwo = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="md:text-4xl text-2xl font-semibold ">{title}</h2>
      <span className="text-[#525252]">{description}</span>
    </div>
  );
};
