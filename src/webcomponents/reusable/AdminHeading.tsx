export const AdminHeading = ({
  heading,
  subheading,
}: {
  heading: string;
  subheading: string;
}) => {
  return (
    <div className=" flex flex-col gap-2">
      <h1 className=" md:text-3xl text-2xl font-bold">{heading}</h1>
      <span className="text-gray-600 text-lg">{subheading}</span>
    </div>
  );
};
