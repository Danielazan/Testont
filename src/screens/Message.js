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
import React, { useEffect, useState, useCallback, useContext } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
// import messageData from '../../assets/data/messages.json'
import {
  Ionicons,
  MaterialIcons,
  Entypo,
  Feather,
  FontAwesome
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
import { GlobalContext } from '../contexts'
import { useSocket } from '../contexts/SocketHandler'
import { useDatabase } from '../contexts/database'
import Logo from '../../assets/Logo.png'
import CustomButton from '../components/CustomButton'

const Message = () => {
  const { height } = useWindowDimensions()
  const [messages, setMessages] = useState([])
  const insets = useSafeAreaInsets()
  const [text, setText] = useState('')

  const socket = useSocket()

  const database = useDatabase()

  // const [message, setMessages] = useState([])

  const { id } = useContext(GlobalContext)

  const messageData = []

  const [msg, setMsg] = useState([])

  const formatDateWithoutTimezone = () => {
    const currentDate = new Date()
    const options = {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    }
    const formattedDate = currentDate
      .toLocaleString('en-US', options)
      .replace(/ \(.+\)/, '')

    return formattedDate
  }

  useEffect(() => {
    // socket.onopen = () => {
    //   console.log('Connected to WebSocket server')
    //   socket.send('Hello, WebSocket server!')
    // }

    socket.onmessage = event => {
      alert(event.data)

      const receivedMessage = JSON.parse(event.data)

      console.log(receivedMessage)

      // const blobData = new Blob([JSON.stringify(receivedMessage)], { type: 'application/json' });

      const blobData = JSON.stringify(receivedMessage)

      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, receivedMessage)
      )

      database.transaction(tx => {
        tx.executeSql(
          'INSERT INTO message (chats) VALUES (?);',
          [blobData],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              console.log(
                'Array converted to Blob and stored in SQLite successfully!'
              )
            } else {
              console.log('Failed to store Blob data in SQLite.')
            }
          },
          (_, error) => {
            console.error('Error storing Blob data in SQLite:', error)
          }
        )
      })

      console.log(blobData)
    }

    // socket.onclose = () => {
    //   console.log('Disconnected from WebSocket server');
    // };

    alert(id)

    // alert(formatDateWithoutTimezone())

    // socket.send('hello')
    //     return () => {
    //       socket.close();
    // }
  }, [socket])

  const fetchDataFromDatabase = () => {}

  useEffect(() => {
    database.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM message',
        [],
        (_, { rows }) => {
          if (rows.length > 0) {
            const parsedData = rows._array.map(row => {
              const message = JSON.parse(row.chats)

              console.log(message)
              setMessages(previousMessages =>
                GiftedChat.append(previousMessages, message)
              )
            })

            // console.log(parsedData)
          } else {
            console.log('No data found in the database for id = 1.')
          }
        },
        (_, error) => {
          console.error('Error fetching Blob data from SQLite:', error)
        }
      )
    })
  }, [])

  const onSend = useCallback(
    (messages = []) => {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages)
      )

      const blobData = JSON.stringify(messages)

      socket.send(JSON.stringify(messages))

      database.transaction(tx => {
        tx.executeSql(
          'INSERT INTO message (chats) VALUES (?);',
          [blobData],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              console.log(
                'Array converted to Blob and stored in SQLite successfully!'
              )
            } else {
              console.log('Failed to store Blob data in SQLite.')
            }
          },
          (_, error) => {
            console.error('Error storing Blob data in SQLite:', error)
          }
        )
      })
      // console.log(messages)
    },
    [messages]
  )

  const renderInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: '#131313',
          color: 'white',
          justifyContent: 'center',
          marginHorizontal: 20,
          borderRadius: 20
        }}
        textInputProps={{ color: 'white', marginLeft: 22 }}
        renderActions={() => (
          <View
            style={{
              height: 44,
              justifyContent: 'center',
              alignItems: 'center',
              left: 5,
              flexDirection: 'row',
              gap: 10
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
              gap: 5,
              marginLeft: 7,
              backgroundColor: 'green'
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
              width: '35%',
              gap:10,
              marginRight:4,
              // backgroundColor: 'blue'
            }}
          >
            <FontAwesome name='phone' size={24} color='black' />
            <Feather name='video' size={24} color='black' />

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

      {!messages == [] ? (
        <ImageBackground style={{ flex: 1, marginBottom: insets.bottom }}>
          <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            onInputTextChanged={setText}
            // renderAvatar={null}
            user={{
              _id: id
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
      ) : (
        <View style={{ flex: 1, width: '100%' }}>
          <LinearGradient
            colors={['#fcefc3', '#d9e5d1']}
            style={styles.background}
          />
        </View>
      )}
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
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 50
  },
  header: {
    width: '100%',
    height: 160,
    backgroundColor: '#69736a',
    alignItems: 'center',
    paddingBottom: 14
  },
  flash: {
    width: '100%',
    height: '100%',
    // alignItems:"center",
    // justifyContent:"center",
    // backgroundColor:"red",
    flex: 1
  },
  contentName: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
    // backgroundColor: 'red'
    // marginBottom:4
  },
  contentButton: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%'
  }
})
export default Message
