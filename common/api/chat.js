export class ChatClient {
  constructor(url, onMessage, onStateChange) {
    this.url = url;
    this.socketTask = null;
    this.onMessage = onMessage;
    this.onStateChange = onStateChange;
  }

  connect(token) {
    if (this.socketTask) return;
    this.socketTask = uni.connectSocket({
      url: `${this.url}?token=${encodeURIComponent(token || "")}`
    });

    this.socketTask.onOpen(() => {
      if (this.onStateChange) this.onStateChange("open");
    });

    this.socketTask.onMessage((event) => {
      let payload = event.data;
      try {
        payload = JSON.parse(event.data);
      } catch (e) {
        // keep raw payload
      }
      if (this.onMessage) this.onMessage(payload);
    });

    this.socketTask.onError(() => {
      if (this.onStateChange) this.onStateChange("error");
    });

    this.socketTask.onClose(() => {
      if (this.onStateChange) this.onStateChange("closed");
      this.socketTask = null;
    });
  }

  send(message) {
    if (!this.socketTask) return;
    this.socketTask.send({
      data: typeof message === "string" ? message : JSON.stringify(message)
    });
  }

  close() {
    if (!this.socketTask) return;
    this.socketTask.close({ code: 1000, reason: "manual close" });
    this.socketTask = null;
  }
}

export function createMockReply(content) {
  return {
    sender: "service",
    content: `Auto reply: ${content}`,
    time: new Date().toLocaleTimeString()
  };
}
