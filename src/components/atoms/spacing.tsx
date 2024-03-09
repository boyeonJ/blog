import { SerializedStyles, css } from "@emotion/react";
import { FoundationProps } from "../../models/types";

const spacingSize: { [key: number]: SerializedStyles } = {
    15: css({
        flex: 'none',
        height: '15px'
    }),
    20: css({
        flex: 'none',
        height: '20px'
    }),
    50: css({
        flex: 'none',
        height: '50px'
    }),
}

export default function Spacing({ size, className }: { size: 15 | 20 | 50 } & FoundationProps) {
    return (
        <div
            css={spacingSize[size]}
            className={className}
        />
    );
}
