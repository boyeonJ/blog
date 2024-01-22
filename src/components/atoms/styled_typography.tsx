import colors from "../../constants/colors";
import variants from "../../constants/variants";
import { Color, FoundationProps, Variant } from "../../models/types";
import Typography from "../foundations/typography";

type TypographyProps = {
  variant?: Variant
  color?: Color;
  innerHtml?: boolean
};

const StyledTypography = ({
  children,
  className,
  variant = "h6",
  color = "primary3",
  innerHtml
}: FoundationProps & TypographyProps) => {
  return (
    <Typography
      css={{
        ...variants[variant],
        color: colors[color],
      }}
      className={className}
      innerHtml={innerHtml}
    >
      {children}
    </Typography>
  );
};

export default StyledTypography;
