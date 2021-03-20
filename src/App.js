import React, { useState } from 'react';
import { View, Text, Image, SafeAreaView, StyleSheet, TouchableOpacity, Alert, Modal } from 'react-native';
import Icon from 'react-native-remix-icon';

const styles = StyleSheet.create({
  root: {
    padding: 20,
    alignItems: 'center',
    height: '100%',
  },
  posterContainer: {
    shadowColor: "#000",
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
    bottom:0,
    borderRadius: 10,
    height: 30,
    justifyContent: 'center'
  },
  rateBtnText: {
    color:'#fff',
    textAlign:'center',
    paddingHorizontal : 10,
  },
  doneBtn: {
    backgroundColor: '#46b363',
    borderRadius: 10,
    height: 30,
    justifyContent: 'center',
    marginTop: 30,
  },
  doneBtnText: {
    color: '#fff',
    textAlign:'center',
    paddingHorizontal : 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 30,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "relative"
  },
  closeButton: {
    borderRadius: 50,
    paddingHorizontal: 3,
    borderWidth: 1,
    elevation: 2,
    position: "absolute",
    top: 10,
    right: 10,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

const App = () => {
  const [superhero, setSuperHero] = useState('Spiderman');
  const [rating, setRating] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const alertDetails = () => {
    Alert.alert('Spider-Man is a fictional superhero created by writer-editor Stan Lee and writer-artist Steve Ditko. He first appeared in the anthology comic book Amazing Fantasy #15 (Aug. 1962) in the Silver Age of Comic Books.');
  }
  
  return (
    <SafeAreaView>
      <View style={[styles.root]}>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Rate {superhero}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>X</Text>
            </TouchableOpacity>

            <View style={[styles.ratingBar]}>
              {
                [...Array(5)].map((e, i) => {
                  return (rating >= i+1) 
                    ? <Icon key={i} style={styles.ratingIcons} name="star-fill" size="24" color="gold" onPress={() => setRating(i+1)}/>
                    : <Icon key={i} style={styles.ratingIcons} name="star-line" size="24" color="gold" onPress={() => setRating(i+1)}/>
                })
              }
            </View>
            <TouchableOpacity
              style={[styles.doneBtn]}
              onPress={() => setModalVisible(false)}
              underlayColor='#fff'>
              <Text style={[styles.doneBtnText]}>Done</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
        <View style={[styles.posterContainer]}>
          <Image source={require('../images/toby.jpg')} style={[styles.posterImage]} />
        </View>
        <TouchableOpacity 
          onPress={alertDetails}>
          <Text style={[styles.text, styles.boldText]}>{superhero}</Text>
        </TouchableOpacity>
        <Text style={[styles.text, styles.greyText]}>
          by <Text style={[styles.underlinedText]}>Peter Parker</Text>
        </Text>
        <View style={[styles.ratingBar]}>
          <Text style={[styles.text, styles.greyText]}> Super Power Rating:   </Text>
          {
            [...Array(5)].map((e, i) => {
              return (rating >= i+1) 
              ? <Icon key={i} style={styles.ratingIcons} name="star-fill" size="24" color="gold"/>
              : <Icon key={i} style={styles.ratingIcons} name="star-line" size="24" color="gold"/>
            })
          }
          <Text style={[styles.text, styles.greyText]}> ( {rating} )</Text>
        </View>
        <TouchableOpacity
          style={[styles.rateButton]}
          onPress={() => setModalVisible(true)}
          underlayColor='#fff'>
          <Text style={[styles.rateBtnText]}>Rate this superhero</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default App;