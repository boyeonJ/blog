import colors from "../../constants/colors";
import { FoundationProps } from "../../models/types";

const Typography = ({
  children,
  className,
  innerHtml
}: FoundationProps & { innerHtml?: boolean }) =>
  (innerHtml && children)
    ? (<span css={{
      display: "inline-block",
      strong: {
        boxShadow: `inset 0 -6px 0 ${colors.primary4}`,
        lineHeight: '21px',
        fontWeight: 'inherit'
      }
    }} className={className} dangerouslySetInnerHTML={{ __html: children }} ></span>)
    : (<span css={{ display: "inline-block" }} className={className}>{children}</ span>)


export default Typography;