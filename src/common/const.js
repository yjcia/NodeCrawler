/**
 * Created by Yanjun on 2017/05/09.
 */
module.exports = Object.freeze({
    AMAZON_URL: 'https://www.amazon.de/dp/',
    PLATFORM_NAME: 'amazon',
    UTF8_ENCODING:'UTF-8',
    STATUS_ON:1,
    ACCOUNT_ID:'13',
    AMAZON_CATECODE:'2077416031',
    AMAZON_SHOP_ID:'5',
    AMAZON_SHOP_TYPE:'自营',
    DATETIME_FORMAT:'YYYY-MM-DD HH:mm:ss',
    DATETIME_FORMAT2:'YYYYMMDDHHmmss',
    DATE_FORMAT:'YYYY-MM-DD',
    CHANNEL_PC:'PC',
    SCREENSHOT_TYPE:'SKU',
    PIC_PATH:"/goodsPic/",
    FTP_HOST:'101.231.74.130',
    FTP_PORT:21,
    FTP_USER:'admin',
    FTP_PASSWORD:'infopower2016',
    GOODS_INSERT_COLUMN:'cust_keyword_id,goodsId,' +
    'egoodsId,message,platform_goods_name,' +
    'platform_name_en,platform_category,' +
    'platform_sellerid,platform_sellername,' +
    'platform_shopid,platform_shopname, ' +
    'platform_shoptype,delivery_info, ' +
    'delivery_place,seller_location, ' +
    'goods_status,inventory,sale_qty, ' +
    'ttl_comment_num,pos_comment_num,neg_comment_num, ' +
    'neu_comment_num,goods_url,goods_pic_url, ' +
    'update_time,update_date,feature1, ' +
    'batch_time,deposit,to_use_amount,reserve_num',
    PRICE_INSERT_COLUMN:'cust_keyword_id,' +
    'goodsid,SKUid,channel,original_price,' +
    'current_price,promotion,update_time,' +
    'update_date,batch_time,carnival_price,head_promotion',
    SCREENSHOT_COLUMN:'cust_account_id,screenshot_type, ' +
    'screenshot_id, skuid, screenshot_url, ' +
    'update_time, update_date, screenshot_time, ' +
    'batch_time, channel'
});