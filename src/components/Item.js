import React from 'react';
import { Link } from 'react-router-dom';

const Item = ({countries}) =>{

    
    return (
        <>
            <section className="grid">
                {countries.map((country) => {
                    const { numericCode, name, population, region, capital, flag } = country;
                    return (
                        <Link to={`/countries/${name}`} className="link-css"><article key={numericCode}>
                            <div>
                                <img src={flag} alt={name} />
                                <div className="details">
                                    <h3 className="country-name">{name}</h3>
                                    <h4>Population: <span>{population}</span></h4>
                                    <h4>Region: <span>{region}</span></h4>
                                    <h4>Capital: <span>{capital}</span></h4>
                                </div>
                            </div>
                        </article>
                        </Link>
                    )
                })
                }
            </section>
        </>
    )
}

export default Item