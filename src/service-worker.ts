/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

interface INotificationPayload {
    icon: string;
    title: string;
    body: string;
    imageUrl?: string;
}

const sw = self as unknown as ServiceWorkerGlobalScope & typeof globalThis;

sw.addEventListener("push", (event) => {
    const notificationPayload = event.data?.json() as INotificationPayload;

    event.waitUntil(
        sw.registration.showNotification(notificationPayload.title, {
            icon: notificationPayload.icon,
            body: notificationPayload.body,
            // image: notificationPayload.imageUrl,
        })
    );
});
