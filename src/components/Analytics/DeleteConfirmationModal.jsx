import { ButtonComponent } from "../";
import styles from "./Analytics.module.css";

const DeleteConfirmationModal = ({
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  onClose,
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const handleCancel = () => {
    onCancel();
    onClose();
  };

  return (
    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalHeading}>
          Are you sure you want to delete?
        </h2>

        <div className={styles.modalButtonContainer}>
          <ButtonComponent
            className={styles.confirmButton}
            onClick={handleConfirm}
          >
            {confirmLabel}
          </ButtonComponent>
          <ButtonComponent onClick={handleCancel}>
            {cancelLabel}
          </ButtonComponent>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
