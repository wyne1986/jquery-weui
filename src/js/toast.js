+ function($) {
  "use strict";

  var defaults;
  
  var show = function(html, className) {
    className = className || "";
    var mask = $("<div class='weui-mask_transparent'></div>").appendTo(document.body);

    var tpl = '<div class="weui-toast ' + className + '">' + html + '</div>';
    var dialog = $(tpl).appendTo(document.body);

    dialog.show();
    dialog.addClass("weui-toast_visible");
  };

  var hide = function(callback) {
    $(".weui-mask_transparent").remove();
    $(".weui-toast_visible").removeClass("weui-toast_visible").transitionEnd(function() {
      var $this = $(this);
      $this.remove();
      callback && callback($this);
    });
  }

  $.toast = function(text, style, callback) {
    if(typeof style === "function") {
      callback = style;
    }
    var className, iconClassName = 'weui-icon-success-no-circle';
    if(style == "cancel") {
      className = "weui-toast_cancel";
      iconClassName = 'weui-icon-cancel'
    } else if(style == "forbidden") {
      className = "weui-toast_forbidden";
      iconClassName = 'weui-icon-warn'
    } else if(style == "text") {
      className = "weui-toast_text";
    }
    show('<i class="' + iconClassName + ' weui-icon_toast"></i><p class="weui-toast_content">' + (text || "已经完成") + '</p>', className);

    setTimeout(function() {
      hide(callback);
    }, toastDefaults.duration);
  }

  $.showLoading = function(text) {
    var html = '<div class="weui_loading">';
    html += '<i class="weui-loading weui-icon_toast"></i>';
    html += '</div>';
    html += '<p class="weui-toast_content">' + (text || "数据加载中") + '</p>';
    show(html, 'weui_loading_toast');
  }

  $.hideLoading = function() {
    hide();
  }

  var toastDefaults = $.toast.prototype.defaults = {
    duration: 2500
  }

}($);
