/**
 * Created by Yanjun on 2017/05/08.
 */
var mysql = require('mysql');
var commonAttribute = require('../common/const.js');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database:'amazon'
});
connection.connect();
exports.queryKeyWordInfo = function(custAccountId,platformName,callback){
    var sqlStr = "select * from craw_keywords_Info c where c.cust_account_id=? and c.platform_name=?";
    connection.query({
        sql: sqlStr,
        timeout: 10000,
        values: [custAccountId,platformName]
    }, function (error, results, fields) {
        if (error) {
            callback({'error': error});
        }
        if(results.length > 0){
            callback({'result': results});
        }
    });
};

exports.saveGoodsInfo = function(goodsInfo,callback){
    var sqlStr = "insert into craw_goods_info (" + commonAttribute.GOODS_INSERT_COLUMN + ") values (#paramLocation)";
    var insertValueArr = commonAttribute.GOODS_INSERT_COLUMN.split(',');
    var tempStr = '';
    for(var i = 0;i < insertValueArr.length; i++){
        tempStr += '?,';
    }
    tempStr = tempStr.substr(0,tempStr.length - 1);
    var insertSql = sqlStr.replace('#paramLocation',tempStr);
    connection.query({
        sql: insertSql,
        timeout: 10000,
        values: [
            goodsInfo.custKeywordId,
            goodsInfo.goodsId,
            goodsInfo.eGoodsId,
            goodsInfo.message,
            goodsInfo.goodsName,
            goodsInfo.platformNameEN,
            goodsInfo.platformCategory,
            goodsInfo.platformSellerId,
            goodsInfo.platformSellerName,
            goodsInfo.platformShopId,
            goodsInfo.platformShopName,
            goodsInfo.platformShopType,
            goodsInfo.delivery,
            goodsInfo.deliveryPlace,
            goodsInfo.sellerLocation,
            goodsInfo.goodsStatus,
            goodsInfo.inventory,
            goodsInfo.saleQty,
            goodsInfo.totalComment,
            goodsInfo.posCommentNum,
            goodsInfo.negCommentNum,
            goodsInfo.neuCommentNum,
            goodsInfo.goodsUrl,
            goodsInfo.goodsPicUrl,
            goodsInfo.updateTime,
            goodsInfo.updateDate,
            goodsInfo.feature1,
            goodsInfo.batchTime,
            goodsInfo.deposit,
            goodsInfo.toUseAmount,
            goodsInfo.reserveNum
        ]
    }, function (error, results, fields) {
        if (error) {
            callback({'error': error});
        }
        if(results.length > 0){
            callback({'result': results});
        }
    });
};

exports.saveGoodsPriceInfo = function(goodsPriceInfo,callback){
    var sqlStr = "insert into craw_goods_price_info (" + commonAttribute.PRICE_INSERT_COLUMN + ") values (#paramLocation)";
    var insertValueArr = commonAttribute.PRICE_INSERT_COLUMN.split(',');
    var tempStr = '';
    for(var i = 0;i < insertValueArr.length; i++){
        tempStr += '?,';
    }
    tempStr = tempStr.substr(0,tempStr.length - 1);
    var insertSql = sqlStr.replace('#paramLocation',tempStr);
    connection.query({
        sql: insertSql,
        timeout: 20000,
        values: [
            goodsPriceInfo.custKeywordId,
            goodsPriceInfo.goodsId,
            goodsPriceInfo.skuId,
            goodsPriceInfo.channel,
            goodsPriceInfo.originalPrice,
            goodsPriceInfo.currentPrice,
            goodsPriceInfo.promotion,
            goodsPriceInfo.updateTime,
            goodsPriceInfo.updateDate,
            goodsPriceInfo.batchTime,
            goodsPriceInfo.carnivalPrice,
            goodsPriceInfo.headPromotion
        ]
    }, function (error, results, fields) {
        if (error) {
            callback({'error': error});
        }
        if(results.length > 0){
            callback({'result': results});
        }
    });
};

exports.updateGoodsInfoPic = function(goodsPicUrl,custKeywordId,callback){
    var updateSqlStr = "update craw_goods_info set goods_pic_url = ? where cust_keyword_id = ?";
    connection.query({
        sql: updateSqlStr,
        timeout: 20000,
        values: [goodsPicUrl,custKeywordId]
    }, function (error, results, fields) {
        if (error) {
            callback({'error': error});
        }
        if(results.length > 0){
            callback({'result': results});
        }
    });
};

exports.insertScreenshotInfo = function(screenshotInfo,callback){
    var sqlStr = "insert into craw_screenshot_info (" + commonAttribute.SCREENSHOT_COLUMN + ") values (#paramLocation)";
    var insertValueArr = commonAttribute.SCREENSHOT_COLUMN.split(',');
    var tempStr = '';
    for(var i = 0;i < insertValueArr.length; i++){
        tempStr += '?,';
    }
    tempStr = tempStr.substr(0,tempStr.length - 1);
    var insertSql = sqlStr.replace('#paramLocation',tempStr);
    connection.query({
        sql: insertSql,
        timeout: 20000,
        values: [
            screenshotInfo.custAccountId,
            screenshotInfo.screenshotType,
            screenshotInfo.screenshotId,
            screenshotInfo.skuId,
            screenshotInfo.screenshotUrl,
            screenshotInfo.updateTime,
            screenshotInfo.updateDate,
            screenshotInfo.screenshotTime,
            screenshotInfo.batchTime,
            screenshotInfo.channel

        ]
    }, function (error, results, fields) {
        if (error) {
            callback({'error': error});
        }
        if(results.length > 0){
            callback({'result': results});
        }
    });
};