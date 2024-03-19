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
  Pressable,
  ScrollViewComponent,
  ImageBackground
} from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import messageData from '../../assets/data/messages.json'
import {
  Ionicons,
  MaterialIcons,
  Entypo,
} from '@expo/vector-icons'
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Send,
  SystemMessage,
  IMessage
} from 'react-native-gifted-chat'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Message = () => {
  const [messages, setMessages] = useState([])
  const insets = useSafeAreaInsets()
  const [text, setText] = useState('')

  useEffect(() => {
    setMessages([
      ...messageData.map(message => {
        return {
          _id: message.id,
          text: message.msg,
          createdAt: new Date(message.date),
          user: {
            _id: message.from,
            name: message.form ? 'You' : 'Bob'
          }
        }
      }),
      {
        _id: 0,
        system: true,
        text: 'Lazan Francis remains on the beat',
        createdAt: new Date(),
        user: {
          _id: 0,
          name: 'Bot'
        }
      }
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages)
    )
  }, [])

  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{ backgroundColor: '#131313', color:"white",justifyContent:"center", marginHorizontal:20, borderRadius:20 }}
        textInputProps={{ color: 'white', marginLeft:22 }}
        renderActions={() => (
          <View
            style={{
              height: 44,
              justifyContent: 'center',
              alignItems: 'center',
              left: 5,
              flexDirection:"row",
              gap:10
            }}
          >
            <MaterialIcons name='emoji-emotions' color='#fcf988' size={28} />

            <Entypo name='attachment' color='#fcf988' size={28} />

            <MaterialIcons name='photo-camera' color='#fcf988' size={28} />

            {/* <Ionicons name='add' color='#fcf988' size={28} /> */}
          </View>
        )}
      />
    )
  }

  // useEffect(() => {
  //     const ws = new WebSocket('ws://192.168.30.133:8000?userName=Dan');

  //     ws.onopen = () => {
  //       console.log('Connected to WebSocket server');
  //       ws.send('Hello, WebSocket server!');
  //     };

  //     ws.onmessage = (event) => {
  //       alert('Received message from server:', event.data);
  //     };

  //     // ws.onclose = () => {
  //     //   console.log('Disconnected from WebSocket server');
  //     // };
  //     // ws.send("hello")
  //     // return () => {
  //     //   ws.close();
  //     // };
  //   }, []);
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#fcefc3', '#d9e5d1']}
        style={styles.background}
      />

      <ImageBackground style={{ flex: 1, marginBottom: insets.bottom }}>
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          onInputTextChanged={setText}
          // renderAvatar={null}
          user={{
            _id: 1
          }}
          // for the containers that hold the chat messages
          renderBubble={props => {
            return (
              <Bubble
                {...props}
                textStyle={{
                  right: {
                    color: '#000'
                  }
                }}
                wrapperStyle={{
                  left: {
                    backgroundColor: '#fff98b'
                  },
                  right: {
                    backgroundColor: '#ffffff'
                  }
                }}
              />
            )
          }}
          // for changing the send button on the chat

          renderSend={props => (
            <View
              style={{
                height: 44,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 14,
                paddingHorizontal: 14
              }}
            >
              {/* {text === '' && (
              <>
                <Ionicons name="camera-outline" color="#fff68b" size={28} />
                <Ionicons name="mic-outline" color="#fff68b" size={28} />
              </>
            )} */}
              {text !== '' && (
                <Send
                  {...props}
                  containerStyle={{
                    justifyContent: 'center'
                  }}
                >
                  <Ionicons name='send' color='#fff68b' size={28} />
                </Send>
              )}
            </View>
          )}
          renderInputToolbar={renderInputToolbar}
          // textInputProps={{
          //       style: { color: 'red' ,width:"100%", backgroundColor:"blue", justifyContent:"center"} 
          //   }}
        />
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // alignItems: 'center'
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%'
  }
})
export default Message
