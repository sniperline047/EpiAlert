import React, {Component} from 'react';
import {View, ScrollView, Image, StyleSheet, Dimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const DEVICE_WIDTH = Dimensions.get('window').width;

class Carousel extends Component {
  scrollRef = React.createRef();
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
    };
    this.scrollRef = React.createRef();
  }

  componentDidMount = () => {
    setInterval(() => {
      this.setState(
        prev => ({
          selectedIndex:
            prev.selectedIndex === this.props.images.length - 1
              ? 0
              : prev.selectedIndex + 1,
        }),
        () => {
          this.scrollRef.current.scrollTo({
            animated: true,
            x: wp('100%') * this.state.selectedIndex,
            y: 0,
          });
        },
      );
    }, 2000);
  };

  setSelectedIndex = event => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;

    // Divide the horizontal offset by the width of the view to see which page is visible
    const selectedIndex = Math.floor(contentOffset.x / viewSize.width);
    this.setState({selectedIndex});
  };

  render() {
    const {images} = this.props;
    const {selectedIndex} = this.state;
    if (images && images.length) {
      return (
        <View style={styles.scrollContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            onMomentumScrollEnd={this.setSelectedIndex}
            ref={this.scrollRef}
            showsHorizontalScrollIndicator={false}>
            {images.map(image => (
              <Image
                style={styles.image}
                source={image.source}
                key={image.id}
              />
            ))}
          </ScrollView>
          <View style={styles.circleDiv}>
            {images.map((image, i) => (
              <View
                style={[
                  styles.whiteCircle,
                  { opacity: i === selectedIndex ? 0.5 : 1 }
                ]}
                key={image.id}
                active={i === selectedIndex}
              />
            ))}
          </View>
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    height: hp('30%'),
    width: wp('80%'),
    alignItems: 'center',
    alignSelf: 'center',
  },
  image: {
    width: wp('80%'),
    height: hp('30%'),
    borderRadius: 22,
  },
  circleDiv: {
    position: 'absolute',
    bottom: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 10,
  },
  whiteCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    margin: 5,
    backgroundColor: '#fff',
  },
});

export default Carousel;
