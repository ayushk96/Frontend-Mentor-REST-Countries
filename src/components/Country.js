/*import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './country.css';

const Country = () => {
    const [country, setCountry] = useState([]);
    const [loading, setLoading] = useState(true);

    const [bord, setBord] = useState([]);
    const { name } = useParams();

    useEffect(() => {
        //setLoading(true);
        const fetchCountryData = async () => {
            try {
                const res = await fetch(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`);
                const country = await res.json();
                setCountry(country);
                let bor = (country[0].borders);
                let url = 'https://restcountries.eu/rest/v2/alpha?codes=';
                if (bor != undefined && bor.length > 0) {
                    bor.forEach(element => {
                        url = url + element + ';';
                    });
                    url = url.slice(0, url.length - 1);
                }
                try {
                    const res = await fetch(url);
                    const bord = await res.json();
                    setBord(bord);
    
                } catch (err) {
                    return null;
                }
            } catch (err) {
                return null;
            }
        }

        fetchCountryData();
        window.scrollTo(0, 0);
        setLoading(false);
        
    }, [name]);

    let stateCheck = setInterval(() => {
        if (document.readyState === 'complete') {
            const butt = document.querySelector('.btn');
            const header = document.querySelector('.header');
            const borders = document.querySelectorAll('ul');
            console.log(borders);
            let val;
            if (borders.length > 0)
            {
                borders.forEach(e =>{
                    if((window.getComputedStyle(e, null).getPropertyValue('background-color')) == 'rgb(43, 57, 69)')
                        val = (window.getComputedStyle(e, null).getPropertyValue('background-color'));
                });
            }
            console.log(val);
            if ((window.getComputedStyle(header, null).getPropertyValue('background-color')) != 'rgb(43, 57, 69)' && val == 'rgb(43, 57, 69)') {
                let val2 = (window.getComputedStyle(butt, null).getPropertyValue('background-color'));
                if (butt && val2 === 'rgb(43, 57, 69)')
                    butt.classList.toggle('light-theme');
                if (borders) {
                    borders.forEach((border) => {
                        if( (window.getComputedStyle(border, null).getPropertyValue('background-color')) == 'rgb(43, 57, 69)')
                            border.classList.toggle('light-theme');
                    });
                }
            }
            
            clearInterval(stateCheck);
            
        }
            
    }, 100);
    
    return (
        <>
            {
                loading ?
                    <h2 className="not-found">Loading .. </h2> :
                    <section className="country">
                        <Link to={'/'} className="btn btn-light" ><i className="fas fa-arrow-left"></i><span >Back</span></Link>
                        {country.map((c) => {
                            const { numericCode, flag, name, nativeName, population, region, subregion, capital, topLevelDomain, currencies, languages, borders } = c;
                            return (
                                <article key={numericCode}>
                                    <div className="country-image">
                                        <img src={flag} alt={name} />
                                    </div>

                                    <div className="country-details">
                                        <div className="country-name">
                                            <h2 className="font-weight-bold">{name}</h2>
                                        </div>
                                        <div className="left-info font-weight-normal">
                                            <h5 className="font-weight-normal">Native Name: <span>{nativeName}</span></h5>
                                            <h5 className="font-weight-normal">Population: <span>{population}</span></h5>
                                            <h5 className="font-weight-normal">Region: <span>{region}</span></h5>
                                            <h5 className="font-weight-normal">Sub Region: <span>{subregion}</span></h5>
                                            <h5 className="font-weight-normal">Capital: <span>{capital}</span></h5>
                                        </div>
                                        <div className="side-info">
                                            <h5 className="font-weight-normal">Top Level Domain: <span>{topLevelDomain}</span></h5>
                                            <h5 className="font-weight-normal">Currencies: <span>{currencies[0].name}</span></h5>
                                            <h5 className="font-weight-normal">languages: <span>{languages[0].name}</span></h5>
                                        </div>
                                        <div className="border-info">
                                            <h3>Border Countries: </h3>
                                            {/*<Border bo={borders} />*}


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
                                        </div>
                                    </div>
                                </article>
                            )
                        })}

                    </section>
            }

        </>
    )
}

export default Country;*/

import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import './country.css';

