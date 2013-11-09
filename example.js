$(document).ready(function () {
    $.each($(".settings").children(), function (obj, index) {
        var settings = AlertJS.Settings();
        $(this).prop("checked", settings[$(this).data("setting")]);
    });
    
    $(".setting").on("change", function () {
        var settings = AlertJS.Settings();
        settings[$(this).data("setting")] = $(this).prop("checked");
    });
    
	$("#TriggerInfoNotification").on("click", function () {
		AlertJS.Notify.Info("Info", "This is an informational message.");
	});

	$("#TriggerWarningNotification").on("click", function () {
		AlertJS.Notify.Warning("Warning", "This is a warning message.");
	});

	$("#TriggerErrorNotification").on("click", function () {
		AlertJS.Notify.Error("Error", "This is an error message.");
	});

	$("#TriggerSuccessNotification").on("click", function () {
		AlertJS.Notify.Success("Success", "This is a success message.");
	});
    
    $("#TriggerInfoNotificationTop").on("click", function () {
		AlertJS.Notify.Top.Info("Info", "This is an informational message.");
	});

	$("#TriggerWarningNotificationTop").on("click", function () {
		AlertJS.Notify.Top.Warning("Warning", "This is a warning message.");
	});

	$("#TriggerErrorNotificationTop").on("click", function () {
		AlertJS.Notify.Top.Error("Error", "This is an error message.");
	});

	$("#TriggerSuccessNotificationTop").on("click", function () {
		AlertJS.Notify.Top.Success("Success", "This is a success message.");
	});

	$("#TriggerInfoAlert").on("click", function () {
		AlertJS.Alert.Info("Info", "This is an informational message.");
	});

	$("#TriggerWarningAlert").on("click", function () {
		AlertJS.Alert.Warning("Warning", "This is a warning message.");
	});

	$("#TriggerErrorAlert").on("click", function () {
		AlertJS.Alert.Error("Error", "This is an error message.");
	});

	$("#TriggerSuccessAlert").on("click", function () {
		AlertJS.Alert.Success("Success", "This is a success message.");
	});
});