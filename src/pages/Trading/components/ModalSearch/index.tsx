import Modal from 'src/components/Modal';
import Image from 'next/image';
import icSearch from 'src/assets/imgs/ic-search.svg';
import icArrowGreen from 'src/assets/imgs/arrow-down-green.svg';
import icArrowRed from 'src/assets/imgs/arrow-down-red.svg';
import icStarFilled from 'src/assets/imgs/ic-star.svg';
import icStarOutlined from 'src/assets/imgs/ic-star-3.svg';
import { SEARCH_INFORMATION } from '@/api/fakeData';
import { useSetRecoilState } from 'recoil';
import { setlimitOrder } from '@/recoil/store';
import { PairToken } from '@/api/models';

type ModalSearchProps = {
  onClose: () => void;
};

const ModalSearch: React.FC<ModalSearchProps> = ({ onClose }) => {
  const setOrder = useSetRecoilState(setlimitOrder);
  const handleSearch = (item: PairToken) => {
    setOrder({
      action: 'BUY',
      sell: {
        token: item[0].token,
        value: 0,
        image: item[0].image,
      },
      buy: {
        token: item[1].token,
        value: 0,
        image: item[1].image,
      },
    });
    onClose();
  };
  return (
    <Modal onClose={onClose} width={920}>
      <div>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Image src={icSearch} />
          </div>
          <input
            type="text"
            id="input-group-1"
            className="text-sm px-10 p-2.5 h-12 bg-white"
            placeholder="Try usdt-usdc"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 z-10">
            <button
              onClick={onClose}
              className="bg-blackDefault text-white font-bold rounded-lg px-2 py-1"
            >
              ESC
            </button>
          </div>
        </div>
        <span className="block mt-9 text-sm text-disabled">Recent Search</span>
        <div className="flex gap-2 mt-5 flex-wrap">
          {SEARCH_INFORMATION.recentSearch.map((item, i) => (
            <button
              className="btn-default"
              key={`${item}-${i}`}
              onClick={() => handleSearch(item)}
            >
              {item[0].token}/{item[1].token}
            </button>
          ))}
        </div>
        <hr className="mt-8 mb-9" />
        <div className="flex">
          <div className="w-1/2 border-r-blackBg border-r pl-4">
            <span className="block text-sm font-bold text-disabled mb-7">
              Your Favorited
            </span>
            {SEARCH_INFORMATION.favoritedList.map((item, i) => (
              <div
                className="flex items-center justify-between pr-9 mb-12"
                key={`${item.pairToken}-${i}`}
              >
                <Image src={item.pairToken[0].image} width={16} height={16} />
                <Image src={item.pairToken[1].image} width={16} height={16} />
                <span className="ml-2 text-sm">{item.pairToken[0].token}</span>
                <hr className="w-2 mx-1" />
                <span className="mr-2 text-sm">{item.pairToken[1].token}</span>
                {item.percentChanged >= 0 && (
                  <>
                    <div className="w-24 flex items-center gap-1">
                      <span className="text-right text-xs text-success">
                        +{item.percentChanged}%
                      </span>
                      <Image src={icArrowGreen} />
                    </div>
                    <span className="w-16 text-success text-bold text-sm mr-10">
                      {item.priceChanged}
                    </span>
                  </>
                )}
                {item.percentChanged < 0 && (
                  <>
                    <div className="w-24 flex items-center gap-1">
                      <span className="text-right text-xs text-danger">
                        +{item.percentChanged}%
                      </span>
                      <Image src={icArrowRed} />
                    </div>
                    <span className="w-16 text-danger text-bold text-sm mr-10">
                      {item.priceChanged}
                    </span>
                  </>
                )}
                <Image src={icStarFilled} />
              </div>
            ))}
          </div>

          <div className="w-1/2 pl-8">
            <span className="block text-sm font-bold text-disabled mb-7">
              Top Search
            </span>
            {SEARCH_INFORMATION.topSearch.map((item, i) => (
              <div
                className="flex items-center justify-between pr-9 mb-12"
                key={`${item.pairToken}-${i}`}
              >
                <Image src={item.pairToken[0].image} width={16} height={16} />
                <Image src={item.pairToken[1].image} width={16} height={16} />
                <span className="ml-2 text-sm">{item.pairToken[0].token}</span>
                <hr className="w-2 mx-1" />
                <span className="mr-2 text-sm">{item.pairToken[1].token}</span>
                {item.percentChanged >= 0 && (
                  <>
                    <div className="w-24 flex items-center gap-1">
                      <span className="text-right text-xs text-success">
                        +{item.percentChanged}%
                      </span>
                      <Image src={icArrowGreen} />
                    </div>
                    <span className="w-16 text-success text-bold text-sm mr-10">
                      {item.priceChanged}
                    </span>
                  </>
                )}
                {item.percentChanged < 0 && (
                  <>
                    <div className="w-24 flex items-center gap-1">
                      <span className="text-right text-xs text-danger">
                        +{item.percentChanged}%
                      </span>
                      <Image src={icArrowRed} />
                    </div>
                    <span className="w-16 text-danger text-bold text-sm mr-10">
                      {item.priceChanged}
                    </span>
                  </>
                )}
                <Image src={icStarOutlined} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default ModalSearch;
