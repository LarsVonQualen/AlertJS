# AlertJS

Easy javascript notification and alert system.

# Features
- Custom modal alerts.
- Notifications popping up in the bottom right corner.
- Notifications popping down from the top of the page.
- Pre DOM ready queue, that fires at DOM ready.
- Four different notification sounds.

# Example
An example page can be found here: http://larsvonqualen.github.io/AlertJS/example/

# How To

The library is very simple to use. Make sure you include the css in the header, and the javascript in the end of the `<body>` tag AFTER jQuery, and you are ready to pop some notifications or alerts!

In order to show a notification, simply use one of the following calls, with the appropriate type:

	AlertJS.Notify.Info("Some Title", "Some informational message.");
	AlertJS.Notify.Warning("Some Title", "Some warning message.");
	AlertJS.Notify.Error("Some Title", "Some error message.");
	AlertJS.Notify.Success("Some Title", "Some success message.");
    
If you want the notification to come down from the top, you simply call the library like this:

	AlertJS.Notify.Top.Info("Some Title", "Some informational message.");
	AlertJS.Notify.Top.Warning("Some Title", "Some warning message.");
	AlertJS.Notify.Top.Error("Some Title", "Some error message.");
	AlertJS.Notify.Top.Success("Some Title", "Some success message.");

If you want to show a modal alert, you simply make one of the following calls:

	AlertJS.Alert.Info("Some Title", "Some informational message.");
	AlertJS.Alert.Warning("Some Title", "Some warning message.");
	AlertJS.Alert.Error("Some Title", "Some error message.");
	AlertJS.Alert.Success("Some Title", "Some success message.");
    
# Sound
The lib supports playing four different sounds, according to each notification type. The sound is activated either through global settings:
    
    AlertJS.Settings({
        sound: true
    });
    
or by adding a boolean value to the notification call, like so:

    AlertJS.Notify.Info("Some Title", "Some informational message.", true);

For further details, check of the example.html file.

# BE WARNED
This lib is BIG at around 3 MB, so make sure to have reasonably cache settings, OR hack the lib not to include the audio data. Happy hacking!

# Dependencies
* jQuery (only tested with 2.0.3)

# Credits
- A big thanks goes to Lauritz Munch (https://soundcloud.com/main-pitch) who made the four awesome sounds!