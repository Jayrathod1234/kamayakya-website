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
export const BILLING_URL = `${USER_URL}/payment_details/`;
export const BILLING_DETAILS_URL = `${USER_URL}/payment_success_details/`;

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
// export const INVOICE_DETAILS = `${ADMIN_URL}/generate_invoice/`;

//Stripe Key
export const STRIPE_KEY = process.env.NEXT_PUBLIC_STRIPE_KEY;
// ||  'pk_test_51N3dAPSFPooNZtZaCwGwRUC1IHpC4HqARVbxMBia13Fqan4H6SoLZUhLz21xqqMhtDU5Kiurtzia2uznSEbGSADk00LRBh1V2p'

// export const TEST_URL = "https://test-server.kamayakya.in";
export const USER_URL1 = `${BASE_URL}/user`;
export const SUBS_URL1 = `${USER_URL1}/subscribe/`;
