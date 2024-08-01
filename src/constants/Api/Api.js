const BASE_URL = "http://15.206.169.180";

export const Reg_url = `${BASE_URL}/api/users`;
export const Login_url = `${BASE_URL}/api/users/login`;
export const Seller_Send_otp = `${BASE_URL}/api/sellers/sendOtp`;
export const Seller_login = `${BASE_URL}/api/sellers/login`;
export const Seller_update_password = `${BASE_URL}/api/sellers/updatePassword`;
export const Seller_forgot_password = `${BASE_URL}/api/sellers/forgotPassword`;
export const Seller_reset_password = `${BASE_URL}/api/sellers/resetPassword`;
export const Seller_logout = `${BASE_URL}/api/sellers/logout`;
export const Seller_products = `${BASE_URL}/api/products`;
export const Seller_product_category = `${BASE_URL}/api/category`;
export const all_brand = `${BASE_URL}/api/brands`;
export const productInfo = `${BASE_URL}/api/products`;
export const seller_prodInfo_update = `${BASE_URL}/api/products/update`;
export const get_product_image = `${BASE_URL}/api/variant/getVariantById`;
export const get_allvariants_data = `${BASE_URL}/api/variant/getVariantByProductId`;
export const product_description = `${BASE_URL}/api/products`;
export const product_update = `${BASE_URL}/api/products/update`;

//add supplier info
export const add_supplier = `${BASE_URL}/api/supplier/create`;
//Get all suppliers
export const get_suppliers = `${BASE_URL}/api/supplier`;
//Update status
export const update_status = `${BASE_URL}/api/supplier/update`;

//ADD WAREHOSE
export const add_warehouse = `${BASE_URL}/api/warehouse/create`;

//GET ALL WAREHOUSE LIST
export const get_warehouse = `${BASE_URL}/api/warehouse`;

//CREATE PURCHASE ORDER
export const create_purchase_order = `${BASE_URL}/api/po/create`;

//GET ALL PURCHASE ORDER
export const getAllPO = `${BASE_URL}/api/po/getAllPO`;

//PURCHASE ORDER DETAIL
export const purchase_order_detail = `${BASE_URL}/api/po/getPoById`;

//FOR ADD BILL
export const add_bill = `${BASE_URL}/api/bill/addBill`;

//FOR INVENTORY SUMMERY
export const get_inventory_summery = `${BASE_URL}/api/variant/getAllVariants`;
