declare module 'feather-icons' {
  interface IconOptions {
    width?: number;
    height?: number;
    color?: string;
    'stroke-width'?: number;
    class?: string;
    id?: string;
  }

  interface Icon {
    name: string;
    contents: string;
    tags: string[];
    attrs: {
      viewBox: string;
      width: string;
      height: string;
      fill: string;
      [key: string]: string;
    };
    toSvg: (options?: IconOptions) => string;
  }

  export const icons: {
    [key: string]: Icon;
  };

  export function replace(options?: IconOptions): void;
  export function toSvg(name: string, options?: IconOptions): string;
} 