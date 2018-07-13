(function () {
    var shareURL = shareURL || location.href;
    var shareTitle = shareTitle || '据说每天0点，抖音“美好生活映像馆”大门就会开启。' ;
    var shareDesc = shareDesc ||   '7.12-7.23，每天0点首映，12段香奈儿J12的美好呈现。';
    var shareImg = shareImg || UrlUtils.getBase() + '/img/share.png';
    console.log(shareURL);
    console.log(shareTitle);
    console.log(shareDesc);
    console.log(shareImg);
    //
    $.ajax(
        {
            url: '//event.toutiaocloud.com/API/weixin/getSignPackage.php',
            type: "GET",
            dataType: 'jsonp',
            jsonp: 'wxJSONP'
        })
        .then(function (json) {
            console.log("getWxshareConfig")
            /* 微信API */
            wx.config({
                debug: false,
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
                appId: json.appId,
                timestamp: json.timestamp,
                nonceStr: json.nonceStr,
                signature: json.signature,
                //rawString: json.rawString
            });
            wx.ready(function () { // 在这里调用 API
                // 微信分享
                shareToWx();

                function shareToWx() {
                    // 分享给好友
                    wx.onMenuShareAppMessage({
                        title: shareTitle,
                        desc: shareDesc, // 分享描述
                        link: shareURL,
                        imgUrl: shareImg,
                        success: function () {
                            //alert('已分享');
                        },
                        complete: function () {
                            //alert('已完成');
                        },
                        cancel: function () {
                            //alert('已取消');
                        }
                    });

                    // 分享到朋友圈
                    wx.onMenuShareTimeline({
                        title: shareTitle,
                        desc: shareDesc, // 分享描述
                        link: shareURL,
                        imgUrl: shareImg,
                        success: function () {
                            //alert('已分享');
                        },
                        complete: function () {
                            //alert('已完成');
                        },
                        cancel: function () {
                            //alert('已取消');
                        }
                    });
                }
            });

        })
})()