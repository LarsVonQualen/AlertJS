/**
 * AlertJS
 *
 * @author Lars von Qualen <lars@larsvonqualen.dk>
 * @license MIT License
 * @copyright Lars von Qualen 2013
 */

var AlertJS = (function (alertjs) {
    var preDomNotificationsTopStack = [];
    var preDomNotificationStack = [];
    var preDomAlertStack = [];
    var ready = false;
    var sounds = {
        Error: {
            mp3: "",
            ogg: ""
        },
        Info: {
            mp3: "",
            ogg: ""
        },
        Warning: {
            mp3: "",
            ogg: ""
        },
        Success: {
            mp3: "",
            ogg: ""
        }
    };
    var settings = {
        sound: false
    };
    
    alertjs.Init = function (callback) {
        $("body").prepend($("<div />").addClass("alertjs-audio-players").css("display", "none"));
        $("body").prepend($("<div />").addClass("alertjs-notifications-top"));
        $("body").append($("<div />").addClass("alertjs-notifications"));
        ready = true;
        callback(preDomNotificationStack, preDomNotificationsTopStack, preDomAlertStack);
    };
    
    alertjs.Settings = function (newSettings) {
        if (settings === undefined) {
            return settings;
        } else {
            settings = newSettings;
        }
    };
    
    var PlaySound = function () {
        var player = $("<audio />").attr("autoplay", "autoplay")
        .append($("<source />").attr("src", sounds.sound1.wav).attr("type", "audio/wav"))
        .append($("<embed />").attr("hidden", "true").attr("autostart", "true").attr("loop", "false").attr("src", sounds.sound1.wav));
        
        $(".alertjs-audio-players").append(player);
        setTimeout(function () {
            player.remove();
        }, 5000);
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
        
        var generateNotification = function (title, message, type, sound) {
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
            
            if (settings.sound == true || sound == true) { 
                PlaySound();
            }
            
            setTimeout(function () {
                notification.fadeOut();
            }, 10000);
            
            return notification;
        };
        
        notify.addNotification = function (title, message, type, sound) {
            sound = typeof sound !== 'undefined' ? sound : settings.sound;
            
            if (!ready) {
                preDomNotificationStack.push({
                    title: title,
                    message: message,
                    type: type,
                    sound: sound
                });
            } else {
                $(document).find(".alertjs-notifications").append(generateNotification(title, message, type, sound).fadeIn());
            }
        };
        
        notify.Error = function (title, message, sound) {
            notify.addNotification(title, message, "error", sound);
        };
        
        notify.Info = function (title, message, sound) {
            notify.addNotification(title, message, "info", sound);
        };
        
        notify.Warning = function (title, message, sound) {
            notify.addNotification(title, message, "warning", sound);
        };
        
        notify.Success = function (title, message, sound) {
            notify.addNotification(title, message, "success", sound);
        };
        
        notify.Top = (function (top) {
            var generateCloseButton = function () {
                var btn = $("<a />").addClass("alertjs-close-btn")
                .attr("href", "javascript:void();")
                .html("x")
                .on("click", function (event) {
                    event.preventDefault();
                    $(this).parent().fadeOut();
                });
                
                return btn;
            };
            
            var generateNotification = function (title, message, type, sound) {
                var notification = $("<div />").addClass("alertjs")
                .addClass("alertjs-notification-top")
                .addClass("alertjs-" + type)
                .append(generateCloseButton)
                .append($("<div />").append($("<h1 />").html(title)).append($("<p />").html(message)).addClass("alertjs-message"));
                
                if (settings.sound == true || sound == true) { 
                    PlaySound();
                }
                
                setTimeout(function () {
                    notification.fadeOut();
                }, 10000);
                
                return notification;
            };
            
            top.addNotification = function (title, message, type, sound) {
                sound = typeof sound !== 'undefined' ? sound : settings.sound;
                
                if (!ready) {
                    preDomNotificationsTopStack.push({
                        title: title,
                        message: message,
                        type: type,
                        sound: sound
                    });
                } else {
                    $(document).find(".alertjs-notifications-top").append(generateNotification(title, message, type, sound).fadeIn());
                }
            };
            
            top.Error = function (title, message, sound) {
                top.addNotification(title, message, "error", sound);
            };
            
            top.Info = function (title, message, sound) {
                top.addNotification(title, message, "info", sound);
            };
            
            top.Warning = function (title, message, sound) {
                top.addNotification(title, message, "warning", sound);
            };
            
            top.Success = function (title, message, sound) {
                top.addNotification(title, message, "success", sound);
            };
            
            return top;
        })(notify.Top || {});
        
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
        
        var generateAlert = function (title, message, type, confirmCallback, sound) {
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
            
            if (settings.sound == true || sound == true) { 
                PlaySound();
            }
            
            return alert;
        };
        
        alert.addAlert = function (title, message, type, confirmCallback, sound) {
            sound = typeof sound !== 'undefined' ? sound : settings.sound;
            
            if (!ready) {
                preDomAlertStack.push({
                    title: title,
                    message: message,
                    type: type,
                    callback: confirmCallback,
                    sound: sound
                });
            } else {
                showOverlay();
                $("body").append(generateAlert(title, message, type, confirmCallback, sound).show());
            }
        };
        
        alert.Error = function (title, message, confirmCallback, sound) {
            alert.addAlert(title, message, "error", confirmCallback, sound);
        };
        
        alert.Info = function (title, message, confirmCallback, sound) {
            alert.addAlert(title, message, "info", confirmCallback, sound);
        };
        
        alert.Warning = function (title, message, confirmCallback, sound) {
            alert.addAlert(title, message, "warning", confirmCallback, sound);
        };
        
        alert.Success = function (title, message, confirmCallback, sound) {
            alert.addAlert(title, message, "success", confirmCallback, sound);
        };
        
        return alert;
    })(alertjs.Alert || {});
    
    $(document).ready(function () {
        alertjs.Init(function (notifications, notificationsTop, alerts) {
            for (i = 0; i < notifications.length; i++) {
                var notification = notifications[i];
                alertjs.Notify.addNotification(notification.title, notification.message, notification.type, notification.sound);
            }
            
            for (i = 0; i < notificationsTop.length; i++) {
                var notification = notificationsTop[i];
                alertjs.Notify.Top.addNotification(notification.title, notification.message, notification.type, notification.sound);
            }
            
            for (i = 0; i < alerts.length; i++) {
                var alert = alerts[i];
                alertjs.Alert.addAlert(alert.title, alert.message, alert.type, alert.callback, alert.sound);
            }
        });
    });
    
    return alertjs;
})(AlertJS || {});