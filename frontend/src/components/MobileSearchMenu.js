import React from "react";

const MobileSearchMenu = () => {
  return (
    <div className="mobile-menu">
      <form className="header__search">
        <label>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
          >
            <title>search</title>
            <path d="M32 30.586l-10.845-10.845c1.771-2.092 2.845-4.791 2.845-7.741 0-6.617-5.383-12-12-12s-12 5.383-12 12c0 6.617 5.383 12 12 12 2.949 0 5.649-1.074 7.741-2.845l10.845 10.845 1.414-1.414zM12 22c-5.514 0-10-4.486-10-10s4.486-10 10-10c5.514 0 10 4.486 10 10s-4.486 10-10 10z"></path>
          </svg>
          <input placeholder="Search for posts" />
        </label>
      </form>
      <div className="mobile-menuItems">
        <a className="btn btn--main btn--pill" href="#">
          Browse Topics
        </a>
        <a className="btn btn--main btn--pill" href="#">
          Recent Activities
        </a>
      </div>
    </div>
  );
};

export default MobileSearchMenu;
