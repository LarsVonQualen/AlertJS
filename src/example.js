AlertJS.Notify.Info("Info", "Pre dom ready informational message.", true);
AlertJS.Notify.Warning("Warning", "Pre dom ready warning message.");
AlertJS.Notify.Error("Error", "Pre dom ready error message.");
AlertJS.Notify.Success("Success", "Pre dom ready success message.");
AlertJS.Notify.Top.Info("Info", "Pre dom ready informational message.");
AlertJS.Notify.Top.Warning("Warning", "Pre dom ready warning message.");
AlertJS.Notify.Top.Error("Error", "Pre dom ready error message.");
AlertJS.Notify.Top.Success("Success", "Pre dom ready success message.");
//AlertJS.Alert.Info("Info", "Pre dom ready informational message.");
//AlertJS.Alert.Warning("Warning", "Pre dom ready warning message.");
//AlertJS.Alert.Error("Error", "Pre dom ready error message.");
//AlertJS.Alert.Success("Success", "TPre dom ready success message.");

$(document).ready(function () {
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