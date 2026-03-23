import React from 'react';

function Header({ cartCount }) {
    return (
        <div className="flex justify-between items-center bg-gray-200 px-24 py-4">


            <div className="flex gap-4">
                <a className="hover:text-indigo-600  font-dmSans" href="#">SHOP</a>
                <a className="hover:text-indigo-600 font-dmSans" href="#">LOOKBOOK</a>
                <a className="hover:text-indigo-600 font-dmSans" href="#">ABOUT</a>

            </div>

            <div>
                <h2 className="text-2xl font-bold font-playfair ">Essentials</h2>
            </div>

            <div className="flex gap-4">
                <a className="hover:text-indigo-600" href="#">
                    Cart {cartCount > 0 && `(${cartCount})`}
                </a>
                <a className="hover:text-indigo-600" href="#">Login</a>
                <a className="hover:text-indigo-600" href="#">Register</a>
            </div>
        </div>
    );
}

export default Header;