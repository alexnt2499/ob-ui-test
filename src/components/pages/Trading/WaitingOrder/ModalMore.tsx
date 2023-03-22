import Modal from 'src/components/Modal';
import icEyeSlash from 'src/assets/imgs/ic-eye-slash.svg';
import Image from 'next/image';
import { Eye2Icon, EyeSlashIcon } from '@/assets';

type ModalMoreProps = {
  onClose: () => void;
};
const ModalMore: React.FC<ModalMoreProps> = ({ onClose }) => {
  return (
    <Modal header="Arrange the informations" onClose={onClose}>
      <div className="flex">
        <div className="w-1/2 border-r border-r-blackBg pl-4">
          <div className="mb-8 flex items-center gap-3">
            <Image src={Eye2Icon} />
            <span className="text-xs font-bold">Time</span>
          </div>
          <div className="mb-8 flex items-center gap-3">
            <Image src={Eye2Icon} />
            <span className="text-xs font-bold">Order Type</span>
          </div>
          <div className="mb-8 flex items-center gap-3">
            <Image src={Eye2Icon} />
            <span className="text-xs font-bold">Action</span>
          </div>
          <div className="mb-8 flex items-center gap-3">
            <Image src={Eye2Icon} />
            <span className="text-xs font-bold">Pair</span>
          </div>
          <div className="mb-8 flex items-center gap-3">
            <Image src={Eye2Icon} />
            <span className="text-xs font-bold">Price</span>
          </div>
          <div className="flex items-center gap-3">
            <Image src={Eye2Icon} />
            <span className="text-xs font-bold">Amount</span>
          </div>
        </div>
        <div className="w-1/2 pl-8">
          <div className="mb-8 flex items-center gap-3">
            <Image src={EyeSlashIcon} />
            <span className="text-xs ">Matched</span>
          </div>
          <div className="mb-8 flex items-center gap-3">
            <Image src={EyeSlashIcon} />
            <span className="text-xs ">Total value(USD)</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default ModalMore;
