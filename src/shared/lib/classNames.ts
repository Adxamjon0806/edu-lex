import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/*
 * Темы tailwind-merge повторяют токены из src/app/styles/index.css. Без них text-13 считается цветом
 * и затирается классом text-heading, а rounded-12 и shadow-glow не схлопываются с конфликтующими
 * классами. Добавляя или удаляя токен в index.css, обнови список здесь.
 */
const twMerge = extendTailwindMerge({
  // Шкала drop-shadow в index.css не сброшена, поэтому glow добавляется к стандартным значениям.
  extend: {
    theme: {
      'drop-shadow': ['glow'],
    },
  },
  override: {
    theme: {
      color: [
        'background',
        'body',
        'body-secondary',
        'current',
        'danger',
        'danger-subtle',
        'disabled',
        'emerald',
        'emerald-300',
        'emerald-400',
        'emerald-500',
        'emerald-700',
        'gold',
        'gold-300',
        'gold-400',
        'gold-700',
        'heading',
        'inherit',
        'line',
        'line-accent',
        'line-strong',
        'muted',
        'navy',
        'navy-100',
        'navy-200',
        'navy-300',
        'navy-400',
        'navy-500',
        'navy-600',
        'navy-700',
        'navy-800',
        'navy-900',
        'navy-950',
        'premium',
        'premium-subtle',
        'red',
        'red-300',
        'red-700',
        'selected',
        'subtle',
        'success',
        'success-subtle',
        'surface',
        'surface-muted',
        'track',
        'transparent',
        'white',
      ],
      leading: ['loose', 'none', 'normal', 'relaxed', 'snug', 'tight'],
      radius: ['3', '4', '5', '6', '8', '9', '10', '12', '14', '16', '18', '20', '22', '24', '28', '32'],
      shadow: ['glow', 'glow-lg', 'lg', 'md', 'raised', 'sheet', 'sm', 'xl', 'xs'],
      text: [
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
        '24',
        '26',
        '28',
        '30',
        '32',
        '34',
        '38',
        '40',
        '44',
        '48',
        '52',
        '56',
      ],
      tracking: ['wide', 'wider', 'widest'],
    },
  },
})

export function classNames(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
