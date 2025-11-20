import type { Metadata } from "next";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ChatSidebar } from "./_components/chat-sidebar";
import ChatsHeader from "./_components/chats-header";

export const metadata: Metadata = {
    title: "Chats",
}

export default function ChatLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
      <SidebarProvider>
      <ChatSidebar />
      <SidebarInset>
        <ChatsHeader />
       <main className="h-[calc(100vh-4rem)] ">{children}</main>
      </SidebarInset>
    </SidebarProvider>
    );
}



