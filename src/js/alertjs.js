var AlertJS = (function (alertjs) {
	alertjs.Init = function () {
		$("body").append($("<div />").addClass("alertjs-notifications"));
	};

	alertjs.Notify = (function (notify) {
		var generateCloseButton = function () {
			var btn = $("<a />").addClass("close")
								.attr("href", "javascript:void();")
								.html("x")
								.on("click", function (event) {
									event.preventDefault();
									$(this).parent().slideToggle();
								});

			return btn;
		};

		var generateNotification = function (title, message, type) {
			var notification = $("<div />").addClass("alertjs")
											.addClass("notification")
											.addClass(type)
											.append(generateCloseButton)
											.append(
													$("<h1 />").html(title)
												)
											.append(
													$("<p />").html(message)
												);

			return notification;
		};

		var addNotification = function (title, message, type) {
			$(document).find(".alertjs-notifications").append(generateNotification(title, message, type).fadeIn());
		};

		notify.Error = function (title, message) {
			addNotification(title, message, "error");
		};

		notify.Info = function (title, message) {
			addNotification(title, message, "info");
		};

		notify.Warning = function (title, message) {
			addNotification(title, message, "warning");
		};

		notify.Success = function (title, message) {
			addNotification(title, message, "success");
		};

		return notify;
	})(alertjs.Notify || {});

	alertjs.Alert = (function (alert) {
		var generateAlert = function (title, message, type) {

		};

		alert.Error = function (title, message) {
			
		};

		alert.Info = function (title, message) {
			
		};

		alert.Warning = function (title, message) {
			
		};

		alert.Success = function (title, message) {
			
		};

		return alert;
	})(alertjs.Alert || {});

	return alertjs;
})(AlertJS || {});