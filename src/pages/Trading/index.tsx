import { useState } from 'react';
import WaitingOrder from './components/WaitingOrder';
import OrderBook from './components/OrderBook';
import CreateOrder from './components/CreateOrder';
import TradingView from './components/TradingView';
import icCollapse1 from 'src/assets/imgs/arrow-circle-left.svg';
import icCollapse2 from 'src/assets/imgs/arrow-circle-left-2.svg';
import icCollapse3 from 'src/assets/imgs/arrow-circle-left-3.svg';
import classnames from 'classnames';
import Icon from '@/components/Icon';

export default function Trading() {
  const [isCollapsedOrderBook, setIsCollapsedOrderBook] =
    useState<boolean>(false);

  return (
    <div className="flex w-full">
      <div className="card flex-1 z-10 relative">
        <div className="w-full">
          <TradingView />
        </div>
        <div>
          <h3>Waiting Orders</h3>
          <WaitingOrder />
        </div>
        <div
          className="w-6 h-6 absolute -right-3 top-6 cursor-pointer"
          onClick={() => setIsCollapsedOrderBook(!isCollapsedOrderBook)}
        >
          <Icon
            defaultSrc={icCollapse3}
            hoverSrc={icCollapse2}
            focusSrc={icCollapse1}
          />
        </div>
      </div>
      <div
        className={classnames(
          'card bg-[#FDFDFF]/60 -ml-10 mr-6 flex flex-col pl-16 ease-in-out duration-700 relative',
          isCollapsedOrderBook ? 'w-12' : 'w-60'
        )}
      >
        <div
          className={classnames(
            isCollapsedOrderBook ? 'opacity-0' : 'opacity-100',
            'w-40 ease-in-out duration-700 absolute top-6 right-6'
          )}
        >
          <OrderBook />
        </div>
        <span
          className={classnames(
            'text-sm text-disabled font-bold rotate-90 ease-in-out duration-700 absolute top-12 -right-5',
            isCollapsedOrderBook ? 'opacity-100' : 'opacity-0'
          )}
        >
          Orderbook
        </span>
      </div>
      <div className="w-[360px]">
        <CreateOrder />
      </div>
    </div>
  );
}
