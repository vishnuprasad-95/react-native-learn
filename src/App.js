import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  FlatList,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-remix-icon';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

import reviewTypes from './store/constants/reviewTypes';

const styles = StyleSheet.create({
  root: {
    padding: 20,
    alignItems: 'center',
    height: '100%',
  },
  posterContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    borderColor: '#474747',
    borderWidth: 1,
    position: 'relative',
    padding: 5,
  },
  posterImage: {
    height: 300,
    width: 200,
  },
  text: {
    textAlign: 'center',
    marginTop: 12,
  },
  boldText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  greyText: {
    color: 'grey',
  },
  underlinedText: {
    textDecorationLine: 'underline',
  },
  ratingBar: {
    flexDirection: 'row',
  },
  ratingIcons: {
    marginTop: 8,
  },
  rateButton: {
    width: '100%',
    backgroundColor: '#ff5447',
    position: 'absolute',
    bottom: 0,
    borderRadius: 10,
    height: 30,
    justifyContent: 'center',
  },
  rateBtnText: {
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  modalBtns: {
    flexDirection: 'row',
    marginTop: 30,
    width: '100%',
    justifyContent: 'space-evenly',
  },
  clearBtn: {
    backgroundColor: '#fff',
    height: 30,
    justifyContent: 'center',
  },
  clearBtnText: {
    color: '#f00',
    textAlign: 'center',
    paddingHorizontal: 10,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '#f00',
  },
  disabledBtn: {
    backgroundColor: '#a2a4a8',
  },
  doneBtn: {
    backgroundColor: '#46b363',
    borderRadius: 10,
    height: 30,
    justifyContent: 'center',
  },
  doneBtnText: {
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    width: '70%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
  },
  closeButton: {
    borderRadius: 50,
    paddingHorizontal: 3,
    borderWidth: 1,
    elevation: 2,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  reviewBox: {
    marginTop: 20,
    width: '90%',
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    padding: 10,
  },
  reviews: {
    width: '80%',
    height: 300,
    marginVertical: 25,
  },
  reviewHeader: {
    textAlign: 'left',
    fontSize: 17,
    fontWeight: 'bold',
  },
  reviewItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bullet: {
    marginTop: 4,
  },
  reviewTexts: {
    marginVertical: 5,
    textAlign: 'left',
  },
});

const Item = ({text}) => (
  <View style={styles.reviewItem}>
    <Text style={styles.bullet}>• </Text>
    <Text style={styles.reviewTexts}>{text}</Text>
  </View>
);

const App = () => {
  const dispatch = useDispatch();
  const [superhero] = useState('Spiderman');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [avgRating, setAvgRating] = useState(0);
  const reviews = useSelector((state) => state.reviews);

  const alertDetails = () => {
    Alert.alert(
      'Spider-Man is a fictional superhero created by writer-editor Stan Lee and writer-artist Steve Ditko. He first appeared in the anthology comic book Amazing Fantasy #15 (Aug. 1962) in the Silver Age of Comic Books.',
    );
  };

  const submitReview = () => {
    const payload = {
      id: uuidv4(),
      text: review,
      rated: rating,
    };
    dispatch({type: reviewTypes.ADD_REVIEW, review: payload});
    setRating(0);
    setReview('');
    setModalVisible(false);
  };

  const clearModalValues = () => {
    setRating(0);
    setReview('');
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    const totalRating = reviews.reduce((acc, item) => {
      return acc + item.rated;
    }, 0);
    const avg = reviews.length ? totalRating / reviews.length : 0;
    setAvgRating(avg.toFixed(2));
  }, [reviews]);

  return (
    <SafeAreaView>
      <View style={[styles.root]}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Rate {superhero}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={clearModalValues}>
                <Text style={styles.textStyle}>X</Text>
              </TouchableOpacity>

              <View style={[styles.ratingBar]}>
                {[...Array(5)].map((e, i) => {
                  return rating >= i + 1 ? (
                    <Icon
                      key={i}
                      style={styles.ratingIcons}
                      name="star-fill"
                      size="24"
                      color="gold"
                      onPress={() => setRating(i + 1)}
                    />
                  ) : (
                    <Icon
                      key={i}
                      style={styles.ratingIcons}
                      name="star-line"
                      size="24"
                      color="gold"
                      onPress={() => setRating(i + 1)}
                    />
                  );
                })}
              </View>
              <TextInput
                style={styles.reviewBox}
                onChangeText={setReview}
                value={review}
                placeholder="Enter your review..."
                multiline={true}
              />
              <View style={styles.modalBtns}>
                <TouchableOpacity
                  style={[styles.clearBtn]}
                  onPress={() => {
                    setReview('');
                    setRating(0);
                  }}
                  underlayColor="#fff">
                  <Text style={[styles.clearBtnText]}>Clear</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.doneBtn,
                    !rating && !review && styles.disabledBtn,
                  ]}
                  disabled={!rating && !review}
                  onPress={submitReview}
                  underlayColor="#fff">
                  <Text style={[styles.doneBtnText]}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <View style={[styles.posterContainer]}>
          <Image
            source={require('../images/toby.jpg')}
            style={[styles.posterImage]}
          />
        </View>
        <TouchableOpacity onPress={alertDetails}>
          <Text style={[styles.text, styles.boldText]}>{superhero}</Text>
        </TouchableOpacity>
        <Text style={[styles.text, styles.greyText]}>
          by <Text style={[styles.underlinedText]}>Peter Parker</Text>
        </Text>
        <View style={[styles.ratingBar]}>
          <Text style={[styles.text, styles.greyText]}>
            {' '}
            Super Power Rating:{' '}
          </Text>
          {[...Array(5)].map((e, i) => {
            return parseFloat(avgRating).toFixed(0) >= i + 1 ? (
              <Icon
                key={i}
                style={styles.ratingIcons}
                name="star-fill"
                size="24"
                color="gold"
              />
            ) : (
              <Icon
                key={i}
                style={styles.ratingIcons}
                name="star-line"
                size="24"
                color="gold"
              />
            );
          })}
          <Text style={[styles.text, styles.greyText]}> ( {avgRating} )</Text>
        </View>
        <View style={styles.reviews}>
          <Text style={styles.reviewHeader}>Reviews: </Text>
          <FlatList
            data={reviews}
            extraData={reviews}
            renderItem={({item}) => <Item text={item.text} />}
            keyExtractor={(item) => item.id}
          />
        </View>
        <TouchableOpacity
          style={[styles.rateButton]}
          onPress={() => setModalVisible(true)}
          underlayColor="#fff">
          <Text style={[styles.rateBtnText]}>Rate this superhero</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default App;
