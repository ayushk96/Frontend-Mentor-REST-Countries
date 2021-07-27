import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Country from './Country';



const Border = ({ bo }) => {

    const [bord, setBord] = useState([]);

    useEffect(() => {
        let url = 'https://restcountries.eu/rest/v2/alpha?codes=';
        if (bo.length > 0) {
            bo.forEach(element => {
                url = url + element + ';';
            });
            url = url.slice(0, url.length - 1);
        }

        const fetchBorder = async () => {
            try {
                const res = await fetch(url);
                const bord = await res.json();
                setBord(bord);
                //console.log(bord);
            } catch (err) {
                return null;
            }
        }

        fetchBorder();
    }, []);

    let stateCheck = setInterval(() => {
        if (document.readyState === 'complete') {
            const butt = document.querySelector('.btn');
            const header = document.querySelector('.header');
            const borders = document.querySelectorAll('ul');
            console.log(borders);
            let val;
            if(borders.length>0)
                val = (window.getComputedStyle(borders[0], null).getPropertyValue('background-color'));
            console.log(val);
            if ((window.getComputedStyle(header, null).getPropertyValue('background-color')) != 'rgb(43, 57, 69)' && val == 'rgb(43, 57, 69)') {
                let val2 = (window.getComputedStyle(butt, null).getPropertyValue('background-color'));
                if(butt && val2 ==='rgb(43, 57, 69)')
                    butt.classList.toggle('light-theme');
                if (borders) {
                    borders.forEach((border) => {
                        border.classList.toggle('light-theme');
                    });
                }
            }
            
            clearInterval(stateCheck);
        }
    }, 100);

    return (
        <>
            <div className="borders">
                {(bord.length > 0) ? (bord.map((border) => {
                    return (
                        <Link to={`/countries/${border.name}`} className="link-css">
                            <ul key={border}>
                                <li>{border.name}</li>
                            </ul>
                        </Link>
                    )
                })) : 
                    <div className="notav">
                        <ul>
                            <li>{'NA'}</li>
                        </ul>
                    </div>}
            </div>
        </>
    )
}

export default Border