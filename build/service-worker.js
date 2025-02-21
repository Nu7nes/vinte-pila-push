"use strict";
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
var sw = self;
sw.addEventListener("push", function (event) {
    var _a;
    var notificationPayload = (_a = event.data) === null || _a === void 0 ? void 0 : _a.json();
    event.waitUntil(sw.registration.showNotification(notificationPayload.title, {
        icon: notificationPayload.icon,
        body: notificationPayload.body,
        // image: notificationPayload.imageUrl,
    }));
});
