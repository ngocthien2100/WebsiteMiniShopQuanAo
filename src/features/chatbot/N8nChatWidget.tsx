import { useEffect } from "react";
import "@n8n/chat/style.css";
import { products, shippingPolicy } from "@/shared/data/products";

const webhookUrl =
  (import.meta as ImportMeta & { env?: Record<string, string> }).env?.VITE_N8N_CHATBOT_WEBHOOK || "";

const productCategories = Array.from(
  products.reduce((categoryMap, product) => {
    const current = categoryMap.get(product.category) || {
      value: product.category,
      label: product.categoryLabel,
      productCount: 0,
    };

    categoryMap.set(product.category, {
      ...current,
      productCount: current.productCount + 1,
    });

    return categoryMap;
  }, new Map<string, { value: string; label: string; productCount: number }>()),
).map(([, category]) => category);

export default function N8nChatWidget() {
  useEffect(() => {
    const target = document.querySelector("#n8n-chat");
    let disposed = false;

    if (!target || !webhookUrl) {
      return;
    }

    target.innerHTML = "";

    async function mountChat() {
      const { createChat } = await import("@n8n/chat");

      if (disposed) {
        return;
      }

      createChat({
        webhookUrl,
        target: "#n8n-chat",
        mode: "window",
        loadPreviousSession: true,
        showWelcomeScreen: false,
        initialMessages: [
          "Chào bạn, mình là chatbot tư vấn của MiniStyle.",
          "Bạn có thể hỏi về sản phẩm, ngân sách, size, cách đặt hàng hoặc chính sách đổi trả.",
        ],
        i18n: {
          en: {
            title: "MiniStyle AI",
            subtitle: "Tư vấn sản phẩm qua n8n",
            footer: "",
            getStarted: "Cuộc trò chuyện mới",
            inputPlaceholder: "Nhập câu hỏi tư vấn...",
          },
        },
        metadata: {
          source: "ministyle-website",
          categories: productCategories,
          products,
          policy: shippingPolicy,
        },
      });
    }

    void mountChat();

    return () => {
      disposed = true;
      target.innerHTML = "";
    };
  }, []);

  if (!webhookUrl) {
    return null;
  }

  return <div id="n8n-chat" className="n8n-chat-host" />;
}
