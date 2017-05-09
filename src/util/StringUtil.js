/**
 * Created by Yanjun on 2017/05/08.
 */
var crypto = require('crypto');

/**
 * MD5 加密
 * @param content
 */
exports.encodeMD5 = function(content){
    var md5 = crypto.createHash('md5');
    md5.update(content);
    var result = md5.digest('hex');
    return result;
};

/**
 * 获得数值
 * @param content
 */
exports.getNumberInStr = function(content){
    var regExp = /[0-9]+/; //未使用g选项
    var res = regExp.exec(content);
    if(res != null && res.length > 0){
        return res[0];
    }else{
        return ''
    }
};

