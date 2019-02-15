const noop = () => {};

class AppLauncher {
  constructor() {
    this.timer = null;
    this.threshold = 1000;
    this.iframe = null;
  }

  goApp(deepLink) {
    if (window.navigator.userAgent.match(/android/i) != null) {
      this.iframe = document.createElement("iframe");
      this.iframe.src = deepLink;
      document.body.appendChild(this.iframe);
    } else {
      window.location.href = deepLink;
    }
  }
  launch(options) {
    const {
      deepLink,
      url,
      pressCb = noop,
      failCb = noop,
      ctx = window
    } = options;
    const _this = this;
    const startTime = new Date();
    // 调起app的回调
    pressCb();
    document.removeEventListener("visibilitychange", ctx.handleHidePage);
    this.goApp(deepLink);


    // 挂起时长小于Threshold, 可以认为H5没有挂起,允许执行调起失败的回调
    this.timer = setTimeout(() => {
      const endTime = new Date();
      if (endTime - startTime < this.threshold) {
        window.open(url, "_blank");
        failCb();
      }
      if (this.iframe) {
        document.body.removeChild(this.iframe);
        this.iframe = null;
      }
    }, this.threshold / 2)

    // 页面后台运行时清除定时器和iframe，避免调起app成功的同时回到页面又执行failCb(下载)
    ctx.handleHidePage = function () {
      let tag = document.hidden || document.webkitHidden;
      if (tag) {
        clearTimeout(_this.timer);
      }
      if (_this.iframe) {
        document.body.removeChild(_this.iframe);
        _this.iframe = null;
      }
    };

    document.addEventListener("visibilitychange", ctx.handleHidePage);

  }
}
export default AppLauncher;

