import { CertificatesSection } from './CertificatesSection'
import { ProfileHeader } from './ProfileHeader'
import { ReadinessCard } from './ReadinessCard'
import { ReadinessHero } from './ReadinessHero'
import { SkillsCard } from './SkillsCard'

/*
 * Профиль студента (экран «05 Profile & Readiness»): шапка, индекс готовности, радар навыков, сертификаты.
 * До md шапка и индекс готовности — общий navy-блок во всю ширину экрана: он отменяет отступы лейаута
 * (px-5 и pt-4.5 в AuthenticatedLayout) отрицательными полями. На планшете индекс — navy-карточка,
 * на десктопе — белая карточка рядом с радаром (рядом — с xl, на узком десктопе друг под другом).
 */
export function ProfilePage() {
  return (
    <div className="flex flex-col gap-4 md:gap-5.5 lg:gap-6">
      <div className="-mx-5 -mt-4.5 mb-1 flex flex-col gap-4.5 bg-navy px-5 pt-4.5 pb-6.5 text-white md:m-0 md:gap-5.5 md:bg-transparent md:p-0 md:text-inherit">
        <ProfileHeader />
        <ReadinessHero className="lg:hidden" />
      </div>
      <div className="grid gap-4 md:gap-5.5 lg:gap-5 xl:grid-cols-[1fr_1.2fr]">
        <ReadinessCard className="max-lg:hidden" />
        <SkillsCard />
      </div>
      <CertificatesSection />
    </div>
  )
}
