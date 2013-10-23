var AlertJS = (function (alertjs) {
	alertjs.Init = function () {
		$("body").append($("<div />").addClass("alertjs-notifications")).prepend($("<div />").addClass("alertjs-alerts"));
	};

	alertjs.Notify = (function (notify) {
		var generateCloseButton = function () {
			var btn = $("<a />").addClass("alertjs-close")
								.attr("href", "javascript:void();")
								.html("x")
								.on("click", function (event) {
									event.preventDefault();
									$(this).parent().fadeOut();
								});

			return btn;
		};

		var generateNotification = function (title, message, type) {
			var notification = $("<div />").addClass("alertjs")
											.addClass("alertjs-notification")
											.addClass("alertjs-" + type)
											.append(generateCloseButton)
											.append(
													$("<h1 />").html(title)
												)
											.append(
													$("<p />").html(message)
												);

			setTimeout(function () {
				notification.fadeOut();
			}, 10000);

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
		var generateCloseButton = function () {
			var btn = $("<a />").addClass("alertjs-close")
								.attr("href", "javascript:void();")
								.html("x")
								.on("click", function (event) {
									event.preventDefault();
									$(this).parent().fadeOut();
								});

			return btn;
		};

		var generateAlert = function (title, message, type) {
			var notification = $("<div />").addClass("alertjs")
											.addClass("alertjs-alert")
											.addClass("alertjs-" + type)
											.append(generateCloseButton)
											.append(
													$("<h1 />").html(title)
												)
											.append(
													$("<p />").html(message)
												);

			setTimeout(function () {
				notification.fadeOut();
			}, 10000);

			return notification;
		};

		var addAlert = function (title, message, type) {
			$(document).find(".alertjs-alerts").append(generateAlert(title, message, type).fadeIn());
		};

		alert.Error = function (title, message) {
			addAlert(title, message, "error");
		};

		alert.Info = function (title, message) {
			addAlert(title, message, "info");
		};

		alert.Warning = function (title, message) {
			addAlert(title, message, "warning");
		};

		alert.Success = function (title, message) {
			addAlert(title, message, "success");
		};

		return alert;
	})(alertjs.Alert || {});

	return alertjs;
})(AlertJS || {});

$(document).ready(function () {
	AlertJS.Init();
});