import { createApp, createEventStream, createRouter, eventHandler } from "h3";

const app = createApp();
const router = createRouter();
app.use(router);
router.get(
    "/",
    eventHandler((event) => {
        const eventStream = createEventStream(event);
        const interval = setInterval(async () => {
            await eventStream.push("hello world");
        }, 1000);
        let onClosedCount = 0;
        eventStream.onClosed(() => {
            clearInterval(interval);
            onClosedCount++;
            console.log(`onClosed called ${onClosedCount} time(s)`);
        });
        return eventStream.send();
    }),
);

export default app;
