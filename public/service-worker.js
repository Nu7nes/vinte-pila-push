var t=self;t.addEventListener("push",o=>{let i=o.data?.json();o.waitUntil(t.registration.showNotification(i.title,{icon:i.icon,body:i.body}))});
//# sourceMappingURL=service-worker.js.map
