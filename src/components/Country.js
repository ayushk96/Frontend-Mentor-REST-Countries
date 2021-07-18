import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './country.css';

const Country = () => {
    const [country, setCountry] = useState([]);
    const { name } = useParams();

    useEffect(() => {
        const fetchCountryData = async () => {

            try {
                const res = await fetch(`https://restcountries.eu/rest/v2/name/${name}`);
                const country = await res.json();
                setCountry(country);
                console.log(country);
            } catch (err) {
                return null;
            }
        }


        fetchCountryData();

    }, []);

    let stateCheck = setInterval(() => {
        if (document.readyState === 'complete') {
            const butt = document.querySelector('.btn');
            const header = document.querySelector('.header');
            const borders = document.querySelectorAll('ul');
            let val;
            if(borders.length>0)
                val = (window.getComputedStyle(borders[0], null).getPropertyValue('background-color'));
            if ((window.getComputedStyle(header, null).getPropertyValue('background-color')) != 'rgb(43, 57, 69)' && val == 'rgb(43, 57, 69)') {
                if(butt)
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
            <section className="country">
                <Link to={'/'} className="btn btn-light" ><i className="fas fa-arrow-left"></i><span className="btn-info">Back</span></Link>
                {country.map((c) => {
                    const { numericCode, flag, name, nativeName, population, region, subregion, capital, topLevelDomain, currencies, languages, borders } = c;
                    return (
                        <article key={numericCode}>
                            <div className="country-image">
                                <img src={flag} alt={name} />
                            </div>

                            <div className="country-details">
                                <div className="country-name">
                                    <h2>{name}</h2>
                                </div>
                                <div className="left-info">
                                    <h5>Native Name: <span>{nativeName}</span></h5>
                                    <h5>Population: <span>{population}</span></h5>
                                    <h5>Region: <span>{region}</span></h5>
                                    <h5>Sub Region: <span>{subregion}</span></h5>
                                    <h5>Capital: <span>{capital}</span></h5>
                                </div>
                                <div className="side-info">
                                    <h5>Top Level Domain: <span>{topLevelDomain}</span></h5>
                                    <h5>Currencies: <span>{currencies[0].name}</span></h5>
                                    <h5>languages: <span>{languages[0].name}</span></h5>
                                </div>
                                <div className="border-info">
                                    <h3>Border Countries: </h3>
                                    <div className="borders">
                                        {borders.map((border) => {
                                            return (
                                                <ul key={border}>
                                                    <li>{border}</li>
                                                </ul>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </article>
                    )
                })}

            </section>
        </>
    )
}

export default Country;