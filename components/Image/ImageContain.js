import NextImage from 'next/image';

const Image = (props) => {
    return (
        <div className={props.imageContainer} style={props.styles}>
            <NextImage src={props.src} layout='fill' objectFit="contain" alt={props.alt} />
        </div>
    );
};

export default Image;