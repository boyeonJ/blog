import { FoundationProps } from "../../models/types";

export default function Spacing({ size, className }: { size: number } & FoundationProps) {
  return (
    <div
      style={{
        flex: "none",
        height: size,
      }}
      className={className}
    />
  );
}
