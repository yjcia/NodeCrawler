/**
 * Created by Yanjun on 2017/05/08.
 */
var http = require('http');
var https = require('https');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var log4js = require('log4js');
var moment = require('moment');
var async = require('async');
var stringUtil = require('./util/StringUtil');
var mysqlUtil = require('./util/DbUtil');
var commonAttribute = require('./common/const.js');

//log4js config
log4js.configure({
    appenders:[
        {type:'console',category:'crawler'}
    ]
});
var log = log4js.getLogger('crawler');
log.debug('------ start crawler ------');

function start_crawler(crawlUrl){
    mysqlUtil.queryKeyWordInfo(13,commonAttribute.PLATFORM_NAME,function(data){
        if(data.error == null){
            var result = data.result;
            var batchTime = moment().format(commonAttribute.DATETIME_FORMAT);
            result.forEach(function(item,index){
                var crawlerUrl = crawlUrl + item.cust_keyword_name;
                https.get(crawlerUrl,function(response){
                    var html = '';
                    response.setEncoding(commonAttribute.UTF8_ENCODING);
                    response.on('data',function(chunk){
                        html += chunk;
                    });
                    response.on('end',function(){
                        var $ = cheerio.load(html);
                        async.series([
                            function(callback) {
                                callback(analysisGoodsInfo($,crawlerUrl,batchTime,item),'analysisGoodsInfo');
                            },
                            function(callback) {
                                callback(analysisGoodsPriceInfo($,batchTime,item),'analysisGoodsPriceInfo');
                            }
                        ],function(err, results){
                            log.debug('finish : ' + results);
                        });
                    });
                });
            });
        }
        else{
            log.error(data.error);
        }
    });

}
function analysisGoodsInfo($,crawlerUrl,batchTime,item){
    log.debug('start crawler ' + item.cust_keyword_name);
    var productTitle = $('#productTitle', '#title').text().trim();
    var goodsId = stringUtil.encodeMD5(item.cust_keyword_id + commonAttribute.PLATFORM_NAME);
    var goodStatus = commonAttribute.STATUS_ON;
    var deliveryInfo = $('span[id=price-shipping-message]').children('b').text().trim();
    var inventoryInfo = stringUtil.getNumberInStr(
        $('div[id=availability]').children('span').text().trim()
    );
    var commentInfo = stringUtil.getNumberInStr($('span[id=acrCustomerReviewText]').text());
    var goodsInfo = {
        custKeywordId: item.cust_keyword_id,
        eGoodsId:item.cust_keyword_name,
        goodsId:goodsId,
        goodsName:productTitle,
        delivery:deliveryInfo,
        inventory:inventoryInfo,
        totalComment:commentInfo,
        goodsStatus:goodStatus,
        message:'',
        platformNameEN:commonAttribute.PLATFORM_NAME,
        platformCategory:commonAttribute.AMAZON_CATECODE,
        platformSellerId:'',
        platformSellerName:commonAttribute.PLATFORM_NAME,
        platformShopId:commonAttribute.AMAZON_SHOP_ID,
        platformShopName:commonAttribute.PLATFORM_NAME,
        platformShopType:commonAttribute.AMAZON_SHOP_TYPE,
        deliveryPlace:commonAttribute.PLATFORM_NAME,
        sellerLocation:'',
        saleQty:'',
        posCommentNum:'',
        negCommentNum:'',
        neuCommentNum:'',
        goodsUrl:crawlerUrl,
        goodsPicUrl:'',
        updateTime:moment().format(commonAttribute.DATETIME_FORMAT),
        updateDate:moment().format(commonAttribute.DATE_FORMAT),
        feature1:'',
        batchTime:batchTime,
        deposit:'',
        toUseAmount:'',
        reserveNum:''
    };
    mysqlUtil.saveGoodsInfo(goodsInfo,function(data){
        if(data.error == null){
            var result = data.result;
            log.debug("save goods info : " + result);
        } else{
            log.error(data.error);
        }
    });

}

function analysisGoodsPriceInfo($,batchTime,item){
    var goodsId = stringUtil.encodeMD5(item.cust_keyword_id + commonAttribute.PLATFORM_NAME);
    var productPrice = '';
    if($('tr[id=priceblock_ourprice_row]').find('span[id=priceblock_ourprice]').length > 0){
        productPrice = $('span[id=priceblock_ourprice]').html().trim();
    }
    var priceInfo = {
        custKeywordId:item.cust_keyword_id,
        goodsId:goodsId,
        skuId:'',
        channel:commonAttribute.CHANNEL_PC,
        originalPrice:productPrice,
        currentPrice:productPrice,
        promotion:'',
        updateTime:moment().format(commonAttribute.DATETIME_FORMAT),
        updateDate:moment().format(commonAttribute.DATE_FORMAT),
        batchTime:batchTime,
        carnivalPrice:'',
        headPromotion:''
    };
    mysqlUtil.saveGoodsPriceInfo(priceInfo,function(data){
        if(data.error == null){
            var result = data.result;
            log.debug("save goods price info : " + result);
        } else{
            log.error(data.error);
        }
    });
}
start_crawler(commonAttribute.AMAZON_URL);
