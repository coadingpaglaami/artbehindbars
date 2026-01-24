interface HeadingProps {
  title: string;
  icon: React.ReactNode;
  subtitle?: string;
}

export const Heading = ({ title, icon, subtitle }: HeadingProps) => {
  return (
    <div>
      <div className="flex items-center space-x-2">
        {icon}
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
    </div>
  );
};
