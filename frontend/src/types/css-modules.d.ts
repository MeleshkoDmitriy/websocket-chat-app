declare module '*.module.less' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.less' {
  const content: string;
  export default content;
}

declare module '@/*' {
  const content: unknown;
  export default content;
}
