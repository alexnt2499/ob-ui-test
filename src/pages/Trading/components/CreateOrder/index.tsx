import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import icArrow1 from 'src/assets/imgs/ic-arrow-1.svg';
import icArrow2 from 'src/assets/imgs/ic-arrow-2.svg';
import icArrow3 from 'src/assets/imgs/ic-arrow-3.svg';
import Icon from '@/components/Icon';
import icArrowDown from 'src/assets/imgs/ic-arrow-down.svg';
import swapDeco from 'src/assets/imgs/swap-deco.svg';
import quick25 from 'src/assets/imgs/quick-25.svg';
import quick25_2 from 'src/assets/imgs/quick-25-2.svg';
import quick25_3 from 'src/assets/imgs/quick-25-3.svg';
import quick50 from 'src/assets/imgs/quick-50.svg';
import quick50_2 from 'src/assets/imgs/quick-50-2.svg';
import Collapsible from '@/components/Collapsible';
import classnames from 'classnames';
import { USD_FEE_ESTIMATED } from '@/api/fakeData';
import ModalSearch from '../ModalSearch';
import { useRecoilState, useRecoilValue } from 'recoil';
import { limitOrderValue, userWalletBalance } from '@/recoil/store';

export default function CreateOrder() {
  const [modalSearchShow, setModalSearchShow] = useState<boolean>(false);
  const [limitOrder, setLimitOrder] = useRecoilState(limitOrderValue);
  const walletBalance = useRecoilValue(userWalletBalance);
  const [tabOpenning, setTabOpenning] = useState<'SELL' | 'BUY'>('BUY');
  const [inputSpend, setInputSpend] = useState<number>(0);
  const [coinUnitCalculated, setCoinUnitCalculated] = useState<string[]>([]);

  function getBalanceByToken(token: string) {
    const balance = walletBalance.find(i => i.token === token);
    return balance?.value || 0;
  }

  function handleTabOpenning() {
    setTabOpenning(tabOpenning === 'SELL' ? 'BUY' : 'SELL');
    setLimitOrder(limitOrder);
  }

  function getMainTokenHandling() {
    const state = limitOrder.action;
    if (state === 'BUY') return limitOrder.buy;
    return limitOrder.sell;
  }

  function handleQuickSetInputSpend(percent: number) {
    setInputSpend((getBalanceByToken(limitOrder.sell.token) * percent) / 100);
  }

  function handleSwitchCoinUnitCalculated() {
    setCoinUnitCalculated(prev => [prev[1], prev[0]]);
  }

  useEffect(() => {
    const state = limitOrder.action;
    if (state === 'BUY') {
      setCoinUnitCalculated([limitOrder.buy.token, limitOrder.sell.token]);
    } else setCoinUnitCalculated([limitOrder.sell.token, limitOrder.buy.token]);
  }, [limitOrder]);

  return (
    <>
      <div className="card bg-[#FDFDFF]/60 w-full">
        <ul className="flex flex-wrap text-sm font-medium font-bold uppercase text-center gap-6">
          <li>
            <a href="#" className="inline-block active" aria-current="page">
              Limit Order
            </a>
          </li>
          <li>
            <a
              href="#"
              className="inline-block text-gray-400 cursor-not-allowed"
            >
              Long
            </a>
          </li>
          <li>
            <a
              href="#"
              className="inline-block text-gray-400 cursor-not-allowed"
            >
              Short
            </a>
          </li>
        </ul>
        <div>
          <ul className="bg-blackBg rounded-md w-full flex uppercase p-1 text-sm gap-1 mt-7">
            <li className="w-1/2" onClick={handleTabOpenning}>
              <a
                href="#"
                className={classnames(
                  'inline-block active h-8 rounded-md w-full flex justify-center items-center font-bold ease-in-out duration-300',
                  tabOpenning === 'BUY' ? 'bg-success text-white' : null
                )}
                aria-current="page"
              >
                Buy {getMainTokenHandling().token}
              </a>
            </li>

            <li className="w-1/2" onClick={handleTabOpenning}>
              <a
                href="#"
                className={classnames(
                  'inline-block h-8 rounded-md w-full flex justify-center items-center font-bold ease-in-out duration-300',
                  tabOpenning === 'SELL' ? 'bg-danger text-white' : null
                )}
              >
                SELL {getMainTokenHandling().token}
              </a>
            </li>
          </ul>

          <span className="block text-xs text-disabled my-4">
            <span className="capitalize">
              {limitOrder.action.toLowerCase()}
            </span>
            &nbsp;{getMainTokenHandling().token} when
          </span>
          <div className="flex items-center">
            <span className="text-lg flex-auto">
              1 {coinUnitCalculated[0]} =
            </span>
            <div className="relative w-48">
              <div
                className="absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer"
                onClick={handleSwitchCoinUnitCalculated}
              >
                <Icon
                  defaultSrc={icArrow1}
                  hoverSrc={icArrow2}
                  focusSrc={icArrow3}
                  className="cursor-pointer hover:-rotate-180 easy-in-out duration-500"
                />
              </div>
              <input
                type="number"
                id="input-group-1"
                className="text-lg text-right px-12 p-2.5 h-10"
                placeholder="0.0"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-[#A5A6F6] text-xs">
                  {coinUnitCalculated[1]}
                </span>
              </div>
            </div>
          </div>

          <div className="card mt-8 -mx-6 -mb-6">
            <div className="flex gap-5">
              <div>
                <span className="block text-xs text-disabled mb-4">Spend</span>
                <div
                  className="flex items-center rounded-lg px-2 py-1 w-28 hover:bg-blackBg focus:blueBg cursor-pointer"
                  onClick={() => setModalSearchShow(true)}
                >
                  {limitOrder.sell.image && (
                    <Image src={limitOrder.sell.image} width={20} height={20} />
                  )}
                  <span className="text-lg font-bold ml-2 flex-1">
                    {limitOrder.sell.token}
                  </span>
                  <Image src={icArrowDown} />
                </div>
              </div>
              <input
                type="number"
                id="input-group-1"
                value={inputSpend}
                onChange={e => setInputSpend(e.target.valueAsNumber)}
                className="flex-auto w-24 text-2xl text-right p-2.5 h-16"
                placeholder="0.0"
              />
            </div>
            <span className="block text-right text-disabled mt-2">
              Balance:{' '}
              <span className="text-blackDefault">
                {getBalanceByToken(limitOrder.sell.token)}
              </span>
            </span>

            <div className="relative flex justify-center mb-6 mt-8">
              <Image
                src={swapDeco}
                className="z-10 cursor-pointer"
                onClick={handleTabOpenning}
              />
              <div className="absolute flex w-full -top-[36%] left-0 gap-1 items-end z-10">
                <div
                  className="group relative cursor-pointer"
                  onClick={() => handleQuickSetInputSpend(25)}
                >
                  <Icon
                    defaultSrc={quick25}
                    hoverSrc={quick25_2}
                    focusSrc={quick25_3}
                  />
                  <span className="opacity-0 bottom-0 duration-500 ease-in-out group-hover:ease-in-out group-hover:opacity-100 group-hover:bottom-3 z-10 absolute left-6 text-[#7879F1]">
                    25%
                  </span>
                </div>
                <div
                  className="group relative cursor-pointer"
                  onClick={() => handleQuickSetInputSpend(50)}
                >
                  <Icon
                    defaultSrc={quick50}
                    hoverSrc={quick50_2}
                    focusSrc={quick50_2}
                  />
                  <span className="opacity-0 bottom-0 duration-500 group-hover:ease-in-out group-hover:opacity-100 group-hover:bottom-3 z-10 absolute left-6 text-[#7879F1]">
                    50%
                  </span>
                </div>
                <div
                  className="group relative cursor-pointer"
                  onClick={() => handleQuickSetInputSpend(75)}
                >
                  <Icon
                    defaultSrc={quick50}
                    hoverSrc={quick50_2}
                    focusSrc={quick50_2}
                    className="transform -scale-x-100"
                  />
                  <span className="opacity-0 bottom-0 duration-500 group-hover:ease-in-out group-hover:opacity-100 group-hover:bottom-3 z-10 absolute left-6 text-[#7879F1]">
                    75%
                  </span>
                </div>
                <div
                  className="group relative"
                  onClick={() => handleQuickSetInputSpend(100)}
                >
                  <Icon
                    defaultSrc={quick25}
                    hoverSrc={quick25_2}
                    focusSrc={quick25_3}
                  />
                  <span className="opacity-0 bottom-0 duration-500 group-hover:ease-in-out group-hover:opacity-100 group-hover:bottom-3 z-10 absolute left-6 text-[#7879F1]">
                    100%
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="ease-in-out duration-300">
                <span className="block text-xs text-disabled mb-4">Buy</span>
                <div
                  className="flex items-center rounded-lg px-2 py-1 w-28 hover:bg-blackBg focus:blueBg cursor-pointer"
                  onClick={() => setModalSearchShow(true)}
                >
                  {limitOrder.buy.image && (
                    <Image src={limitOrder.buy.image} width={20} height={20} />
                  )}
                  <span className="text-lg font-bold ml-2 flex-1">
                    {limitOrder.buy.token}
                  </span>
                  <Image src={icArrowDown} />
                </div>
              </div>
              <input
                type="number"
                id="input-group-1"
                className="flex-auto w-24 text-2xl text-right p-2.5 h-16"
                placeholder="0.0"
              />
            </div>
            <span className="block text-right text-disabled mt-2 text-xs">
              ~ $25.215
            </span>

            <button
              className={classnames(
                'btn-big w-full mt-4 mb-3 uppercase font-bold',
                tabOpenning === 'BUY' ? 'btn-success' : 'btn-danger'
              )}
            >
              {limitOrder.action} {getMainTokenHandling().token}
            </button>
          </div>
        </div>
      </div>

      {modalSearchShow && (
        <ModalSearch onClose={() => setModalSearchShow(false)} />
      )}

      <div className="card mt-4">
        <Collapsible
          title={
            <div className="flex gap-3 items-center">
              <span className="text-lg">Fee Estimated</span>
              <Image src={icArrowDown} />
              <span className="flex-auto text-right text-disabled text-xs">{`~ $${USD_FEE_ESTIMATED.total}`}</span>
            </div>
          }
          content={
            <div>
              <div className="flex justify-between">
                <span>Platform Fee</span>
                <span className="text-disabled text-xs">{`$${USD_FEE_ESTIMATED.platformFee}`}</span>
              </div>
              <div className="flex justify-between mt-4">
                <span>Network Gas Fee</span>
                <span className="text-disabled text-xs">{`~ $${USD_FEE_ESTIMATED.gasFee}`}</span>
              </div>
            </div>
          }
        />
      </div>
    </>
  );
}
