import Modal from 'src/components/Modal';
import icEye from 'src/assets/imgs/ic-eye-2.svg';
import icEyeSlash from 'src/assets/imgs/ic-eye-slash.svg';
import Image from 'next/image';

type ModalMoreProps = {
  onClose: () => void;
};
const ModalMore: React.FC<ModalMoreProps> = ({ onClose }) => {
  return (
    <Modal header="Arrange the informations" onClose={onClose}>
      <div className="flex">
        <div className="w-1/2 border-r-blackBg border-r pl-4">
          <div className="flex gap-3 items-center mb-8">
            <Image src={icEye} />
            <span className="text-xs font-bold">Time</span>
          </div>
          <div className="flex gap-3 items-center mb-8">
            <Image src={icEye} />
            <span className="text-xs font-bold">Order Type</span>
          </div>
          <div className="flex gap-3 items-center mb-8">
            <Image src={icEye} />
            <span className="text-xs font-bold">Action</span>
          </div>
          <div className="flex gap-3 items-center mb-8">
            <Image src={icEye} />
            <span className="text-xs font-bold">Pair</span>
          </div>
          <div className="flex gap-3 items-center mb-8">
            <Image src={icEye} />
            <span className="text-xs font-bold">Price</span>
          </div>
          <div className="flex gap-3 items-center">
            <Image src={icEye} />
            <span className="text-xs font-bold">Amount</span>
          </div>
        </div>
        <div className="w-1/2 pl-8">
          <div className="flex gap-3 items-center mb-8">
            <Image src={icEyeSlash} />
            <span className="text-xs ">Matched</span>
          </div>
          <div className="flex gap-3 items-center mb-8">
            <Image src={icEyeSlash} />
            <span className="text-xs ">Total value(USD)</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default ModalMore;
