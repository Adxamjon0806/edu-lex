type SectionLabelProps = Readonly<{
  desktop: string
  id?: string
  mobile: string
  tablet: string
}>

/*
 * Подпись блока на шаге трека: заглавные буквы, разрядка 0.04em, 12px на мобильном и 13px с md.
 * На узких экранах в макете подписи короче («Направление» вместо «Академическое направление»).
 */
export function SectionLabel({ desktop, id, mobile, tablet }: SectionLabelProps) {
  return (
    <span className="block text-12 font-bold tracking-wide text-body uppercase md:text-13" id={id}>
      <span className="md:hidden">{mobile}</span>
      <span className="max-md:hidden lg:hidden">{tablet}</span>
      <span className="max-lg:hidden">{desktop}</span>
    </span>
  )
}
