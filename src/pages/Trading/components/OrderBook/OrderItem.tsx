import { OrderBookItem } from '@/api/models';
import icSell from 'src/assets/imgs/ic-sell.svg';
import icBuy from 'src/assets/imgs/ic-buy.svg';
import Image from 'next/image';
import { Tooltip } from 'react-tooltip';
import classnames from 'classnames';
import 'react-tooltip/dist/react-tooltip.css';

type OrderItemProps = {
  type: 'SELL' | 'BUY';
  item: OrderBookItem;
  id: string;
};

const OrderItem: React.FC<OrderItemProps> = ({ type, item, id }) => {
  const isSell = type === 'SELL';

  return (
    item && (
      <>
        <div
          className="flex justify-between relative items-center px-1.5 py-0.5 group"
          id={id}
        >
          <span>{item.totalPrice.value}</span>
          <span
            className={classnames(
              'text-xs font-bold',
              isSell ? 'text-danger' : 'text-success'
            )}
          >
            {item.averagePrice.value}
          </span>
          <div
            className={classnames(
              'bg-[#FF005C0D] rounded-l h-full right-0 absolute',
              isSell ? 'bg-[#FF005C0D]' : 'bg-[#05C9A10D]'
            )}
            style={{ width: item.volumnCap * 2 }}
          ></div>
          <div className="absolute -left-4 hidden group-hover:block">
            <Image src={isSell ? icSell : icBuy} />
          </div>
        </div>

        <Tooltip
          anchorSelect={`#${id}`}
          className="z-10"
          place="left"
          variant="light"
          noArrow={true}
          style={{ padding: 0, borderRadius: '18px', opacity: 1 }}
        >
          <div className="card bg-white shadow-3xl text-blackDefault">
            <span className="text-sm font-bold">
              Click on price for quick importing
            </span>
            <hr className="mt-6 mb-4" />
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-disabled">
                  Average price ({item.averagePrice.token})
                </span>
                <span
                  className={classnames(
                    'text-xs font-bold',
                    isSell ? 'text-danger' : 'text-success'
                  )}
                >
                  {item.averagePrice.value}
                </span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-disabled">
                  Total {item.totalPrice.token}
                </span>
                <span className="text-xs">{item.totalPrice.value}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-disabled">
                  Total {item.totalAmount.token}
                </span>
                <span className="text-xs">{item.totalAmount.value}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-disabled">
                  Total value ({item.valueUSDC.token})
                </span>
                <span className="text-xs">${item.valueUSDC.value}</span>
              </div>
            </div>
          </div>
        </Tooltip>
      </>
    )
  );
};
export default OrderItem;
