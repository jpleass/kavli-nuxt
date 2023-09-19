export interface LinkData {
  type: 'page' | 'url' | 'email' | 'tel' | 'file'
  value: string
  text?: string
}
export type LinkProps = LinkData

export const linkQuery = {
  type: true,
  value: true,
  text: true,
}
