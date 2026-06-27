import type { ReactNode } from 'react'

export interface FaqEntry {
  id: string
  question: string
  answer: ReactNode
}

export const FAQ_ENTRIES: FaqEntry[] = [
  {
    id: 'what-is-sfs',
    question: 'What is Share Funding System (SFS)?',
    answer:
      'Share Funding System (SFS) is an innovative platform designed to help people pursue financial goals through organized campaigns, educational Success Centers, and future intelligent planning tools. Our mission is to help people move toward their goals through planning, education, and community participation.',
  },
  {
    id: 'how-does-sfs-work',
    question: 'How does SFS work?',
    answer:
      'Users create financial goals, explore educational Success Centers, and, when the platform launches, will be able to participate in campaigns designed to support those goals. SFS guides users through a structured planning process before recommending the most suitable path.',
  },
  {
    id: 'goal-types',
    question: 'What types of goals can SFS support?',
    answer: (
      <>
        <p className="m-0">
          SFS is being designed to support many financial goals, including:
        </p>
        <ul className="mt-3 list-none space-y-1.5 pl-0">
          {[
            'Housing (Rent & Mortgage)',
            'Home Down Payments',
            'Vehicle Purchases',
            'Debt Reduction',
            'Business Startup & Expansion',
            'Medical & Elective Procedures',
            'Vacations',
            'Emergency Savings',
            'And many additional life goals.',
          ].map((item) => (
            <li key={item} className="flex gap-2.5 text-muted-soft">
              <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold-dark" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: 'success-center',
    question: 'What is a Success Center?',
    answer:
      'A Success Center is an educational resource that helps users understand their financial goals, explore available options, learn industry information, and prepare personalized plans before taking the next step.',
  },
  {
    id: 'single-goal',
    question: 'Can I choose only one goal?',
    answer:
      'Yes. Users will have the option to focus on a single goal or, in future versions of the platform, combine related goals into a personalized Success Bundle.',
  },
  {
    id: 'waitlist-free',
    question: 'Is joining the waitlist free?',
    answer: 'Yes. Joining the SFS waitlist is completely free.',
  },
  {
    id: 'launch-date',
    question: 'When will the SFS app launch?',
    answer:
      "Development is currently underway. By joining the waitlist, you'll receive updates and early access information as new features become available.",
  },
  {
    id: 'international',
    question: 'Will SFS be available internationally?',
    answer:
      'Our long-term vision is to make SFS available to users in multiple countries as the platform grows.',
  },
  {
    id: 'updates',
    question: 'How will I receive updates?',
    answer:
      'Everyone who joins the waitlist will receive important announcements, development updates, and launch information by email.',
  },
  {
    id: 'join-today',
    question: 'Why should I join the waitlist today?',
    answer:
      'Joining the waitlist allows you to follow the development of SFS, receive updates, and be among the first to experience new features as they become available.',
  },
]
