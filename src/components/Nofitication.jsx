import React, { useState, useEffect } from "react";
import "./Notification.css";

// Notification Component
const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const sseId = 'test'
  
  useEffect(() => {
    try{
      // EventSource로 서버와 연결
      const eventSource = new EventSource(`${process.env.REACT_APP_BASE_URL}/sse/connect/${sseId}`);
      
      eventSource.addEventListener("MESSAGE", (event) => {
        const newNotification = {
          id: Date.now(),
          message: event.data, // 서버로부터 받은 메시지
        };
        setNotifications((prev) => [...prev, newNotification]);
      });
      
      eventSource.addEventListener("INIT", (event) => {
        console.dir(event);
      });

      eventSource.onerror = (error) => {
        console.dir(error);
      }
      
      // 정리(cleanup) 함수
      return () => {
        eventSource.close();
      };
    } catch(err) {
      console.dir(err);
    }
  }, []);

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  return (
    <div className="notification-container">
      {notifications.map((notification) => (
        <div key={notification.id} className="notification">
          <span>{notification.message}</span>
          <button className="close-btn" onClick={() => removeNotification(notification.id)}>
            X
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notification;

// CSS 스타일링 예제 (Notification.css)

// App.js에서 Notification을 렌더링 후 서버로부터 메시지를 수신하여 알림 테스트 가능
