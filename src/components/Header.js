import React from 'react';

const Header = () => {


    function changeTheme() {
        const sel = document.querySelector('.fa-moon');
        const header = document.querySelector('.header');
        const input = document.querySelector('#search');
        const select = document.querySelector('.select');
        const details = document.querySelectorAll('.details');
        const borders = document.querySelectorAll('ul');
        const butt = document.querySelector('.btn');

        document.body.classList.toggle('light-theme');
        header.classList.toggle('light-theme');
        if (input)
            input.classList.toggle('light-theme');
        if (select)
            select.classList.toggle('light-theme');
        if (details) {
            details.forEach((detail) => {
                detail.classList.toggle('light-theme');
            });
        }
        if (borders) {
            borders.forEach((border) => {
                border.classList.toggle('light-theme');
            });
        }
        if(butt)
            butt.classList.toggle('light-theme');
    }

    return (
        <>
            <header className="header">
                <div>
                    <h1>
                        Where in the world?
                    </h1>
                </div>
                <div>
                    <i className='fas fa-moon' onClick={(() => changeTheme())}></i><span className="moon">Dark Mode</span>
                </div>
            </header>
        </>
    )
}


export default Header;