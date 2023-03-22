import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Icon from '@/components/Icon';
import Collapsible from '@/components/Collapsible';
import classnames from 'classnames';
import { USD_FEE_ESTIMATED } from '@/api/fakeData';
import ModalSearch from '../ModalSearch';
import { useRecoilState, useRecoilValue } from 'recoil';
import { limitOrderValue, userWalletBalance } from '@/recoil/store';
import {
  Arrow1Icon,
  Arrow2Icon,
  Arrow3Icon,
  ArrowDownIcon,
  Quick25,
  Quick25n2,
  Quick25n3,
  SwapDeco,
} from '@/assets';

export default function CreateOrder() {
  const [modalSearchShow, setModalSearchShow] = useState<boolean>(false);
  const [limitOrder, setLimitOrder] = useRecoilState(limitOrderValue);
  const walletBalance = useRecoilValue(userWalletBalance);
  const [tabOpening, setTabOpening] = useState<'SELL' | 'BUY'>('BUY');
  const [inputSpend, setInputSpend] = useState<number>(0);
  const [coinUnitCalculated, setCoinUnitCalculated] = useState<string[]>([]);

  function getBalanceByToken(token: string) {
    const balance = walletBalance.find(i => i.token === token);
    return balance?.value || 0;
  }

  function handleTabOpening() {
    setTabOpening(tabOpening === 'SELL' ? 'BUY' : 'SELL');
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
      <div className="card w-full bg-[#FDFDFF]/60">
        <ul className="flex flex-wrap gap-6 text-center text-sm font-bold uppercase">
          <li>
            <a href="#" className="active inline-block" aria-current="page">
              Limit Order
            </a>
          </li>
          <li>
            <a
              href="#"
              className="inline-block cursor-not-allowed text-gray-400"
            >
              Long
            </a>
          </li>
          <li>
            <a
              href="#"
              className="inline-block cursor-not-allowed text-gray-400"
            >
              Short
            </a>
          </li>
        </ul>
        <div>
          <ul className="mt-7 flex w-full gap-1 rounded-md bg-blackBg p-1 text-sm uppercase">
            <li className="w-1/2" onClick={handleTabOpening}>
              <a
                href="#"
                className={classnames(
                  'active flex h-8 w-full items-center justify-center rounded-md font-bold duration-300 ease-in-out',
                  tabOpening === 'BUY' ? 'bg-success text-white' : null
                )}
                aria-current="page"
              >
                Buy {getMainTokenHandling().token}
              </a>
            </li>

            <li className="w-1/2" onClick={handleTabOpening}>
              <a
                href="#"
                className={classnames(
                  'flex h-8 w-full items-center justify-center rounded-md font-bold duration-300 ease-in-out',
                  tabOpening === 'SELL' ? 'bg-danger text-white' : null
                )}
              >
                SELL {getMainTokenHandling().token}
              </a>
            </li>
          </ul>

          <span className="my-4 block text-xs text-disabled">
            <span className="capitalize">
              {limitOrder.action.toLowerCase()}
            </span>
            &nbsp;{getMainTokenHandling().token} when
          </span>
          <div className="flex items-center">
            <span className="flex-auto text-lg">
              1 {coinUnitCalculated[0]} =
            </span>
            <div className="relative w-48">
              <div
                className="absolute inset-y-0 left-0 flex cursor-pointer items-center pl-3"
                onClick={handleSwitchCoinUnitCalculated}
              >
                <Icon
                  defaultSrc={Arrow1Icon}
                  hoverSrc={Arrow2Icon}
                  focusSrc={Arrow3Icon}
                  className="easy-in-out cursor-pointer duration-500 hover:-rotate-180"
                />
              </div>
              <input
                type="number"
                id="input-group-1"
                className="h-10 p-2.5 px-12 text-right text-lg"
                placeholder="0.0"
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-xs text-[#A5A6F6]">
                  {coinUnitCalculated[1]}
                </span>
              </div>
            </div>
          </div>

          <div className="card -mx-6 mt-8 -mb-6">
            <div className="flex gap-5">
              <div>
                <span className="mb-4 block text-xs text-disabled">Spend</span>
                <div
                  className="focus:blueBg flex w-28 cursor-pointer items-center rounded-lg px-2 py-1 hover:bg-blackBg"
                  onClick={() => setModalSearchShow(true)}
                >
                  {limitOrder.sell.image && (
                    <Image src={limitOrder.sell.image} width={20} height={20} />
                  )}
                  <span className="ml-2 flex-1 text-lg font-bold">
                    {limitOrder.sell.token}
                  </span>
                  <Image src={ArrowDownIcon} />
                </div>
              </div>
              <input
                type="number"
                id="input-group-1"
                value={inputSpend}
                onChange={e => setInputSpend(e.target.valueAsNumber)}
                className="h-16 w-24 flex-auto p-2.5 text-right text-2xl"
                placeholder="0.0"
              />
            </div>
            <span className="mt-2 block text-right text-disabled">
              Balance:{' '}
              <span className="text-blackDefault">
                {getBalanceByToken(limitOrder.sell.token)}
              </span>
            </span>

            <div className="relative mb-6 mt-8 flex justify-center">
              <Image
                src={SwapDeco}
                className="z-10 cursor-pointer"
                onClick={handleTabOpening}
              />
              <div className="absolute -top-[36%] left-0 z-10 flex w-full items-end gap-1">
                <div
                  className="group relative cursor-pointer"
                  onClick={() => handleQuickSetInputSpend(25)}
                >
                  <Icon
                    defaultSrc={Quick25}
                    hoverSrc={Quick25n2}
                    focusSrc={Quick25n3}
                  />
                  <span className="absolute bottom-0 left-6 z-10 text-[#7879F1] opacity-0 duration-500 ease-in-out group-hover:bottom-3 group-hover:opacity-100 group-hover:ease-in-out">
                    25%
                  </span>
                </div>
                <div
                  className="group relative cursor-pointer"
                  onClick={() => handleQuickSetInputSpend(50)}
                >
                  <Icon
                    defaultSrc={Quick25}
                    hoverSrc={Quick25n2}
                    focusSrc={Quick25n3}
                  />
                  <span className="absolute bottom-0 left-6 z-10 text-[#7879F1] opacity-0 duration-500 group-hover:bottom-3 group-hover:opacity-100 group-hover:ease-in-out">
                    50%
                  </span>
                </div>
                <div
                  className="group relative cursor-pointer"
                  onClick={() => handleQuickSetInputSpend(75)}
                >
                  <Icon
                    defaultSrc={Quick25}
                    hoverSrc={Quick25n2}
                    focusSrc={Quick25n3}
                    className="-scale-x-100 transform"
                  />
                  <span className="absolute bottom-0 left-6 z-10 text-[#7879F1] opacity-0 duration-500 group-hover:bottom-3 group-hover:opacity-100 group-hover:ease-in-out">
                    75%
                  </span>
                </div>
                <div
                  className="group relative"
                  onClick={() => handleQuickSetInputSpend(100)}
                >
                  <Icon
                    defaultSrc={Quick25}
                    hoverSrc={Quick25n2}
                    focusSrc={Quick25n3}
                  />
                  <span className="absolute bottom-0 left-6 z-10 text-[#7879F1] opacity-0 duration-500 group-hover:bottom-3 group-hover:opacity-100 group-hover:ease-in-out">
                    100%
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="duration-300 ease-in-out">
                <span className="mb-4 block text-xs text-disabled">Buy</span>
                <div
                  className="focus:blueBg flex w-28 cursor-pointer items-center rounded-lg px-2 py-1 hover:bg-blackBg"
                  onClick={() => setModalSearchShow(true)}
                >
                  {limitOrder.buy.image && (
                    <Image src={limitOrder.buy.image} width={20} height={20} />
                  )}
                  <span className="ml-2 flex-1 text-lg font-bold">
                    {limitOrder.buy.token}
                  </span>
                  <Image src={ArrowDownIcon} />
                </div>
              </div>
              <input
                type="number"
                id="input-group-1"
                className="h-16 w-24 flex-auto p-2.5 text-right text-2xl"
                placeholder="0.0"
              />
            </div>
            <span className="mt-2 block text-right text-xs text-disabled">
              ~ $25.215
            </span>

            <button
              className={classnames(
                'btn-big mt-4 mb-3 w-full font-bold uppercase',
                tabOpening === 'BUY' ? 'btn-success' : 'btn-danger'
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
            <div className="flex items-center gap-3">
              <span className="text-lg">Fee Estimated</span>
              <Image src={ArrowDownIcon} />
              <span className="flex-auto text-right text-xs text-disabled">{`~ $${USD_FEE_ESTIMATED.total}`}</span>
            </div>
          }
          content={
            <div>
              <div className="flex justify-between">
                <span>Platform Fee</span>
                <span className="text-xs text-disabled">{`$${USD_FEE_ESTIMATED.platformFee}`}</span>
              </div>
              <div className="mt-4 flex justify-between">
                <span>Network Gas Fee</span>
                <span className="text-xs text-disabled">{`~ $${USD_FEE_ESTIMATED.gasFee}`}</span>
              </div>
            </div>
          }
        />
      </div>
    </>
  );
}