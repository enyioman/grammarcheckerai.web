import React from 'react';
import Headerimg from '../../assets/blogimg/Rectangle 4.svg';

const Header = () => {
  return (
    <header>
      <div className="mb-5 relative h-64 md:p-0 xl:mb-8">
        <img src={Headerimg} alt="" className="w-full h-64 object-cover" />

        <p className="text-white absolute mx-auto text-center inset-0 w-48 font-bold pb-3 pt-8 leading-10 my-5 text-xl xl:text-4xl xl:w-2/5 xl:my-8">
          The World&apos;s Most <span className="text-span ">Dangerous Technology</span> Ever Made.
        </p>
      </div>
    </header>
  );
};

export default Header;
