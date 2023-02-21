<script lang="ts">
import { Notification } from "@/helpers/notiwind";
import type { PropType } from "vue";

type NotificationType = "error" | "success";

export default {
  name: "NotificationToast",
  components: {
    Notification,
  },
  props: { type: String as PropType<NotificationType> },
  computed: {
    classObject() {
      return {
        "mx-auto mt-4 flex w-full max-w-sm overflow-hidden rounded-lg border-2  bg-transparent shadow-md":
          true,
        "border-indigo-500": this.type !== "success",
        "border-pink-500": this.type === "success",
      };
    },
  },
};
</script>

<template>
  <Notification
    v-slot="{ notifications }"
    enter="ease-out duration-300 transition"
    enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
    enter-to="translate-y-0 opacity-100 sm:translate-x-0"
    leave="transition ease-in duration-500"
    leave-from="opacity-100"
    leave-to="opacity-0"
    move="transition duration-500"
    move-delay="delay-300"
  >
    <div
      v-for="notification in notifications"
      :key="notification.id"
      :class="{
        'mx-auto mt-4 flex w-full max-w-sm overflow-hidden rounded-lg border-2 bg-zinc-900 shadow-md': true,
        'border-indigo-500': notification.type !== 'error',
        'border-pink-500': notification.type === 'error',
      }"
    >
      <div class="-mx-3 px-4 py-2">
        <div class="mx-3">
          <span
            :class="{
              'font-semibol': true,
              'text-indigo-500': notification.type !== 'error',
              'text-pink-500': notification.type === 'error',
            }"
            >{{ notification.title }}</span
          >
          <p class="text-sm text-slate-200">
            {{ notification.text }}
          </p>
        </div>
      </div>
    </div>
  </Notification>
</template>
