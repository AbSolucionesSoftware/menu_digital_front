import React, { Fragment, useEffect, useState } from 'react'
import { makeStyles} from '@material-ui/core';
import './banner.scss';
import BannerAnim, { Element } from 'rc-banner-anim';
import 'rc-banner-anim/assets/index.css';
import clienteAxios from '../../../config/axios';
const BgElement = Element.BgElement;

export default function Banner(props) {
    
    const [ banners, setBanners ] = useState([]);
    const {empresa} = props;

    const traerBanner = async () => {
        await clienteAxios
			.get(`/banner/banner-company/${empresa._id}`)
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
                    <BgElement
                        key="bg"
                        className="bg banner-elemento"
                        alt="img-oferta"
                        style={{
                            backgroundImage: `url(${banner.imagenBannerUrl})`,
                        }}
                    >
                    </BgElement>
                </Element>
            )
        
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
