import { FoundationProps } from "../../models/types";

const Typography = ({
  children,
  className,
}: FoundationProps) => {
  return <span className={className}>{children}</span>;
};

export default Typography;
