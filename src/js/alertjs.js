/**
 * AlertJS
 *
 * @author Lars von Qualen <lars@larsvonqualen.dk>
 * @license MIT License
 * @copyright Lars von Qualen 2013
 */

var AlertJS = (function (alertjs) {
	alertjs.Init = function () {
		$("body").append($("<div />").addClass("alertjs-notifications"));
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
		var showOverlay = function () {
			$("body").append($("<div />").addClass("alertjs-overlay"));
		};

		var hideOverlay = function () {
			$("body").find(".alertjs-overlay").fadeOut();
		};

		var generateConfirmBtn = function (confirmCallback) {
			var btn = $("<a />").addClass("alertjs-confirmBtn").attr("href", "javascript:void();").html("O.K").on("click", function (event) {
				event.preventDefault();

				typeof confirmCallback === 'function' && confirmCallback();

				$(this).parent().parent().fadeOut();
				hideOverlay();
			});

			var wrapper = $("<div />").addClass("alertjs-confirmBtn-wrapper").append(btn);

			return wrapper;
		};

		var generateAlert = function (title, message, type, confirmCallback) {
			var alert = $("<div />").addClass("alertjs")
											.addClass("alertjs-alert")
											.addClass("alertjs-" + type)
											.append(
													$("<h1 />").html(title)
												)
											.append(
													$("<p />").html(message)
												)
											.append(generateConfirmBtn);

			return alert;
		};

		var addAlert = function (title, message, type, confirmCallback) {
			showOverlay();
			$("body").append(generateAlert(title, message, type, confirmCallback).show());
		};

		alert.Error = function (title, message, confirmCallback) {
			addAlert(title, message, "error", confirmCallback);
		};

		alert.Info = function (title, message, confirmCallback) {
			addAlert(title, message, "info", confirmCallback);
		};

		alert.Warning = function (title, message, confirmCallback) {
			addAlert(title, message, "warning", confirmCallback);
		};

		alert.Success = function (title, message, confirmCallback) {
			addAlert(title, message, "success", confirmCallback);
		};

		return alert;
	})(alertjs.Alert || {});

	return alertjs;
})(AlertJS || {});

$(document).ready(function () {
	AlertJS.Init();
});