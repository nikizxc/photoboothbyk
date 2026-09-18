import type { Ref } from "react";

export type LayoutOptionsProps = {
  label: string;
  shots: number;
  frame: React.ComponentType<LayoutProps>;
  file: string;
  size: { width: number; height: number };
};

export type LayoutProps = {
  frameRef: Ref<HTMLDivElement>;
};
