import { ACTIVE_COURSE } from '../config/dashboard'
import { ActiveCourseCard } from './ActiveCourseCard'
import { DailyGoalCard } from './DailyGoalCard'
import { DailyLessonCard } from './DailyLessonCard'
import { DashboardHeader } from './DashboardHeader'
import { TracksSection } from './TracksSection'

// Главная студента (экран «02 Dashboard»). Отступы между блоками из макета: 18/24/28px.
export function HomePage() {
  return (
    <div className="flex flex-col gap-4.5 md:gap-6 lg:gap-7">
      <DashboardHeader />
      <ActiveCourseCard course={ACTIVE_COURSE} />
      <TracksSection />
      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <DailyLessonCard />
        <DailyGoalCard className="max-lg:hidden" />
      </div>
    </div>
  )
}
