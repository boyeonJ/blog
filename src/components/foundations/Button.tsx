import { FoundationProps } from "../../models/types";

export type ButtonProps = {
  onClick?: React.MouseEventHandler<HTMLElement>;
  buttonName: string;
};

const Button = ({ className, children, onClick, buttonName }: FoundationProps & ButtonProps) => {
  return <button onClick={onClick} className={className} aria-label={buttonName}>{children}</button>;
};

export default Button;
