// COMMON
export const DATA_REFERENCE = 'DATA_REFERENCE'

// USER
export const BLACKLIST_TOKEN = 'BLACKLIST_TOKEN'
export const USER_NOT_EXIST = 'USER_NOT_EXIST'
export const PHONE_NUMBER_ALREADY_EXIST = 'PHONE_NUMBER_ALREADY_EXIST'
export const PARENTS_ACCOUNT_NOT_FOUND = 'PARENTS_ACCOUNT_NOT_FOUND'
export const PARENTS_ACCOUNT_EXISTED = 'PARENTS_ACCOUNT_EXISTED'
export const STUDENT_ID_ALREADY_EXISTED = 'STUDENT_ID_ALREADY_EXISTED'

// SCHOOL
export const SCHOOL_NOT_EXIST = 'SCHOOL_NOT_EXIST'
export const SCHOOL_CODE_EXISTED = 'SCHOOL_CODE_EXISTED'
export const GRADE_EXISTED = 'GRADE_EXISTED'
export const GRADE_NOT_EXISTED = 'GRADE_NOT_EXISTED'

// ACTIVITY
export const ACTIVITY_EXISTED = 'ACTIVITY_EXISTED'
export const ACTIVITY_NOT_EXISTED = 'ACTIVITY_NOT_EXISTED'

// FOOD
export const FOOD_NOT_EXIST = 'FOOD_NOT_EXIST'

// FILE
export const UPLOAD_FAILED = 'UPLOAD_FAILED'

// MEAL
export const MEAL_EXISTED = 'MEAL_EXISTED'
export const MEAL_NOT_EXISTED = 'MEAL_NOT_EXISTED'
export const MEAL_NOT_UPDATED = 'MEAL_NOT_UPDATED'
export const MEAL_HAS_OVERCOME_MAX_BREAKFAST_CALORIES =
  'MEAL_HAS_OVERCOME_MAX_BREAKFAST_CALORIES'
export const MEAL_HAS_OVERCOME_MAX_DINNER_CALORIES =
  'MEAL_HAS_OVERCOME_MAX_DINNER_CALORIES'

// SCHEDULE EXERCISE
export const SCHEDULE_EXISTED = 'SCHEDULE_EXISTED'
export const SCHEDULE_NOT_EXISTED = 'SCHEDULE_NOT_EXISTED'

export const ERROR_CODES = new Map([
  [DATA_REFERENCE, 'Data reference'],
  [BLACKLIST_TOKEN, 'Token is in blacklist (logout, deleted, ...)'],

  // USER
  [USER_NOT_EXIST, 'Người dùng không tồn tại'],
  [PHONE_NUMBER_ALREADY_EXIST, 'Số điện thoại đã tồn tại'],
  [PARENTS_ACCOUNT_NOT_FOUND, 'Không tìm thấy tài khoản phụ huynh'],
  [PARENTS_ACCOUNT_EXISTED, 'Tài khoản phụ huynh đã tồn tại số điện thoại'],
  [STUDENT_ID_ALREADY_EXISTED, 'Mã học sinh đã tồn tại'],

  // SCHOOL
  [SCHOOL_NOT_EXIST, 'Không tìm thấy trường học'],
  [SCHOOL_CODE_EXISTED, 'Mã trường đã tồn tại'],
  [GRADE_EXISTED, 'Khối lớp đã tồn tại'],
  [GRADE_NOT_EXISTED, 'Khối lớp không tồn tại'],

  // FOOD
  [FOOD_NOT_EXIST, 'Món ăn không tồn tại'],

  // FILE
  [
    UPLOAD_FAILED,
    'Tải file không thành công, có thể trùng lặp dữ liệu, hãy kiểm tra lại',
  ],

  // MEAL
  [MEAL_EXISTED, 'Bữa ăn đã tồn tại trong ngày'],
  [MEAL_NOT_EXISTED, 'Bữa ăn không tồn tại'],
  [MEAL_NOT_UPDATED, 'Không thể cập nhật bữa ăn này'],
  [
    MEAL_HAS_OVERCOME_MAX_BREAKFAST_CALORIES,
    'Bữa ăn vượt quá lượng calo khuyến nghị',
  ],
  [
    MEAL_HAS_OVERCOME_MAX_DINNER_CALORIES,
    'Bữa ăn vượt quá lượng calo khuyến nghị',
  ],

  // ACTIVITY
  [ACTIVITY_EXISTED, 'Hoạt động luyện tập đã tồn tại'],
  [ACTIVITY_NOT_EXISTED, 'Hoạt động luyện tập không tồn tại'],

  // SCHEDULE EXERCISE
  [SCHEDULE_EXISTED, 'Lịch hoạt động luyện tập đã tồn tại'],
  [SCHEDULE_NOT_EXISTED, 'Lịch hoạt động luyện tập không tồn tại'],
])
