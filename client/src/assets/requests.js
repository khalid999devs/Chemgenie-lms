export const env = 'production'; // or "production" or "development";

export const so =
  env === 'development'
    ? 'http://localhost:8001'
    : 'https://chemapi.chemgenie.app';

export const reqImgWrapper = (src) => {
  if (!src) return null;
  else return so + '/' + src;
};
export const reqPdfWrapper = (src) => {
  if (!src) return null;
  else return so + '/' + src;
};

const reqs = {
  CONNECTION_TEST: '/api/test',

  //admin auth
  ADMIN_LOGIN: '/api/admin/login',
  ADMIN_LOGOUT: '/api/admin/logout',
  IS_ADMIN_VALID: '/api/admin/auth',

  //client auth

  GET_DASHBOARD_ANALYTICS: '/api/client/analytics',
  CLIENT_REG: '/api/client/reg',
  CLIENT_LOGIN: '/api/client/login',
  CLIENT_LOGOUT: '/api/client/logout',
  IS_CLIENT_VALID: '/api/client/getClient',
  DELETE_ACCOUNT: '/api/client/deleteAcc',
  RESET_PASS_SET_TOKEN: '/api/client/rPassToken',
  RESET_PASS_OTP_VERIFY: '/api/client/rPassVerify',
  EDIT_PROFILE_INFO: '/api/client/edit-info',
  UPDATE_PROFILE_IMAGE: '/api/client/update-image',

  //courses
  ADD_RECORD_CLASS: '/api/course/add-recorded-class',
  ADD_RESOURCES: '/api/course/add-resource',
  ADMIN_VALID_COURSE: '/api/course/valid-admin-course', //admin
  CLIENT_VALID_COURSE: '/api/course/valid-course', //client
  DELETE_CLASS: '/api/course/delete-recorded-class',
  CREATE_COURSE: '/api/course/create',
  DELETE_COURSE: '/api/course/delete-course',
  GET_COURSES: '/api/course/get-pub-courses', //public
  GET_SINGLE_COURSE: '/api/course/get-pub-course', //public
  GET_STUDENTS: '/api/client/getAll', //admin
  UPDATE_COURSE: '/api/course/edit-course',
  UPDATE_IMAGE: '/api/course/update-image',
  ZOOM_CRED: '/api/course/zoom-creds',
  EDIT_CLASS_INFO: '/api/course/edit-classinfo',

  CLIENT_REG: '/api/client/reg',
  CLIENT_LOGIN: '/api/client/login',
  CLIENT_LOGOUT: '/api/client/logout',
  IS_CLIENT_VALID: '/api/client/getClient',
  DELETE_ACCOUNT: '/api/client/deleteAcc',
  RESET_PASS_SET_TOKEN: '/api/client/rPassToken',
  RESET_PASS_OTP_VERIFY: '/api/client/rPassVerify',

  //courses
  ADD_RECORD_CLASS: '/api/course/add-recorded-class',
  ADD_RESOURCES: '/api/course/add-resource',
  ADMIN_VALID_COURSE: '/api/course/valid-admin-course', //admin
  CLIENT_VALID_COURSE: '/api/course/valid-course', //client
  DELETE_CLASS: '/api/course/delete-recorded-class',
  CREATE_COURSE: '/api/course/create',
  DELETE_COURSE: '/api/course/delete-course',
  GET_COURSES: '/api/course/get-pub-courses', //public
  GET_SINGLE_COURSE: '/api/course/get-pub-course', //public
  GET_STUDENTS: '/api/client/getAll', //admin

  GET_CLASS_TIME: '/api/course/get-class-time',
  UPDATE_COURSE: '/api/course/edit-course',
  UPDATE_IMAGE: '/api/course/update-image',
  UPDATE_DONE_CLASS: '/api/course/update-done-class',
  UPDATE_CLASS_TIME: '/api/course/update-class-time',
  ZOOM_CRED: '/api/course/zoom-creds',

  //contact
  SEND_MESSAGE: '/api/contact/sendMessage',
  GET_MESSAGE: '/api/contact/messages',
  SEND_EMAIL_REPLY: '/api/contact/emailToClient',

  //gallery
  ADD_IMAGE_G: '/api/gallery/addImage',
  DELETE_IMAGE_G: '/api/gallery/delete',
  GET_IMAGE_G: '/api/gallery/',
  UPDATE_IMAGE_G: '/api/gallery/update',

  //exams
  ADD_EXAM: '/api/exam/add-exam',
  ADD_SINGLE_QUES: '/api/exam/add-single-ques-ans',
  ADD_STU_ANS: '/api/exam/add-stu-ans',
  ADD_STU_FANS: '/api/exam/add-stu-files-ans',
  DELETE_EXAM: '/api/exam/delete-exam-info',
  DEL_SINGLE_QUES: '/api/exam/delete-single-ques',
  GET_EXAM_ADMIN: '/api/exam/get-exam-admin',
  GET_EXAM_CLIENT: '/api/exam/get-exam-info-client',
  GET_EXAMRES_CLIENT: '/api/exam/get-exam-results-client',
  GET_QUES_ADMIN: '/api/exam/get-all-ques-admin',
  GET_QUES_CLIENT: '/api/exam/get-all-question',

  ADMIN_MANUAL_EVALUATE_EXAM: '/api/exam/manual-evaluate-quiz-exams',
  ADMIN_WRITTEN_EVALUATE_EXAM: '/api/exam/written-eval-save',
  GET_ADMIN_COURSE_BASED_EXAMS: '/api/exam/get-course-based-exams',
  ADMIN_GET_EXAM_RESULTS: '/api/exam/get-exam-results-admin',

  //discussions
  ADD_DISC_ADMIN: '/api/course/add-discussion-ques-admin',
  REPLY_DISC_ADMIN: '/api/course/add-discussion-reply-admin',
  DEL_DISC_ADMIN: '/api/course/delete-discussion-admin',
  EDIT_DISC_ADMIN: '/api/course/edit-discussion-admin',
  GET_DISC_ADMIN: '/api/course/get-valid-discussions-admin',
  ADD_DISC_CLIENT: '/api/course/add-discussion-ques-client',
  REPLY_DISC_CLIENT: '/api/course/add-discussion-reply-client',
  DEL_DISC_CLIENT: '/api/course/delete-discussion-client',
  EDIT_DISC_CLIENT: '/api/course/edit-discussion-client',
  GET_DISC_CLIENT: '/api/course/get-valid-discussions-client',

  //faqs
  FAQ: '/api/faq',

  //order

  PAYMENT_INIT: '/api/order/pay-init',
  GET_PENDING_ORDERS_ADMIN: '/api/order/pending-orders',
  GET_VERIFIED_ORDERS_ADMIN: '/api/order/verified-orders',
  CONFIRM_SINGLE_ORDER_ADMIN: '/api/order/confirm-single-order',
  GET_ALL_CLIETN_BASED_ORDERS: '/api/order/client-orders',

  REMOVE_STUDENT_FROM_COURSE: '/api/order/remove-student-from-course', //post

  PAYMENT_INIT: '/api/order/pay-init',
  GET_PENDING_ORDERS_ADMIN: '/api/order/pending-orders',
  GET_VERIFIED_ORDERS_ADMIN: '/api/order/verified-orders',
  CONFIRM_SINGLE_ORDER_ADMIN: '/api/order/confirm-single-order',
};

export default reqs;
