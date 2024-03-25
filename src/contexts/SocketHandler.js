import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '.'


const SocketContext = React.createContext()

export function useSocket() {
  return useContext(SocketContext)
}

export function SocketProvider({  children }) {
  const [socket, setSocket] = useState()
  const { id } = useContext(GlobalContext)

  useEffect(() => {
    if (id) {
      const ws = new WebSocket(`ws://192.168.133.133:8000?userName=${id}`);
      setSocket(ws);

      return () => ws.close();
    }
  }, [id]);
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}