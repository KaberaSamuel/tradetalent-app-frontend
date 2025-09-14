interface Props {
  updateVisibility: (choice: boolean) => void;
}

export default function ModalOveraly({ updateVisibility }: Props) {
  const styles = "fixed z-5 opacity-60 inset-0 bg-neutral-800";

  return (
    <div
      onClick={() => {
        updateVisibility(false);
      }}
      className={styles}
    ></div>
  );
}
