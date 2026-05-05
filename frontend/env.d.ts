/// <reference types="vite/client" />

declare module 'markdown-it-mark'
declare module 'markdown-it-deflist'
declare module 'markdown-it-mathjax'
declare module '@wekanteam/markdown-it-mermaid'

declare global {
  namespace Vue {
    type Ref<T> = import('vue').Ref<T>
    type ComputedRef<T> = import('vue').ComputedRef<T>
    type WatchOptions = import('vue').WatchOptions
    type WatchSource<T> = import('vue').WatchSource<T>
  }
}
