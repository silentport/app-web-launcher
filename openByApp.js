function openByApp(option) {
  var tryTime = null; //尝试调起app的时间点
  var endTime = null; //即将执行下载的时间点
  var iframe = null;
  var Threshold = option.hangUp < 600 ? 600 : option.hangUp ; //h5页面挂起到恢复的最大时间

  option.first && option.first.bind(option.context)();

  document.removeEventListener("visibilitychange", window.handleHidePage);

  tryTime = new Date();
  
  if (window.navigator.userAgent.match(/android/i) != null) {
    iframe = document.createElement("iframe");
    iframe.src = option.deeplink;
    document.body.appendChild(iframe);
  } else {
    window.location.href = option.deeplink;
  }

  var timer = setTimeout(function () {
    endTime = new Date();
    // 挂起时长小于Threshold, 可以认为H5没有挂起,允许下载
    if (endTime - tryTime < Threshold) {

        location.href = option.downloadUrl;


        option.callback && option.callback.bind(option.context)();
    }
    if (iframe) {
        document.body.removeChild(iframe);
    }
  }, hangUp - 100)

  window.handleHidePage = function () {
    var tag = document.hidden || document.webkitHidden;
    if (tag) {
      clearTimeout(timer);
    }
  };
  document.addEventListener("visibilitychange", window.handleHidePage);

}
