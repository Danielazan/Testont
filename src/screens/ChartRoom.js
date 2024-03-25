import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable
} from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons'
import CustomButton from '../components/CustomButton'
import Logo from '../../assets/Image1.jpg'
import { LinearGradient } from 'expo-linear-gradient'
import { FlashList } from '@shopify/flash-list'

const ChartRoom = ({ navigation }) => {
  const { height } = useWindowDimensions()

  const Message = () => {
  
    navigation.navigate('Message')
  }
  const DATA = [
    { Frist: 'Ontime', znd: 'Profo' },
    { Frist: 'Ontime', znd: 'Appo' },
    { Frist: 'Ontime', znd: 'Delivery' },
    { Frist: 'Ontime', znd: 'Stay' },
    { Frist: 'Ontime', znd: 'Insurance' },
    { Frist: 'Ontime', znd: 'Trav' },
    { Frist: 'Ontime', znd: 'Vote' },
    { Frist: 'Ontime', znd: 'Arbitration' },
    { Frist: 'Ontime', znd: 'Chater' },
    { Frist: 'Ontime', znd: 'Security' },
    { Frist: 'Ontime', znd: 'MoneyDesk' },
    { Frist: 'Ontime', znd: 'Pay' }
  ]

  const renderItem = ({ item }) => {
    // return
    return (
      //   <CustomButton
      //     borderR={30}
      //     width="100%"
      //     color='black'
      //     padding={10}
      //     height={50}
      //     text={item.Frist}
      //     fontsize={14}
      //     textcolor='white'
      //     zndText={item.znd}
      //     items='center'
      //     textcolorz='#e7e9bc'
      //     margin={5}
      //     weight={500}
      //     // onPress={rooms}
      //   />

      <View
        style={{
          width: '95%',
          backgroundColor: 'green',
          marginVertical: 10,
          marginHorizontal: 10,
          height: '70%',
          borderRadius: 50,
          padding: 15,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Pressable
          style={{ width: '60%', height: 50, justifyContent: 'center' }}
          onPress={Message}
        >
          <Text>{item.Frist}</Text>
        </Pressable>

        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10
          }}
        >
          <Text>{item.Frist}</Text>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              borderWidth: 2,
              borderColor: 'white'
            }}
          >
            <Image
              source={Logo}
              style={{ borderRadius: 50, width: '90%', height: '100%' }}
              resizeMode='stretch'
            />
          </View>
        </Pressable>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#fcefc3', '#d9e5d1']}
        style={styles.background}
      />
      <View style={styles.header}>
        <View style={[styles.contentName, { marginTop: height * 0.05 }]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '50%',
              gap:5,
              marginLeft:7
              //   backgroundColor: 'blue'
            }}
          >
            <TouchableOpacity>
              <Entypo name='arrow-with-circle-left' size={24} color='white' />
            </TouchableOpacity>

            <Text style={{ fontSize: 20 }}>OnTime Profo</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '20%'
              //   backgroundColor: 'blue'
            }}
          >
            <View style={{ borderWidth: 2, borderRadius: 50 }}>
              <Image source={Logo} style={[styles.logo]} resizeMode='cover' />
            </View>

            <TouchableOpacity>
              <Entypo name='dots-three-vertical' size={24} color='#07fe00' />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contentButton}>
          <CustomButton
            text='Conversation'
            height={40}
            width={100}
            color='#5a5e5a'
            borderR={5}
            textcolor='#fcf988'
            padding={2}
            items='center'
            weight={800}
          />

          <CustomButton
            text='Find'
            height={40}
            width={90}
            color='#5a5e5a'
            borderR={5}
            textcolor='#fcf988'
            padding={2}
            items='center'
            weight={800}
          />

          <CustomButton
            text='Book an appointment'
            height={40}
            width={160}
            color='#5a5e5a'
            borderR={5}
            textcolor='#fcf988'
            padding={2}
            items='center'
            weight={800}
          />
        </View>
      </View>

      <View style={styles.flash}>
        <FlashList
          data={DATA}
          renderItem={renderItem}
          estimatedItemSize={200}
          numColumns={1}
          columnWrapperStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 20
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
    // justifyContent:"center"
  },
  header: {
    width: '100%',
    height: 160,
    backgroundColor: '#69736a',
    alignItems: 'center',
    paddingBottom: 14
  },
  contentName: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
    // backgroundColor: 'red'
    // marginBottom:4
  },
  contentUp: {
    alignItems: 'center',

    flexDirection: 'row',
    justifyContent: 'center'
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 50
  },
  contentButton: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%'
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%'
  },
  flash: {
    width: '100%',
    height: '100%',
    // alignItems:"center",
    // justifyContent:"center",
    // backgroundColor:"red",
    flex: 1
  }
})
export default ChartRoom