class Country extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            coun_det: [],
            name: '',
            bord: [],
        };
    }

    performApi = async () => {

        this.setState({
            loading: true,
        });

        try {
            const res = await fetch(`https://restcountries.eu/rest/v2/name/${this.state.name}?fullText=true`);
            const res_coun = await res.json();
            return res_coun;
        } catch (err) {
            return null;
        }
    }

    performApi2 = async () => {
        let url = 'https://restcountries.eu/rest/v2/alpha?codes=';
        let bor;
        bor = this.state.coun_det[0].borders;
        if (bor != undefined && bor.length > 0) {
            bor.forEach(element => {
                url = url + element + ';';
            });
            url = url.slice(0, url.length - 1);
        }
        try {
            const res = await fetch(url);
            const bord = await res.json();
            return bord;

        } catch (err) {
            return null;
        }
    }

    getCountry = async () => {
        let res = await this.performApi();
        this.setState({
            coun_det: [...res],
        });
    }

    getBorder = async () => {
        let res = await this.performApi2();
        if (res.length > 0) {
            this.setState({
                bord: [...res],
            });
        }
        this.setState({
            loading: false,
        });
    }

    setName = () => {
        this.setState({
            name: this.props.match.params.name,
        })
    }

    componentDidMount = async () => {
        

        

        await this.setName();
        await this.getCountry();
        this.getBorder();
        window.scrollTo(0, 0);

        

        
    }

    componentDidUpdate = async (prevProps) => {
        
        if (this.props.match.params.name != prevProps.match.params.name) {
        

            await this.setName();
            await this.getCountry();
            this.getBorder();
            window.scrollTo(0, 0);

            
        }

        const butt = document.querySelector('.btx');
        const header = document.querySelector('.header');
        const borders = document.querySelectorAll('ul');
        let val;
        if (borders.length > 0) {
            borders.forEach(e => {
                if ((window.getComputedStyle(e, null).getPropertyValue('background-color')) == 'rgb(43, 57, 69)')
                    val = (window.getComputedStyle(e, null).getPropertyValue('background-color'));
            });
        }
        if ((window.getComputedStyle(header, null).getPropertyValue('background-color')) != 'rgb(43, 57, 69)' && val == 'rgb(43, 57, 69)') {
            let val2 = (window.getComputedStyle(butt, null).getPropertyValue('background-color'));
            if (butt && val2 === 'rgb(43, 57, 69)')
                butt.classList.toggle('light-theme');
            if (borders) {
                borders.forEach((border) => {
                    if ((window.getComputedStyle(border, null).getPropertyValue('background-color')) == 'rgb(43, 57, 69)')
                        border.classList.toggle('light-theme');
                });
            }
        }
    }

    render() {
        return (
            <>
                {
                    this.state.loading ?
                        <h2 className="not-found">Loading .. </h2> :
                        <section className="country">
                            <Link to={'/'} className="btx" ><i className="fas fa-arrow-left"></i><span >Back</span></Link>
                            {this.state.coun_det.map((c) => {
                                const { numericCode, flag, name, nativeName, population, region, subregion, capital, topLevelDomain, currencies, languages, borders } = c;
                                return (
                                    <article key={numericCode}>
                                        <div className="country-image">
                                            <img src={flag} alt={name} />
                                        </div>

                                        <div className="country-details">
                                            <div className="country-name">
                                                <h2 className="font-weight-bold">{name}</h2>
                                            </div>
                                            <div className="left-info font-weight-normal">
                                                <h5 className="font-weight-normal">Native Name: <span>{nativeName}</span></h5>
                                                <h5 className="font-weight-normal">Population: <span>{population}</span></h5>
                                                <h5 className="font-weight-normal">Region: <span>{region}</span></h5>
                                                <h5 className="font-weight-normal">Sub Region: <span>{subregion}</span></h5>
                                                <h5 className="font-weight-normal">Capital: <span>{capital}</span></h5>
                                            </div>
                                            <div className="side-info">
                                                <h5 className="font-weight-normal">Top Level Domain: <span>{topLevelDomain}</span></h5>
                                                <h5 className="font-weight-normal">Currencies: <span>{currencies[0].name}</span></h5>
                                                <h5 className="font-weight-normal">languages: <span>{languages[0].name}</span></h5>
                                            </div>
                                            <div className="border-info">
                                                <h3>Border Countries: </h3>
                                                {/*<Border bo={borders} />*/}


                                                <div className="borders">
                                                    {(this.state.bord.length > 0) ? (this.state.bord.map((border) => {
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
                                            </div>
                                        </div>
                                    </article>
                                )
                            })}

                        </section>
                }

            </>
        )
    }
}

export default withRouter(Country);