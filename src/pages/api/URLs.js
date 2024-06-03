//AUTH BASE
// console.log(process.env.NEXT_PUBLIC_STRIPE_KEY);
// export const BASE_URL = "https://api-server.kamayakya.in";
// export const BASE_URL = "https://test-server.kamayakya.in";
export const BASE_URL = process.env.NEXT_PUBLIC_BASEPATH;
// export const BASE_URL = "http://192.168.0.151:8000";
// export const BASE_URL = "http://192.168.0.151:8000";
// export const BASE_U       RL = process.env.NEXT_PUBLIC_BASEPATH;
// console.log(process.env.NEXT_PUBLIC_BASEPATH);
// console.log(BASE_URL);
export const ADMIN_URL = `${BASE_URL}/kmkadmin`;
export const MASTER_URL = `${BASE_URL}/master`;
export const USER_URL = `${BASE_URL}/user`;

//Auth URLs
export const LOGIN_URL = `${MASTER_URL}/loginAdmin/`;
export const REGISTER_URL = `${MASTER_URL}/register_admin/`;
export const VERIFY_TOKEN_URL = `${MASTER_URL}/verifyToken`;
export const REGEN_TOKEN_URL = `${MASTER_URL}/regenerateRefreshToken/`;

//Payment
export const GET_PRODUCT = `${ADMIN_URL}/subscription/`;
export const PAYMENT_URL =
  `${USER_URL}/create-checkout-session/` || "http://localhost:3000";

//Profile URLs
export const USER_PROFILE_URL = `${USER_URL}/userprofile/`;
export const GET_USER = `${USER_URL}/userprofile/`;
export const EDIT_USER = `${USER_URL}/userprofile/`;
export const SUBSCRIPTION_HISTORY = `${USER_URL}/subscribe_for_stock_picks/`;

//Admin Stock URL
export const GET_ALL_URL = `${USER_URL}/getStockPicksForUser`;
// export const GET_ALL_SME_URL = `${USER_URL}/getStockPicksForUser`;
export const GET_ALL_SME_URL = `${USER_URL}/getSMEStockPicks`;
export const GET_SPECIFIC_STOCK_URL = `${USER_URL}/specificStock`;
// export const GET_ALL_URL = `${ADMIN_URL}/getAllStocks/`;

//Billing Info
export const BILLING_INFO_URL = `${USER_URL}/ccavenue_transaction/`;
export const SUBSCRIBE_URL = `${USER_URL}/subscribe/`;
export const SUBSCRIBE_RAZORPAY = `${USER_URL}/subscribe_through_razorpay/`;

export const RAZORPAY_CALLBACK = `${USER_URL}/razorpay_callback/`;
export const BILLING_URL_RAZORPAY = `${USER_URL}/razorpay_transaction/`;

//Blogs URL
export const GET_BLOGS = `${USER_URL}/all_blogs/`;
export const GET_SPECIFIC_BLOG = `${USER_URL}/blog/`;

//Track Records
export const TRACK_RECORD_FOR_ALL = `${USER_URL}/getTrackRecordForAll`;
export const TRACK_RECORD_FOR_USER = `${USER_URL}/getTrackRecordForUser`;

//Users URLs
export const REG_USER_EMAIL = `${MASTER_URL}/customEmailToken/`;
export const REG_USER_MOBILE = `${MASTER_URL}/customMobileToken/`;
export const VERIFY_USER = `${MASTER_URL}/auth/token/`;
export const GET_USERS = `${ADMIN_URL}/getAllUsers/`;
export const GET_ADMINS = `${ADMIN_URL}/getAllAdmin/`;

//upload Invoice
export const INVOICE_UPLOAD = `${ADMIN_URL}/upload_invoice/`;

export const USER_URL1 = `${BASE_URL}/user`;
export const SUBS_URL1 = `${USER_URL1}/subscribe/`;

// Discount Code Validation
export const CODE_VALID = `${USER_URL}/validate_discount_code/`;

//Pricings apis
export const PLANS_URL = `${USER_URL}/subscription_plans`
export const ACTIVE_PLAN_URL = `${USER_URL}/active_subscription`
export const NEWSLETTER_SUBSCRIBE_URL = `${USER_URL}/newsletter_subscribe/`
export const CONTACT_URL = `${USER_URL}/contact_us/`