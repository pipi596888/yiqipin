<template>
  <view class="page">
    <view class="state">Status: {{ state }}</view>

    <scroll-view scroll-y class="messages" :scroll-top="scrollTop">
      <view v-for="(msg, idx) in messages" :key="idx" class="msg" :class="msg.sender">
        <text class="bubble">{{ msg.content }}</text>
        <text class="time">{{ msg.time }}</text>
      </view>
    </scroll-view>

    <view class="input-bar">
      <input class="input" v-model.trim="content" placeholder="Type your message" />
      <button size="mini" type="primary" @click="send">Send</button>
    </view>
  </view>
</template>

<script>
import { requireLogin } from "../../common/utils/guard";
import { getToken } from "../../common/store/auth";
import { ChatClient, createMockReply } from "../../common/api/chat";

const WS_URL = "ws://localhost:8080/ws/chat";
const USE_MOCK_REPLY = true;

export default {
  data() {
    return {
      state: "disconnected",
      client: null,
      content: "",
      messages: [],
      scrollTop: 0
    };
  },
  onShow() {
    if (!requireLogin("/pages/chat/index")) return;
    this.connect();
  },
  onHide() {
    this.disconnect();
  },
  onUnload() {
    this.disconnect();
  },
  methods: {
    connect() {
      if (this.client) return;
      this.client = new ChatClient(
        WS_URL,
        (payload) => {
          const message = typeof payload === "string" ? { sender: "service", content: payload } : payload;
          this.pushMessage({
            sender: message.sender || "service",
            content: message.content || "",
            time: message.time || new Date().toLocaleTimeString()
          });
        },
        (state) => {
          this.state = state;
        }
      );
      this.state = "connecting";
      this.client.connect(getToken());
    },
    disconnect() {
      if (!this.client) return;
      this.client.close();
      this.client = null;
      this.state = "disconnected";
    },
    pushMessage(msg) {
      this.messages.push(msg);
      this.$nextTick(() => {
        this.scrollTop = this.messages.length * 200;
      });
    },
    send() {
      if (!this.content) return;
      const content = this.content;
      this.content = "";

      this.pushMessage({
        sender: "user",
        content,
        time: new Date().toLocaleTimeString()
      });

      if (this.client && this.state === "open") {
        this.client.send({ type: "text", content });
      }

      if (USE_MOCK_REPLY) {
        setTimeout(() => {
          this.pushMessage(createMockReply(content));
        }, 500);
      }
    }
  }
};
</script>

<style>
.page {
  padding: 24rpx;
  height: calc(100vh - 48rpx);
  display: flex;
  flex-direction: column;
}

.state {
  margin-bottom: 12rpx;
  color: #666;
}

.messages {
  flex: 1;
  background: #fff;
  border-radius: 12rpx;
  padding: 16rpx;
}

.msg {
  margin-bottom: 14rpx;
  display: flex;
  flex-direction: column;
}

.msg.user {
  align-items: flex-end;
}

.msg.service {
  align-items: flex-start;
}

.bubble {
  max-width: 70%;
  padding: 12rpx 16rpx;
  border-radius: 10rpx;
  background: #f2f4f7;
}

.msg.user .bubble {
  background: #1677ff;
  color: #fff;
}

.time {
  color: #999;
  font-size: 22rpx;
  margin-top: 6rpx;
}

.input-bar {
  margin-top: 12rpx;
  display: flex;
  gap: 10rpx;
}

.input {
  flex: 1;
  height: 72rpx;
  border: 1px solid #ddd;
  border-radius: 10rpx;
  padding: 0 14rpx;
  background: #fff;
}
</style>
