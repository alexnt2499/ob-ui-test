import Modal from 'src/components/Modal';

type ModalCancelOrderProps = {
  onClose: () => void;
};
const ModalCancelOrder: React.FC<ModalCancelOrderProps> = ({ onClose }) => {
  return (
    <Modal
      header="Cancel this order?"
      onClose={onClose}
      headerSize="lg"
      width={324}
    >
      <span className="block text-sm text-blackDefault font-bold">
        You have to sign 1 transaction(s) to cancel this order
      </span>
      <div className="mt-8">
        <div className="flex justify-between">
          <span>Platform Fee</span>
          <span className="text-disabled text-xs">$0.15</span>
        </div>
        <div className="flex justify-between mt-4">
          <span>Network Gas Fee</span>
          <span className="text-disabled text-xs">$0.03</span>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-8">
        <button className="btn-big btn-danger font-bold" onClick={onClose}>
          Yes, Cancel now
        </button>
        <button className="btn-big btn-outlined font-bold" onClick={onClose}>
          Go back
        </button>
      </div>
    </Modal>
  );
};
export default ModalCancelOrder;
