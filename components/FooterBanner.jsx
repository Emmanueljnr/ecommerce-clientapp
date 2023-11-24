import React from 'react'
import Link from 'next/link';
import {urlFor} from '../lib/client';

const FooterBanner = ({ footerBanner: {discount, largeText1, 
largeText2, saleTime, smallText, midText, desc, product, buttonText, image } }) => {
  return (
      <div className="footer-banner-container">
          <div className='banner-desc'>
              {/* Left side of the footer */}
              <div className='left'>
                  <p className=''>{discount}</p>
                  <h3 className=''>{largeText1}</h3>
                  <h3 className=''>{largeText2}</h3>
                  <p className=''>{saleTime}</p>
              </div>
              {/* Right side of the footer */}
              <div className='right'>
                  <p className=''>{smallText}</p>
                  <h3 className=''>{midText}</h3>
                  <p className=''>{desc}</p>
                  <Link href={`/product/${product}`}>
                   <button type='button'>{buttonText}</button>
                  </Link>
              </div>

              <image alt="Footer-Banner-Image" src={urlFor(image)} className='footer-banner-image' />
          </div>
      </div>
  )
}

export default FooterBanner