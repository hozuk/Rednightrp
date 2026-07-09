export type Product = {
  id: string
  name: string
  description: string
  price: number
  category: 'status' | 'class' | 'credits'
  objectClass: 'SAFE' | 'EUCLID' | 'KETER'
  features: string[]
}

export const PRODUCTS: Product[] = [
  {
    id: 'vip-30',
    name: 'VIP — 30 дней',
    description: 'Базовый донат-статус для комфортной игры.',
    price: 149,
    category: 'status',
    objectClass: 'SAFE',
    features: ['Приоритетный вход на сервер', 'Префикс VIP в чате', '+20% к зарплате', 'Доступ к VIP-профессиям'],
  },
  {
    id: 'premium-30',
    name: 'PREMIUM — 30 дней',
    description: 'Расширенный статус для опытных сотрудников Фонда.',
    price: 299,
    category: 'status',
    objectClass: 'EUCLID',
    features: ['Все возможности VIP', '+50% к зарплате', 'Уникальные модели персонажа', 'Резервный слот на сервере'],
  },
  {
    id: 'legend-30',
    name: 'LEGEND — 30 дней',
    description: 'Максимальный статус. Полный допуск уровня O5.',
    price: 599,
    category: 'status',
    objectClass: 'KETER',
    features: ['Все возможности PREMIUM', '+100% к зарплате', 'Кастомный тег в чате', 'Приоритет в очереди на SCP-классы'],
  },
  {
    id: 'class-mog',
    name: 'Класс: Оперативник МОГ',
    description: 'Навсегда открывает класс бойца Мобильной Оперативной Группы.',
    price: 249,
    category: 'class',
    objectClass: 'EUCLID',
    features: ['Улучшенная броня и снаряжение', 'Доступ к спецоружию', 'Тактическая рация'],
  },
  {
    id: 'class-researcher',
    name: 'Класс: Старший исследователь',
    description: 'Навсегда открывает класс старшего научного сотрудника.',
    price: 199,
    category: 'class',
    objectClass: 'SAFE',
    features: ['Карта доступа 3 уровня', 'Повышенная зарплата', 'Доступ в исследовательское крыло'],
  },
  {
    id: 'class-scp',
    name: 'Приоритет SCP-объектов',
    description: 'Приоритетная очередь на игру за SCP-объекты.',
    price: 399,
    category: 'class',
    objectClass: 'KETER',
    features: ['Приоритет на SCP-049, SCP-173, SCP-096', 'Ранний выбор объекта в раунде'],
  },
  {
    id: 'credits-500',
    name: '500 кредитов',
    description: 'Внутриигровая валюта для покупок на сервере.',
    price: 99,
    category: 'credits',
    objectClass: 'SAFE',
    features: ['Мгновенное зачисление на баланс'],
  },
  {
    id: 'credits-1500',
    name: '1 500 кредитов',
    description: 'Внутриигровая валюта для покупок на сервере. +10% бонус.',
    price: 249,
    category: 'credits',
    objectClass: 'EUCLID',
    features: ['Мгновенное зачисление на баланс', 'Бонус +150 кредитов'],
  },
  {
    id: 'credits-5000',
    name: '5 000 кредитов',
    description: 'Внутриигровая валюта для покупок на сервере. +20% бонус.',
    price: 699,
    category: 'credits',
    objectClass: 'KETER',
    features: ['Мгновенное зачисление на баланс', 'Бонус +1 000 кредитов'],
  },
]

export const CATEGORY_LABELS: Record<Product['category'], string> = {
  status: 'Донат-статусы',
  class: 'Классы и доступы',
  credits: 'Кредиты',
}
