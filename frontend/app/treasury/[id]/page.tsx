import type { Metadata } from "next";
import type { ReactElement } from "react";

import { TreasuryWorkspace } from "@/components/treasury-workspace";
import { APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${APP_NAME} | Treasury Workspace`,
};

type TreasuryWorkspacePageProps = {
  params: Promise<{ id: string }>;
};

export default async function TreasuryWorkspacePage({
  params,
}: TreasuryWorkspacePageProps): Promise<ReactElement> {
  const { id } = await params;
  return <TreasuryWorkspace treasuryId={id} />;
}
