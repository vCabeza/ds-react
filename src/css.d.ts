declare module '*.css' {
  const href: string
  export default href
}

declare module '*.module.css' {
  const classes: Readonly<Record<string, string>>
  export default classes
}
