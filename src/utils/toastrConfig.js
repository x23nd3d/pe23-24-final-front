import * as toastr from "toastr";
import "toastr/build/toastr.css";

export default function pushNotification(style, message, message2, clazz) {
  toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: false,
    progressBar: true,
    positionClass: "toast-bottom-right",
    preventDuplicates: false,
    showDuration: "2000",
    hideDuration: "2000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
    iconClasses: {
      error: "toast-error",
      info: "toast-info",
      success: "toast-success",
      warning: "toast-warning",
    },
  };

  return toastr[style](message, message2, clazz);
}
