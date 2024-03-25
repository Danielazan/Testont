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
import React,{useContext,useState} from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Logo from '../../assets/Logo.png'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import { GlobalContext } from '../contexts'

const Login = ({ navigation }) => {
  const { height } = useWindowDimensions()

  const {id, setId} = useContext(GlobalContext)

  const [PassWord, setPassWord] = useState("")

  const Login = () => {
    
    setId(PassWord)
    console.log(id)
    navigation.navigate('Welcome')
  }
  const signUp = () => {
    navigation.navigate('Home')
  }
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
          // flex:1,
          alignItems: 'center',
          width: '100%'
        }}
        keyboardVerticalOffset={60}
        behavior='padding'
      >
        <View
          style={{
            //   flex: 1,
            width: '80%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            height:150,
            paddingVertical:10
          }}
        >
          <CustomInput
            Radius={10}
            Background='white'
            placeholder='User Name'
            width='80%'
            height='32%'
            Hpadding='2%'
            //   marginB='3%'
            Bwidth={2}
            //   marginB='3%'
            //    TextWidth= "80%"
          />
          <View style={styles.line} />

          <CustomInput
            Radius={10}
            Background='white'
            placeholder='PassWord'
            value={PassWord}
            setvalue={setPassWord}
            width='80%'
            height='32%'
            Hpadding='2%'
            //   marginB='3%'
            Bwidth={2}

            //    TextWidth= "80%"
          />
        </View>

        <CustomButton
          width='50%'
          text='Login'
          color='#ffa800'
          textcolor='white'
          borderR={10}
          items='center'
          padding='2%'
          marginT='4%'
          onPress={() => Login()}
          height='12%'
          fontsize={24}
        />

        <CustomButton
          width='50%'
          text='Sign Up'
          // color='#ffa800'
          textcolor='black'
          items='center'
          padding='2%'
          marginT='4%'
          onPress={() => signUp()}
          // height='15%'
          fontsize={24}
        />


<CustomButton
          width='80%'
          text='Sign with Google'
          color='white'
          textcolor='red'
          borderR={10}
          items='center'
          padding='2%'
          marginT='4%'
          onPress={() => Login()}
          height='10%'
          fontsize={19}
        />

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
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'red'
  },
  line: {
    height: '2%',
    backgroundColor: 'black',
    width: '80%',
    marginVertical: 2
  }
})

export default Login
