import type { Metadata } from "next";
import Content from "@/components/dashboard/content";
import Layout from "@/components/cmsfullform/layout";

export const metadata: Metadata = {
  title: "Plant Master",
  description: "Dashboard for Machine Sensors",
};

export default function DashboardCMSPage() {
  return (
    <Layout>
      <Content />
    </Layout>
  );
}
