import React from 'react'
import Image from 'next/image';
function Title(props) {
    const SpanClasses = props.SpanClass ? props.SpanClass + ' ps-2' : 'ps-2';
    let ImagePath = "https://api.cloudapi.viewmynew.com/media/61d247f6e64e0_Shay-And-Company-Icon.svg";

    const CustomTag = `${props.as}`;
    const Width = props.Width ? parseInt(props.Width) : 35;
    const Height = Width * 1.4563106796117;
  return (
    <CustomTag className={props.Size + " d-flex align-items-center justify-content-center"}><Image layout="fixed" src={ImagePath} width={Width} height={Height} alt={props.Name} /><span className={SpanClasses}>{" " + props.Name}</span></CustomTag>
  );
}
export default Title;