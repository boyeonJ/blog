import { FoundationProps } from "../../models/types";

const FixedBox = ({
  children,
  className
}: FoundationProps) => {
  return (
    <div
      className={className}
      css={{
        position: "fixed",
        width: '100%',
        zIndex: '2'
      }}
    >
      {children}
    </div >
  );
};

export default FixedBox;
