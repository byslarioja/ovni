import { AssetStatus } from "Screens/Camera/services/types";
import { DoneIcon, ErrorIcon, UploadingIcon, WaitingIcon } from "./StatusIcon";

export function StatusIndicator({ status }: { status: AssetStatus }) {
  if (status === AssetStatus.Pending) {
    return <WaitingIcon />;
  }

  if (status === AssetStatus.Uploaded) {
    return <DoneIcon />;
  }

  if (status === AssetStatus.Rejected) {
    return <ErrorIcon />;
  }

  return <UploadingIcon />;
}
