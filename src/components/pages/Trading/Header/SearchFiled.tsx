import { SearchNormal2 } from '@/assets';
import { modalSearchState } from '@/recoil/states/modalSearchState';
import Image from 'next/image';
import React from 'react';
import { useSetRecoilState } from 'recoil';

const SearchFiled = () => {
  const setIsShow = useSetRecoilState(modalSearchState);

  return (
    <div
      onClick={() => setIsShow(true)}
      className="flex cursor-pointer items-center rounded-xl bg-white px-6 py-[10px] transition-all duration-200 hover:border-[1px] hover:border-iris"
    >
      <Image src={SearchNormal2} />
      <p className="font ml-3 mr-12 pt-1 text-center text-sm font-light text-disabled">
        Search token...
      </p>
      <div className="rounded-md bg-blackDefault py-0 px-2 text-sm font-bold text-white">
        <p className="pt-1">F</p>
      </div>
    </div>
  );
};

export default SearchFiled;
