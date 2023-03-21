import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import coinBNB from 'src/assets/imgs/coin-bnb.png';
import coinEGLD from 'src/assets/imgs/coin-egld.png';
import icArrow1 from 'src/assets/imgs/ic-arrow-1.svg';
import icArrow2 from 'src/assets/imgs/ic-arrow-2.svg';
import icArrow3 from 'src/assets/imgs/ic-arrow-3.svg';
import { StaticImageData } from 'next/image';
import ModalSearch from '../ModalSearch';
import { useRecoilValue } from 'recoil';
import { limitOrderState } from '@/recoil/store';
import Icon from '@/components/Icon';
import { AdvancedRealTimeChartProps } from 'react-ts-tradingview-widgets/dist/components/AdvancedRealTimeChart';

const AdvancedRealTimeChart = dynamic<AdvancedRealTimeChartProps>(
  () =>
    import('react-ts-tradingview-widgets').then(
      module => module.AdvancedRealTimeChart
    ),
  { ssr: false }
);

type PairToken = {
  mainToken: {
    token: string;
    image: StaticImageData;
  };
  comparedToken: {
    token: string;
    image: StaticImageData;
  };
};

const initPair = {
  mainToken: {
    token: 'EGLD',
    image: coinEGLD,
  },
  comparedToken: {
    token: 'BNB',
    image: coinBNB,
  },
};

export default function TradingView() {
  const [pairToken, setPairToken] = useState<PairToken>(initPair);
  const [modalSearchShow, setModalSearchShow] = useState<boolean>(false);
  const pairWatching = useRecoilValue(limitOrderState);

  function handleSwitchPair() {
    setPairToken(prevPair => ({
      mainToken: { ...prevPair.comparedToken },
      comparedToken: { ...prevPair.mainToken },
    }));
  }

  function getSymbolTrading() {
    return `CRYPTOCAP:${pairToken.mainToken.token}/CRYPTOCAP:${pairToken.comparedToken.token}`;
  }

  useEffect(() => {
    if (pairWatching.buy.image && pairWatching.sell.image) {
      setPairToken({
        mainToken: {
          token: pairWatching.sell.token,
          image: pairWatching.sell.image,
        },
        comparedToken: {
          token: pairWatching.buy.token,
          image: pairWatching.buy.image,
        },
      });
    }
  }, [pairWatching]);

  return (
    <div>
      <div className="flex items-center mb-6">
        <div
          className="flex items-center rounded-lg px-2 py-1 hover:bg-blackBg focus:blueBg cursor-pointer"
          onClick={() => setModalSearchShow(true)}
        >
          <Image src={pairToken.mainToken.image} width={20} height={20} />
          <Image src={pairToken.comparedToken.image} width={20} height={20} />
          <span className="text-lg font-bold mx-2">
            {pairToken.mainToken.token}/{pairToken.comparedToken.token}
          </span>
          <Icon
            defaultSrc={icArrow1}
            hoverSrc={icArrow2}
            focusSrc={icArrow3}
            className="cursor-pointer hover:-rotate-180 easy-in-out duration-500"
            onClick={e => {
              e.stopPropagation();
              handleSwitchPair();
            }}
          />
        </div>
        <div className="flex-auto" />
        <div className="flex flex-col items-end gap-1 mr-4 w-24">
          <span className="text-disabled">$55.32</span>
          <span className="text-danger font-bold text-xs">0.00023003</span>
        </div>
        <div className="flex flex-col items-end gap-1 mr-4 w-24">
          <span className="text-disabled">24h change</span>
          <span className="text-danger text-xs">-1.43%</span>
        </div>
        <div className="flex flex-col items-end gap-1 mr-4 w-16">
          <span className="text-disabled">24h High</span>
          <span className="text-xs">2.8</span>
        </div>
        <div className="flex flex-col items-end gap-1 w-16">
          <span className="text-disabled">24h Low</span>
          <span className="text-xs">1.2</span>
        </div>
      </div>
      <ul className="flex rounded overflow-hidden bg-blueBg w-min text-center text-xs mb-6">
        <li className="w-12 py-2 dark:bg-blackDefault dark:text-white dark rounded">
          5m
        </li>
        <li className="w-12 py-2">15m</li>
        <li className="w-12 py-2">1h</li>
        <li className="w-12 py-2">4h</li>
        <li className="w-12 py-2">1d</li>
        <li className="w-12 py-2">1w</li>
        <li className="w-12 py-2">1m</li>
      </ul>

      {pairToken && (
        <div className="h-[500px] pb-8">
          <AdvancedRealTimeChart
            symbol={getSymbolTrading()}
            theme="light"
            interval="5"
            style="7"
            hide_side_toolbar={true}
            hide_top_toolbar={true}
            hide_legend={true}
            autosize={true}
            withdateranges={false}
            disabled_features={['adaptive_logo']}
            container_id="tradingview_e6d2a"
          ></AdvancedRealTimeChart>
        </div>
      )}

      {modalSearchShow && (
        <ModalSearch onClose={() => setModalSearchShow(false)} />
      )}
    </div>
  );
}
