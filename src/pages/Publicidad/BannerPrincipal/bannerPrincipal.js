import React, { Fragment, useEffect, useState } from 'react'
import { makeStyles} from '@material-ui/core';
import './banner.scss';
import BannerAnim, { Element } from 'rc-banner-anim';
import 'rc-banner-anim/assets/index.css';
import clienteAxios from '../../../config/axios';
import { Link } from 'react-router-dom';
const BgElement = Element.BgElement;

export default function Banner() {
    
    const [ banners, setBanners ] = useState([]);

    const traerBanner = async () => {
        await clienteAxios
			.get(`/adminBanner/banner-company`)
			.then((res) => {
                setBanners(res.data);
			})
			.catch((err) => {
			});
    };

    useEffect(() => {
        traerBanner(); 
    }, [])

    const render = banners.map((banner, index) => {
        return(
            <Element key={index} prefixCls="banner-user-elem" >
                <Link to={`www.comody.mx/${banner.empresaAsociada}`}>
                    <BgElement
                        key="bg"
                        className="bg banner-elemento"
                        alt="img-oferta"
                        style={{
                            backgroundImage: `url(${banner.imgBannerAdminUrl})`,
                        }}
                    >
                    </BgElement>
                </Link>
            </Element>
        );
    })

    return (
        <>
            {banners.length === 0 ? (
                null
            ): (
                <BannerAnim autoPlay  prefixCls="banner-user" delay={200}>
                    {render}
                </BannerAnim>
            )}
        </>
		
    )
}
