export const NONE = 'none'
export const LIGHT = 'light'
export const MODERATE = 'moderate'

export const HEAVY = 'heavy'

export const ACTIVITY_TYPE = new Map([
  [NONE, 1.2],

  [LIGHT, 1.375],

  [MODERATE, 1.55],

  [HEAVY, 1.725],
])

export const ACTIVITY = new Map([
  [NONE, 'Không (Không luyện tập thể dục)'],

  [LIGHT, 'Nhẹ (Tập thể dục nhẹ nhàng 1-3 ngày/tuần)'],

  [MODERATE, 'Trung bình (Tập thể dục 3-5 ngày/tuần)'],

  [
    HEAVY,
    'Nặng (Tập thể dục hàng ngày hoặc tập thể dục cường độ cao 4-6 lần/tuần)',
  ],
])
