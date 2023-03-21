import Image from 'next/image';
import logo from 'src/assets/imgs/logo.png';
import icTradeBlack from 'src/assets/imgs/ic_trade_black.svg';
import icTradeRed from 'src/assets/imgs/ic_trade_red.svg';

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex bg-[#F1F1FF]">
      <div className="flex-none rounded-r-lg w-16 p-2 pt-5 bg-white flex flex-col align-center">
        <Image src={logo} placeholder="blur" />
        <ul className="space-y-2 mt-8">
          <li className="aside-menu-item active">
            <Image src={icTradeRed} />
            <span className="item-name">Trade</span>
          </li>
          <li className="aside-menu-item">
            <Image src={icTradeBlack} />
            <span className="item-name">Pool</span>
          </li>
          <li className="aside-menu-item">
            <Image src={icTradeBlack} />
            <span className="item-name">Farm</span>
          </li>
          <li className="aside-menu-item">
            <Image src={icTradeBlack} />
            <span className="item-name">Governance</span>
          </li>
          <li className="aside-menu-item">
            <Image src={icTradeBlack} />
            <span className="item-name">Analytics</span>
          </li>
        </ul>
        {/* <ul className="space-y-2">
          <li>
            <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
              <span className="ml-3">Dashboard</span>
            </a>
          </li>
        </ul> */}
      </div>
      {/* </aside> */}
      <div className="flex-1 p-6 pt-0">{children}</div>
    </div>
  );
}
