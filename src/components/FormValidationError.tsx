import Icon from "@mdi/react";
import { mdiAlertCircleOutline } from "@mdi/js";

const FieldValidationError = ({ message }: { message: string }) => {
  return (
    <div className="text-red-600 flex items-center gap-1 mt-2">
      <Icon path={mdiAlertCircleOutline} size={0.8} />
      <p>{message}</p>
    </div>
  );
};

export default FieldValidationError;
