import React, { Fragment, useEffect, useState } from 'react'
import { makeStyles} from '@material-ui/core';
import './banner.scss';
import imagen from '../img/BannerLogo.PNG'
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
                console.log("si hay datos");
			})
			.catch((err) => {
                console.log(err);
			});
    };

    useEffect(() => {
        traerBanner(); 
    }, [])

    const render = banners.map(banner => {
        return(
            <Element prefixCls="banner-user-elem" >
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
        <BannerAnim autoPlay  prefixCls="banner-user" delay={200}>
            {render}
		</BannerAnim>
    )
}
