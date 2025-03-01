import { notification } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";
export const useNotification = () => {
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (
    type: NotificationType,
    { message, description }: { message: string; description: string }
  ) => {
    api[type]({
      message: message ?? "Notification Title",
      description: description ?? "This is the content of the notification.",
    });
  };

  return {
    contextHolder,
    openNotificationWithIcon,
  };
};
