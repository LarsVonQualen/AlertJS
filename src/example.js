$(document).ready(function () {
	$("#TriggerInfoNotification").on("click", function () {
		AlertJS.Notify.Info("Info", "This is an informational message.");
	});

	$("#TriggerWarningNotification").on("click", function () {
		AlertJS.Notify.Warning("Warning", "This is a warning message.");
	});

	$("#TriggerErrorNotification").on("click", function () {
		AlertJS.Notify.Error("Error", "This is a error message.");
	});

	$("#TriggerSuccessNotification").on("click", function () {
		AlertJS.Notify.Success("Success", "This is a success message.");
	});

	$("#TriggerInfoAlert").on("click", function () {
		AlertJS.Alert.Info("Info", "This is an informational message.");
	});

	$("#TriggerWarningAlert").on("click", function () {
		AlertJS.Alert.Warning("Warning", "This is a warning message.");
	});

	$("#TriggerErrorAlert").on("click", function () {
		AlertJS.Alert.Error("Error", "This is a error message.");
	});

	$("#TriggerSuccessAlert").on("click", function () {
		AlertJS.Alert.Success("Success", "This is a success message.");
	});
});