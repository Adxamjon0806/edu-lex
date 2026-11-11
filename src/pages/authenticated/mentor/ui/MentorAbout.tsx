import type { Mentor } from '~/entities/mentor'

import { Badge } from '~/shared/ui'

import { MENTOR_TEXTS } from '../config/mentor'
import { DocumentChips } from './DocumentChips'

type MentorAboutProps = Readonly<{
  mentor: Mentor
  onDocumentToggle: (index: number) => void
  openDocument: null | number
}>

/*
 * «О менторе»: биография. До md — без карточки и заголовка (он остаётся для скринридера), на планшете
 * в карточке вместе с документами, на десктопе — с тегами (документы там в отдельном блоке).
 */
export function MentorAbout({ mentor: { bio, documents, tags }, onDocumentToggle, openDocument }: MentorAboutProps) {
  return (
    <section
      aria-labelledby="mentor-about"
      className="flex flex-col gap-3.5 md:gap-2.5 md:rounded-18 md:border md:border-line md:bg-surface md:p-5.5 lg:gap-3 lg:p-6.5"
    >
      <h2 className="font-serif text-20 font-semibold text-heading max-md:sr-only lg:text-22" id="mentor-about">
        {MENTOR_TEXTS.about}
      </h2>
      <p className="text-14 leading-relaxed text-body-secondary md:text-15 lg:text-16">{bio}</p>
      <ul className="flex flex-wrap gap-2 max-lg:hidden">
        {tags.map((tag) => (
          <li key={tag}>
            <Badge className="rounded-8 px-3 py-1.5 text-13 font-semibold">{tag}</Badge>
          </li>
        ))}
      </ul>
      <DocumentChips className="lg:hidden" documents={documents} onToggle={onDocumentToggle} openIndex={openDocument} />
    </section>
  )
}
