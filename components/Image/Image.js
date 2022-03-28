import NextImage from 'next/image';

const Image = (props) => {
    return (
        <div className={props.imageContainer} style={props.styles}>
            <NextImage src={props.src} layout='fill' objectFit="cover" />
        </div>
    );
};

export default Image;