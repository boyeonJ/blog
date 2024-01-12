import colors from "../../constants/colors";
import variants from "../../constants/variants";
import { Color, FoundationProps, Variant } from "../../models/types";
import Typography from "../foundations/Typography";

type TypographyProps = {
  variant?: Variant
  color?: Color;
};

const StyledTypography = ({
  children,
  className,
  variant = "h3",
  color = "primary3",
}: FoundationProps & TypographyProps) => {
  return (
    <Typography
      css={{
        ...variants[variant],
        color: colors[color],
      }}
      className={className}
    >
      {children}
    </Typography>
  );
};

export default StyledTypography;
