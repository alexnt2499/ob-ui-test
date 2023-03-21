import Image from 'next/image';
import icBuy from 'src/assets/imgs/ic-buy.svg';
import icSell from 'src/assets/imgs/ic-sell.svg';
import { ORDER_BOOK } from '@/api/fakeData';
import { Trend } from '@/api/models';
import OrderItem from './OrderItem';

export default function OrderBook() {
  const { sellData, buyData, currentAverage, currentTrend } = ORDER_BOOK;
  return (
    <>
      <div>
        <div className="flex justify-between mb-4">
          <span className="caption">Sell ({sellData.tokenSell})</span>
          <span className="caption">Price ({sellData.tokenBuy})</span>
        </div>
        {sellData.sellBook.map((item, i) => (
          <OrderItem
            type="SELL"
            item={item}
            key={`${item}-${i}`}
            id={`sell-${i}`}
          />
        ))}
      </div>
      {currentTrend === Trend.DOWN && (
        <div className="my-4 flex items-center">
          <span className="text-lg font-bold text-danger mr-2">
            {currentAverage.value}
          </span>
          <Image src={icSell} className="rotate-90" />
        </div>
      )}
      {currentTrend === Trend.UP && (
        <div className="my-4 flex items-center">
          <span className="text-lg font-bold text-success mr-2">
            {currentAverage.value}
          </span>
          <Image src={icBuy} />
        </div>
      )}

      <div>
        <div className="flex justify-between mb-4">
          <span className="caption">Buy ({buyData.tokenBuy})</span>
          <span className="caption">Price ({buyData.tokenSell})</span>
        </div>
        {buyData.buyBook.map((item, i) => (
          <OrderItem
            type="BUY"
            item={item}
            key={`${item}-${i}`}
            id={`buy-${i}`}
          />
        ))}
      </div>
    </>
  );
}
