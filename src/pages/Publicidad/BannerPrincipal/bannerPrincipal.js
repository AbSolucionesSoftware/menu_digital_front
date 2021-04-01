import React from 'react'
import './banner.scss'
import BannerAnim, { Element } from 'rc-banner-anim';
import 'rc-banner-anim/assets/index.css';
import Banner1 from '../img/comodyBanner.jpg'
import Banner2 from '../img/comodyBannerDos.jpeg'

export default function BannerPrincipal() {

    const BgElement = Element.BgElement;


    return (
        <BannerAnim autoPlay  prefixCls="banner-user" delay={200}>
            <Element key={1} prefixCls="banner-user-elem" >
                <BgElement
                    key="bg"
                    className="bg banner-elemento"
                    alt="img-oferta"
                    style={{
                        backgroundImage: `url(${Banner1})`,
                    }}
                >
                </BgElement>
            </Element>
            <Element key={2} prefixCls="banner-user-elem" >
                <BgElement
                    key="bg"
                    className="bg banner-elemento"
                    alt="img-oferta"
                    style={{
                        backgroundImage: `url(${Banner2})`,
                    }}
                >
                </BgElement>
            </Element>
        </BannerAnim>
    )
}
