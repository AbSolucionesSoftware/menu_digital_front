import React, { Fragment } from 'react'
import { makeStyles} from '@material-ui/core';
import './banner.scss';
import imagen from '../img/BannerLogo.PNG'
import BannerAnim, { Element } from 'rc-banner-anim';
import 'rc-banner-anim/assets/index.css';
const BgElement = Element.BgElement;

export default function Banner() {

    return (
        <BannerAnim autoPlay /* activeIndex={index} */ /* onSelect={handleSelect} */ prefixCls="banner-user" delay={200}>
            <Element prefixCls="banner-user-elem" >
                <BgElement
                    key="bg"
                    className="bg banner-elemento"
                    alt="img-oferta"
                    style={{
                        backgroundImage: `url(${imagen})`,
                        cursor: 'pointer' 
                    }}
                >
                </BgElement>
            </Element>
            <Element prefixCls="banner-user-elem" >
                <BgElement
                    key="bg"
                    className="bg banner-elemento"
                    alt="img-oferta"
                    style={{
                        backgroundImage: `url(${imagen})`,
                        cursor: 'pointer' 
                    }}
                >
                </BgElement>
            </Element>
            <Element prefixCls="banner-user-elem" >
                <BgElement
                    key="bg"
                    className="bg banner-elemento"
                    alt="img-oferta"
                    style={{
                        backgroundImage: `url(${imagen})`,
                        cursor: 'pointer' 
                    }}
                >
                </BgElement>
            </Element>
		</BannerAnim>
    )
}
