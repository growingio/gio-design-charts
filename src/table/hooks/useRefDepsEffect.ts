import { DependencyList, EffectCallback, RefObject, useEffect, useRef } from "react"
function isRefObj(ref: any): ref is RefObject<any> {
  return (ref !== null && ref !== undefined) && 'current' in ref
}
export function useRefDepsEffect(effect: EffectCallback, refDeps: DependencyList) {
  const cleanupRef = useRef<(() => void) | undefined>()
  const prevDepsRef = useRef<DependencyList>()
  useEffect(() => {
    const prevDeps = prevDepsRef.current
    if (prevDeps && refDeps.every((v, i) => (isRefObj(v) ? v.current : v) === prevDeps[i])) {
      return
    }
    cleanupRef.current?.()
    const f = effect()
    cleanupRef.current = typeof f === 'function' ? f : undefined
    prevDepsRef.current = refDeps.map(v => (isRefObj(v) ? v.current : v))
  })
  useEffect(() => {
    return () => cleanupRef.current?.()
  }, [])
}
