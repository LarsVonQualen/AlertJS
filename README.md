AlertJS
=======

Easy javascript notification and alert system.

How To
------

The library is very simple to use. Make sure you include the css in the header, and the javascript in the end of the `<body>` tag AFTER jQuery, and you are ready to pop some notifications or alerts!

In order to show a notification, simply use one of the following calls, with the appropriate type:
	
	AlertJS.Notify.Info("Some Title", "Some informational message.");
	AlertJS.Notify.Warning("Some Title", "Some warning message.");
	AlertJS.Notify.Error("Some Title", "Some error message.");
	AlertJS.Notify.Success("Some Title", "Some success message.");

Dependencies
------------
* jQuery (only tested with 2.0.3)