import React from 'react';
import { View, ImageBackground } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
//import FetchData from '../../utils/FetchData';

export default class ApplicationRemoteImage extends React.Component {
    constructor(props) {
        super(props);
       
        this.state = {
            loadImage: false,
            imageLoaded: false,
            imageSource: {uri: ''}   
        };

        this.loadImage = this.loadImage.bind(this);
        this.onImageLoaded = this.onImageLoaded.bind(this);
        this.onImageLoadError = this.onImageLoadError.bind(this);
    }
    componentDidMount() {
        this.loadImage();
    }
    componentDidUpdate() {
        this.loadImage();
    }
    loadImage() {
        const { imageId } = this.props;
        const { loadImage } = this.state;
        // if(imageId && loadImage === false) {
        //     const imageUrl = FetchData.getFilePreviewUrl(imageId);
        //     // console.log('imageUrl', imageUrl);
        //     this.setState({
        //         loadImage: true,
        //         imageSource: {
        //             uri: imageUrl
        //         }
        //     });
        // }
    }
    onImageLoaded() {
        this.setState({
            loadImage: false,
            imageLoaded: true
        });
    }
    onImageLoadError(error, imageSource) {
        console.log('error', error);
    }
    render() {
        const { loadImage, imageLoaded, imageSource } = this.state;
        const { 
            children, 
            style, 
            imageStyle,
            defaultImageStyle, 
            defaultImageSource,
            resizeMode='center' 
        } = this.props;
        
        return (
            <View style={{width: style.width}}>
                {
                    loadImage === true || imageLoaded === true
                    ? (
                        <ImageBackground 
                            style={style}
                            imageStyle={imageStyle}
                            onLoadEnd={this.onImageLoaded}
                            onError={({nativeEvent: {error}}) => this.onImageLoadError(error, imageSource)}
                            source={imageSource}
                            resizeMode={resizeMode}>
                            {children}
                        </ImageBackground>
                    )
                    : null
                }
                {
                    defaultImageSource && imageLoaded === false 
                        ? (
                            <View style={[styles.imagePlaceholder]}>
                                <ImageBackground 
                                    style={[styles.imagePlaceholder, defaultImageStyle]}
                                    source={defaultImageSource} 
                                    resizeMode='center'>
                                    {children}
                                </ImageBackground>
                            </View>
                        )
                        : null
                }
            </View>
        );
    }
};

const styles = ScaledSheet.create({
    imagePlaceholder: {
        position: 'absolute',
        width: '100%',
        height: '100%'
    }
});