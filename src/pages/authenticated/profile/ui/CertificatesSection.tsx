import { CERTIFICATES } from '../config/profile'
import { CertificateCard } from './CertificateCard'

// Сертификаты: до lg — список строк, на десктопе — три карточки; «Добавить в портфолио» есть только на десктопе.
export function CertificatesSection() {
  return (
    <section aria-labelledby="certificates-title" className="flex flex-col gap-4 md:gap-3.5 lg:gap-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-serif text-19 font-semibold text-heading md:text-22 lg:text-24" id="certificates-title">
          Сертификаты
        </h2>
        <button
          className="cursor-pointer text-14 font-semibold text-success hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald max-lg:hidden"
          type="button"
        >
          Добавить в портфолио
        </button>
      </div>
      <ul className="grid gap-4 md:gap-3 lg:grid-cols-3 lg:gap-4">
        {CERTIFICATES.map((certificate) => (
          <CertificateCard certificate={certificate} key={certificate.title} />
        ))}
      </ul>
    </section>
  )
}
