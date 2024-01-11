import Button, { ButtonProps } from "../foundations/Button";
import Icon, { IconProps } from "./Icon";

const IconButton = ({
  onClick,
  name,
  size = "medium",
  color = "primary3",
}: IconProps & ButtonProps) => {

  return (
    <Button
      onClick={onClick}
      css={{
        backgroundColor: "transparent",
        borderColor: "transparent",
      }}
    >
      <Icon name={name} size={size} color={color}></Icon>
    </Button>
  );
};

export default IconButton;
