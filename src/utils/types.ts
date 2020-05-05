export type EitherField<
  T,
  TKey extends keyof T = keyof T
> = TKey extends keyof T
  ? { [P in TKey]-?: T[TKey] } & Partial<Record<Exclude<keyof T, TKey>, never>>
  : never
