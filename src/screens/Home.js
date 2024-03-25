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
import React, { useState,useContext } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Logo from '../../assets/Logo.png'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import CheckBox from '../components/Checkbox'
import { GlobalContext } from '../contexts'

const Home = ({ navigation }) => {
  const { height } = useWindowDimensions()

  const { id } = useContext(GlobalContext)

  const Register = () => {
  
    navigation.navigate('Welcome')
  }
  const [Tview, setTview] = useState(true)

  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <LinearGradient
        colors={['#fcefc3', '#d9e5d1']}
        style={styles.background}
      />

      <Image
        source={Logo}
        style={[styles.logo, { height: height * 0.2 }]}
        resizeMode='contain'
      />

      <KeyboardAvoidingView
        style={{
          flex: 1,

          width: '100%'
        }}
        keyboardVerticalOffset={60}
        behavior='padding'
      >
        {Tview && (
          <View
            style={{
              flex: 1,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <CustomInput
              Radius={10}
              Background='white'
              placeholder='Frist Name'
              width='80%'
              height='8%'
              Hpadding='2%'
              marginB='3%'
              //    TextWidth= "80%"
            />
            <CustomInput
              Radius={10}
              Background='white'
              placeholder='Middle Name'
              width='80%'
              height='8%'
              Hpadding='2%'
              marginB='3%'
              //    TextWidth= "80%"
            />
            <CustomInput
              Radius={10}
              Background='white'
              placeholder='Last Name'
              width='80%'
              height='8%'
              Hpadding='2%'
              marginB='3%'
              //    TextWidth= "80%"
            />
            <CustomInput
              Radius={10}
              Background='white'
              placeholder='Address'
              width='80%'
              height='8%'
              Hpadding='2%'
              marginB='3%'
              //    TextWidth= "80%"
            />

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                height: 'auto',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 20
                // backgroundColor:"blue"
              }}
            >
              <CustomInput
                Radius={5}
                Background='white'
                placeholder='Country'
                width='22%'
                height='auto'
                Hpadding='2%'
                marginB='3%'
                //    TextWidth= "80%"
              />

              <CustomInput
                Radius={5}
                Background='white'
                placeholder='State'
                width='22%'
                height='auto'
                Hpadding='2%'
                marginB='3%'
                //    TextWidth= "80%"
              />

              <CustomInput
                Radius={5}
                Background='white'
                placeholder='City'
                width='22%'
                height='auto'
                Hpadding='2%'
                marginB='3%'
                //    TextWidth= "80%"
              />
            </View>
            <CustomInput
              Radius={10}
              Background='white'
              placeholder='Email'
              width='80%'
              height='8%'
              Hpadding='2%'
              marginB='3%'
              //    TextWidth= "80%"
            />
            <CustomInput
              Radius={10}
              Background='white'
              placeholder='Nin Verification'
              width='80%'
              height='8%'
              Hpadding='2%'
              marginB='3%'
              //    TextWidth= "80%"
            />

            <CustomInput
              Radius={10}
              Background='white'
              placeholder='Tel:'
              width='80%'
              height='8%'
              Hpadding='2%'
              marginB='3%'
              //    TextWidth= "80%"
            />

            <CustomButton
              width='50%'
              text='Continue'
              color='black'
              textcolor='yellow'
              borderR={10}
              items='center'
              padding='2%'
              marginT='4%'
              onPress={() => setTview(false)}
            />
          </View>
        )}

        {!Tview && (
          <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
            <CustomInput
              Radius={10}
              Background='white'
              placeholder='Tel:'
              width='80%'
              height='8%'
              Hpadding='2%'
              marginB='3%'
              //    TextWidth= "80%"
            />

            <CustomInput
              Radius={10}
              Background='white'
              placeholder='Gender'
              width='80%'
              height='8%'
              Hpadding='2%'
              marginB='3%'
              //    TextWidth= "80%"
            />

            <CustomInput
              Radius={10}
              Background='white'
              placeholder='UserName'
              width='80%'
              height='8%'
              Hpadding='2%'
              marginB='3%'
              //    TextWidth= "80%"
            />

            <CustomInput
              Radius={10}
              Background='white'
              placeholder='Password'
              width='80%'
              height='8%'
              Hpadding='2%'
              marginB='3%'
              //    TextWidth= "80%"
            />

            <CustomInput
              Radius={10}
              Background='white'
              placeholder='Comfirm Passowrd'
              width='80%'
              height='8%'
              Hpadding='2%'
              marginB='3%'
              //    TextWidth= "80%"
            />
            <CheckBox title='Terms & Condition Apply' />
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-around',
                flexDirection: 'row'
              }}
            >
              <CustomButton
                width='30%'
                text='Back'
                color='black'
                textcolor='yellow'
                borderR={10}
                items='center'
                padding='2%'
                marginT='4%'
                onPress={() => setTview(true)}
              />

              <CustomButton
                width='30%'
                text='Next'
                color='black'
                textcolor='yellow'
                borderR={10}
                items='center'
                padding='2%'
                marginT='4%'
                onPress={() => Register()}
              />
            </View>

            <View
              style={{
                marginTop: 10,
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 6
              }}
            >
              <Text>Already have an account?</Text>

              <Text style={{ color: 'green' }}>Login</Text>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%'
  },
  logo: {
    width: '50%'
  },

  keycontainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'red'
  }
})

export default Home
