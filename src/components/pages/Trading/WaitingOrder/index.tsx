import React, { useState } from 'react';
import Image from 'next/image';
import { WAITING_ORDER_LIST } from '@/api/fakeData';
import classnames from 'classnames';
import { OrderAction } from '@/api/models';
import ModalCancelOrder from './ModalCancelOrder';
import ModalMore from './ModalMore';
import ModalOrderType from './ModalOrderType';
import { ArrowDownIcon, CloseIcon, MoreIcon, SortIcon } from '@/assets';

export default function WaitingOrder() {
  const [modalCancelShow, setModalCancelShow] = useState<boolean>(false);
  const [modalMoreShow, setModalMoreShow] = useState<boolean>(false);
  const [modalOrderTypeShow, setModalOrderTypeShow] = useState<boolean>(false);

  return (
    <div>
      <div className="relative overflow-x-auto">
        <table className="w-full">
          <thead className="">
            <tr>
              <th scope="col">
                <div className="ml-0">
                  Time
                  <Image src={SortIcon} />
                </div>
              </th>
              <th scope="col">
                <div
                  onClick={() => {
                    setModalOrderTypeShow(true);
                  }}
                >
                  Order Type
                  <Image src={ArrowDownIcon} />
                </div>
              </th>
              <th scope="col">
                <div className="text-disabled">Action</div>
              </th>
              <th scope="col">
                <div className="text-disabled">Pair</div>
              </th>
              <th scope="col">
                <div>
                  Price
                  <Image src={SortIcon} />
                </div>
              </th>
              <th scope="col">
                <div>
                  Amount
                  <Image src={SortIcon} />
                </div>
              </th>
              <th scope="col">
                <div className="text-disabled">Total value (USDC)</div>
              </th>
              <th scope="col" className="w-9">
                <div
                  className="px-1"
                  onClick={() => {
                    setModalMoreShow(true);
                  }}
                >
                  <Image src={MoreIcon} />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {WAITING_ORDER_LIST.map((order, i) => (
              <tr key={i}>
                <td className="">
                  <span className="caption mb-1 block">00:00</span>
                  24/12/2022
                </td>
                <td className="px-1 py-2 align-bottom">{order.type}</td>
                <td
                  className={classnames(
                    'px-1 py-2 align-bottom font-bold',
                    order.action === OrderAction.BUY
                      ? 'text-success'
                      : 'text-danger'
                  )}
                >
                  {order.action}
                </td>
                <td className="px-1 py-2 align-bottom text-xs font-bold">
                  {order.pair}
                </td>
                <td className="px-1 py-2 text-right align-bottom text-xs">
                  {order.price.value}
                  <span className="caption ml-1">{order.price.token}</span>
                </td>
                <td className="px-1 py-2 text-right align-bottom text-xs">
                  {order.amount.value}
                  <span className="caption ml-1">{order.amount.token}</span>
                </td>
                <td className="px-1 py-2 text-right align-bottom text-xs">
                  {order.valueUSDC.value}
                  <span className="caption ml-1">{order.valueUSDC.token}</span>
                </td>
                <td
                  className="px-1 py-2 align-bottom"
                  onClick={() => {
                    setModalCancelShow(true);
                  }}
                >
                  <button className="btn-small m-auto block h-4 p-0">
                    <Image src={CloseIcon} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalCancelShow && (
        <ModalCancelOrder onClose={() => setModalCancelShow(false)} />
      )}

      {modalMoreShow && <ModalMore onClose={() => setModalMoreShow(false)} />}

      {modalOrderTypeShow && (
        <ModalOrderType onClose={() => setModalOrderTypeShow(false)} />
      )}
    </div>
  );
}
