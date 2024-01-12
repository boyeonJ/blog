import { FoundationProps } from "../../models/types";
import Button, { ButtonProps } from "../foundations/Button";
import Icon, { IconProps } from "./Icon";

const IconButton = ({
  className,
  onClick,
  name,
  size,
  color,
}: IconProps & ButtonProps & FoundationProps) => {

  return (
    <Button
      className={className}
      onClick={onClick}
      css={{
        backgroundColor: "transparent",
        borderColor: "transparent",
      }}
    >
      <Icon name={name} size={size} color={color} className={className}></Icon>
    </Button>
  );
};

export default IconButton;
