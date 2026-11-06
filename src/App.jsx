import React, { useState } from 'react';
import {
  Heart,
  X,
  MessageCircle,
  UserRound,
  SlidersHorizontal,
  Sparkles,
  ShieldCheck,
  MapPin,
  ArrowRight,
  Settings,
  Home,
  Send,
  LogOut,
  Menu,
  Search,
  Bell,
  Check
} from 'lucide-react';

const people = [
  {
    id: 1,
    name: 'Aarav',
    age: 22,
    city: 'Pune',
    initials: 'A',
    color: '#dbeafe',
    about: 'Coffee lover, traveller and technology enthusiast.',
    interests: ['Travel', 'Music', 'Technology']
  },
  {
    id: 2,
    name: 'Mira',
    age: 21,
    city: 'Mumbai',
    initials: 'M',
    color: '#fce7f3',
    about: 'Creative person who enjoys books, art and exploring.',
    interests: ['Books', 'Art', 'Photography']
  },
  {
    id: 3,
    name: 'Ishaan',
    age: 23,
    city: 'Nashik',
    initials: 'I',
    color: '#dcfce7',
    about: 'Fitness, music and weekend adventures.',
    interests: ['Fitness', 'Music', 'Sports']
  },
  {
    id: 4,
    name: 'Anaya',
    age: 22,
    city: 'Pune',
    initials: 'A',
    color: '#fef3c7',
    about: 'Enjoys meaningful conversations and discovering new places.',
    interests: ['Food', 'Travel', 'Movies']
  }
];

const initialChats = [
  {
    id: 1,
    name: 'Mira',
    initials: 'M',
    color: '#fce7f3',
    messages: [
      {
        id: 1,
        sender: 'them',
        text: 'Hey! How is your day going?',
        time: '10:30 AM'
      },
      {
        id: 2,
        sender: 'me',
        text: 'Pretty good! How about yours?',
        time: '10:32 AM'
      },
      {
        id: 3,
        sender: 'them',
        text: 'Going well. What are your interests?',
        time: '10:34 AM'
      }
    ]
  },
  {
    id: 2,
    name: 'Aarav',
    initials: 'A',
    color: '#dbeafe',
    messages: [
      {
        id: 1,
        sender: 'them',
        text: 'Hello! Nice to connect here.',
        time: 'Yesterday'
      }
    ]
  }
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

:root {
  font-family: 'DM Sans', sans-serif;
  color: #20202b;
  background: #f8f8fc;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
}

button, input {
  font: inherit;
}

button {
  cursor: pointer;
}

.lc-app {
  min-height: 100vh;
  display: flex;
  background: #f8f8fc;
}

.lc-sidebar {
  width: 250px;
  background: #fff;
  border-right: 1px solid #ededf3;
  padding: 28px 18px;
  display: flex;
  flex-direction: column;
  position: fixed;
  inset: 0 auto 0 0;
  z-index: 10;
}

.lc-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 10px;
  margin-bottom: 42px;
}

.lc-brand-icon {
  width: 44px;
  height: 44px;
  border-radius: 15px;
  display: grid;
  place-items: center;
  color: white;
  background: linear-gradient(135deg, #fb4d79, #9b5de5);
}

.lc-brand-name {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.8px;
}

.lc-brand-name span {
  color: #ed4d80;
}

.lc-nav-label {
  padding: 0 12px;
  margin-bottom: 12px;
  color: #a1a1b2;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}

.lc-nav {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.lc-nav-item {
  width: 100%;
  padding: 13px 14px;
  border: 0;
  border-radius: 12px;
  background: transparent;
  color: #77778a;
  display: flex;
  align-items: center;
  gap: 13px;
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  transition: .2s;
}

.lc-nav-item:hover {
  background: #faf0f5;
  color: #e64e83;
}

.lc-nav-item.active {
  color: #e64e83;
  background: #fff0f5;
}

.lc-sidebar-bottom {
  margin-top: auto;
}

.lc-demo-note {
  padding: 15px;
  border: 1px solid #f1e2ec;
  background: #fff8fb;
  border-radius: 14px;
  margin-bottom: 18px;
}

.lc-demo-note strong {
  display: block;
  font-size: 12px;
  margin-bottom: 6px;
}

.lc-demo-note p {
  margin: 0;
  color: #888397;
  font-size: 11px;
  line-height: 1.6;
}

.lc-main {
  flex: 1;
  min-width: 0;
  margin-left: 250px;
  padding: 30px 42px;
}

.lc-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 34px;
}

.lc-page-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 25px;
  font-weight: 800;
  letter-spacing: -.8px;
  margin: 0;
}

.lc-page-subtitle {
  color: #9292a3;
  font-size: 13px;
  margin: 7px 0 0;
}

.lc-top-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.lc-icon-button {
  width: 42px;
  height: 42px;
  border: 1px solid #ededf3;
  background: white;
  color: #77778a;
  border-radius: 13px;
  display: grid;
  place-items: center;
}

.lc-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-weight: 800;
  color: #444;
  flex-shrink: 0;
}

.lc-content {
  max-width: 1100px;
  margin: 0 auto;
}

.lc-section-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  margin-bottom: 22px;
}

.lc-section-heading h2 {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 18px;
  margin: 0;
}

.lc-section-heading p {
  font-size: 12px;
  color: #9999a9;
  margin: 5px 0 0;
}

.lc-filter-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border: 1px solid #e9e9f0;
  border-radius: 11px;
  background: white;
  color: #666678;
  font-size: 12px;
  font-weight: 700;
}

.lc-profile-card {
  max-width: 620px;
  margin: 0 auto;
  overflow: hidden;
  background: white;
  border: 1px solid #ededf3;
  border-radius: 23px;
  box-shadow: 0 12px 40px rgba(35, 25, 60, .055);
}

.lc-profile-cover {
  height: 260px;
  display: grid;
  place-items: center;
  position: relative;
  background: linear-gradient(135deg, #fce7f3, #e9e7ff);
}

.lc-profile-initial {
  width: 125px;
  height: 125px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 65px;
  font-weight: 800;
  color: #5e5275;
  border: 7px solid rgba(255,255,255,.8);
  box-shadow: 0 10px 35px rgba(60,40,90,.1);
}

.lc-sample-label {
  position: absolute;
  top: 18px;
  left: 18px;
  background: rgba(255,255,255,.9);
  padding: 7px 11px;
  border-radius: 30px;
  color: #777;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: .6px;
}

.lc-profile-body {
  padding: 24px;
}

.lc-profile-name-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.lc-profile-name {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 24px;
  font-weight: 800;
  margin: 0;
}

.lc-profile-location {
  color: #9292a3;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 8px;
}

.lc-profile-about {
  color: #666678;
  font-size: 13px;
  line-height: 1.7;
  margin: 20px 0;
}

.lc-interest-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.lc-interest {
  background: #f7f4fa;
  color: #777087;
  padding: 8px 12px;
  border-radius: 30px;
  font-size: 11px;
  font-weight: 700;
}

.lc-card-actions {
  display: flex;
  justify-content: center;
  gap: 18px;
  padding: 20px 0 4px;
}

.lc-action-button {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  border: 1px solid #ededf3;
  background: white;
  display: grid;
  place-items: center;
  color: #8b8b9b;
  transition: .2s;
}

.lc-action-button.pass:hover {
  color: #f05b73;
  background: #fff0f2;
  border-color: #f8d1d9;
}

.lc-action-button.like {
  width: 62px;
  height: 62px;
  border: 0;
  color: white;
  background: linear-gradient(135deg, #fb5680, #e84d9b);
  box-shadow: 0 8px 20px rgba(232,77,130,.22);
}

.lc-action-button.like:hover {
  transform: translateY(-3px);
}

.lc-empty {
  max-width: 620px;
  margin: 30px auto;
  padding: 50px 25px;
  text-align: center;
  background: white;
  border: 1px solid #ededf3;
  border-radius: 20px;
}

.lc-empty-icon {
  width: 60px;
  height: 60px;
  border-radius: 20px;
  display: grid;
  place-items: center;
  margin: 0 auto 18px;
  color: #e84d83;
  background: #fff0f5;
}

.lc-empty h3 {
  margin: 0 0 8px;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.lc-empty p {
  color: #9292a3;
  font-size: 13px;
  line-height: 1.6;
}

.lc-primary-button {
  border: 0;
  border-radius: 11px;
  padding: 12px 20px;
  color: white;
  background: linear-gradient(135deg, #fb5680, #e84d9b);
  font-weight: 700;
  font-size: 13px;
}

.lc-chat-layout {
  display: grid;
  grid-template-columns: 290px minmax(0, 1fr);
  min-height: 550px;
  background: white;
  border: 1px solid #ededf3;
  border-radius: 18px;
  overflow: hidden;
}

.lc-chat-list {
  border-right: 1px solid #ededf3;
}

.lc-chat-list-title {
  padding: 20px;
  border-bottom: 1px solid #f0f0f4;
  font-weight: 800;
  font-size: 14px;
}

.lc-chat-person {
  width: 100%;
  border: 0;
  background: white;
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: left;
}

.lc-chat-person:hover,
.lc-chat-person.active {
  background: #fff5f8;
}

.lc-chat-person strong {
  display: block;
  font-size: 13px;
}

.lc-chat-person small {
  display: block;
  color: #9999a9;
  font-size: 11px;
  margin-top: 5px;
}

.lc-chat-window {
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.lc-chat-header {
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f4;
  display: flex;
  align-items: center;
  gap: 12px;
}

.lc-chat-header strong {
  font-size: 13px;
}

.lc-chat-header small {
  display: block;
  color: #9999a9;
  font-size: 10px;
  margin-top: 4px;
}

.lc-chat-messages {
  flex: 1;
  min-height: 330px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 13px;
  overflow-y: auto;
}

.lc-message {
  max-width: 75%;
  padding: 11px 14px;
  border-radius: 14px;
  font-size: 12px;
  line-height: 1.6;
}

.lc-message.them {
  align-self: flex-start;
  background: #f3f2f7;
  color: #555;
  border-bottom-left-radius: 4px;
}

.lc-message.me {
  align-self: flex-end;
  background: #fce8f0;
  color: #9d4165;
  border-bottom-right-radius: 4px;
}

.lc-message-time {
  display: block;
  margin-top: 5px;
  font-size: 9px;
  opacity: .65;
  text-align: right;
}

.lc-chat-input {
  padding: 15px;
  border-top: 1px solid #f0f0f4;
  display: flex;
  gap: 10px;
}

.lc-chat-input input {
  min-width: 0;
  flex: 1;
  border: 1px solid #ededf3;
  border-radius: 12px;
  padding: 12px;
  outline: none;
  font-size: 12px;
}

.lc-chat-input input:focus {
  border-color: #ee8aaa;
}

.lc-send-button {
  width: 44px;
  border: 0;
  border-radius: 12px;
  background: #ed5286;
  color: white;
  display: grid;
  place-items: center;
}

.lc-notice {
  position: fixed;
  bottom: 24px;
  right: 24px;
  max-width: 320px;
  padding: 13px 18px;
  background: #242333;
  color: white;
  border-radius: 12px;
  font-size: 12px;
  box-shadow: 0 8px 25px rgba(0,0,0,.15);
  z-index: 50;
}

.lc-info-card {
  max-width: 700px;
  padding: 28px;
  border: 1px solid #ededf3;
  border-radius: 18px;
  background: white;
}

.lc-info-card h2 {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 19px;
}

.lc-info-card p {
  color: #77778a;
  font-size: 13px;
  line-height: 1.8;
}

.lc-footer {
  text-align: center;
  color: #aaa9b8;
  font-size: 10px;
  padding: 35px 0 10px;
}

@media (max-width: 900px) {
  .lc-sidebar {
    width: 210px;
  }

  .lc-main {
    margin-left: 210px;
    padding: 25px;
  }
}

@media (max-width: 650px) {
  .lc-sidebar {
    width: 100%;
    height: 68px;
    top: auto;
    bottom: 0;
    padding: 7px 8px;
    border-right: 0;
    border-top: 1px solid #ededf3;
    flex-direction: row;
    justify-content: space-around;
  }

  .lc-brand,
  .lc-nav-label,
  .lc-sidebar-bottom {
    display: none;
  }

  .lc-nav {
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
    gap: 2px;
  }

  .lc-nav-item {
    width: auto;
    min-width: 58px;
    padding: 9px 7px;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
    font-size: 9px;
  }

  .lc-main {
    margin-left: 0;
    padding: 22px 14px 90px;
  }

  .lc-topbar {
    margin-bottom: 25px;
  }

  .lc-page-title {
    font-size: 21px;
  }

  .lc-profile-cover {
    height: 220px;
  }

  .lc-profile-body {
    padding: 19px;
  }

  .lc-chat-layout {
    grid-template-columns: 1fr;
  }

  .lc-chat-list {
    display: flex;
    overflow-x: auto;
    border-right: 0;
    border-bottom: 1px solid #ededf3;
  }

  .lc-chat-list-title {
    display: none;
  }

  .lc-chat-person {
    min-width: 120px;
    flex-direction: column;
    text-align: center;
    gap: 7px;
  }

  .lc-chat-messages {
    min-height: 280px;
  }

  .lc-notice {
    bottom: 82px;
    right: 12px;
    left: 12px;
    max-width: none;
  }
}
`;export default function App() {
  const [tab, setTab] = useState('Discover');
  const [seen, setSeen] = useState([]);
  const [liked, setLiked] = useState([]);
  const [chats, setChats] = useState(initialChats);
  const [activeChat, setActiveChat] = useState(1);
  const [messageText, setMessageText] = useState('');
  const [notice, setNotice] = useState('');

  const remainingPeople = people.filter(
    person => !seen.includes(person.id)
  );

  const currentPerson = remainingPeople[0];
  const currentChat = chats.find(
    chat => chat.id === activeChat
  );

  const showNotice = (message) => {
    setNotice(message);
    window.setTimeout(() => setNotice(''), 2500);
  };

  const handleProfileAction = (action) => {
    if (!currentPerson) return;

    if (action === 'like') {
      setLiked(previous =>
        previous.includes(currentPerson.id)
          ? previous
          : [...previous, currentPerson.id]
      );

      showNotice('Added to your demo likes.');
    } else {
      showNotice('Profile skipped.');
    }

    setSeen(previous => [...previous, currentPerson.id]);
  };

  const resetDiscover = () => {
    setSeen([]);
    showNotice('Sample profiles restarted.');
  };

  const sendMessage = (event) => {
    event.preventDefault();

    const text = messageText.trim();

    if (!text || !currentChat) return;

    const updatedChats = chats.map(chat => {
      if (chat.id !== activeChat) return chat;

      return {
        ...chat,
        messages: [
          ...chat.messages,
          {
            id: Date.now(),
            sender: 'me',
            text,
            time: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })
          }
        ]
      };
    });

    setChats(updatedChats);
    setMessageText('');

    try {
      localStorage.setItem(
        'loveconnect-demo-chats-v2',
        JSON.stringify(updatedChats)
      );
    } catch {
      showNotice('Message added for this session only.');
    }
  };

  const navigation = [
    { name: 'Discover', icon: Home },
    { name: 'Matches', icon: Heart },
    { name: 'Messages', icon: MessageCircle },
    { name: 'Profile', icon: UserRound }
  ];

  const pageDescriptions = {
    Discover: 'Explore fictional sample profiles.',
    Matches: 'Profiles you liked in this demo.',
    Messages: 'Your sample conversations.',
    Profile: 'Your demo profile information.',
    Settings: 'Prototype settings and information.'
  };

  const Brand = () => (
    <div className="lc-brand">
      <div className="lc-brand-icon">
        <Heart size={23} fill="white" />
      </div>
      <div className="lc-brand-name">
        Love<span>Connect</span>
      </div>
    </div>
  );

  const ProfileCard = ({ person, showActions = true }) => (
    <div className="lc-profile-card">
      <div
        className="lc-profile-cover"
        style={{
          background: `linear-gradient(135deg, ${person.color}, #eee8ff)`
        }}
      >
        <div className="lc-sample-label">
          SAMPLE PROFILE
        </div>

        <div
          className="lc-profile-initial"
          style={{ background: person.color }}
        >
          {person.initials}
        </div>
      </div>

      <div className="lc-profile-body">
        <div className="lc-profile-name-row">
          <h2 className="lc-profile-name">
            {person.name}, {person.age}
          </h2>

          <ShieldCheck
            color="#e84d83"
            size={22}
          />
        </div>

        <div className="lc-profile-location">
          <MapPin size={14} />
          {person.city}
        </div>

        <p className="lc-profile-about">
          {person.about}
        </p>

        <div className="lc-interest-list">
          {person.interests.map(interest => (
            <span className="lc-interest" key={interest}>
              {interest}
            </span>
          ))}
        </div>

        {showActions && (
          <div className="lc-card-actions">
            <button
              className="lc-action-button pass"
              onClick={() => handleProfileAction('pass')}
              aria-label="Skip profile"
            >
              <X size={25} />
            </button>

            <button
              className="lc-action-button like"
              onClick={() => handleProfileAction('like')}
              aria-label="Like profile"
            >
              <Heart size={25} fill="white" />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <style>{CSS}</style>

      <div className="lc-app">
        <aside className="lc-sidebar">
          <Brand />

          <div className="lc-nav-label">
            MENU
          </div>

          <nav className="lc-nav">
            {navigation.map(item => {
              const Icon = item.icon;

              return (
                <button
                  key={item.name}
                  className={`lc-nav-item ${
                    tab === item.name ? 'active' : ''
                  }`}
                  onClick={() => setTab(item.name)}
                >
                  <Icon size={19} />
                  {item.name}
                </button>
              );
            })}
          </nav>

          <div className="lc-sidebar-bottom">
            <div className="lc-demo-note">
              <strong>
                <ShieldCheck
                  size={14}
                  style={{ verticalAlign: 'middle' }}
                />{' '}
                Demo Environment
              </strong>

              <p>
                Fictional profiles and local sample conversations.
                No real users or external messaging.
              </p>
            </div>

            <button
              className={`lc-nav-item ${
                tab === 'Settings' ? 'active' : ''
              }`}
              onClick={() => setTab('Settings')}
            >
              <Settings size={19} />
              Settings
            </button>
          </div>
        </aside>

        <main className="lc-main">
          <header className="lc-topbar">
            <div>
              <h1 className="lc-page-title">
                {tab}
              </h1>

              <p className="lc-page-subtitle">
                {pageDescriptions[tab]}
              </p>
            </div>

            <div className="lc-top-actions">
              <button
                className="lc-icon-button"
                title="Demo notifications"
                onClick={() =>
                  showNotice('No new demo notifications.')
                }
              >
                <Bell size={18} />
              </button>

              <div
                className="lc-avatar"
                style={{ background: '#fce7f3' }}
              >
                V
              </div>
            </div>
          </header>

          <div className="lc-content">

            {tab === 'Discover' && (
              <>
                <div className="lc-section-heading">
                  <div>
                    <h2>Discover people</h2>
                    <p>
                      Sample profiles for UI demonstration
                    </p>
                  </div>

                  <button
                    className="lc-filter-button"
                    onClick={() =>
                      showNotice('Filters are not enabled in this demo.')
                    }
                  >
                    <SlidersHorizontal size={15} />
                    Filters
                  </button>
                </div>

                {currentPerson ? (
                  <ProfileCard person={currentPerson} />
                ) : (
                  <div className="lc-empty">
                    <div className="lc-empty-icon">
                      <Sparkles size={27} />
                    </div>

                    <h3>You've viewed all profiles</h3>

                    <p>
                      You have reached the end of the fictional
                      sample profiles.
                    </p>

                    <button
                      className="lc-primary-button"
                      onClick={resetDiscover}
                    >
                      Explore Again
                    </button>
                  </div>
                )}
              </>
            )}

            {tab === 'Matches' && (
              <>
                <div className="lc-section-heading">
                  <div>
                    <h2>Your demo likes</h2>
                    <p>
                      {liked.length} fictional profile(s) liked
                    </p>
                  </div>
                </div>

                {liked.length > 0 ? (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns:
                        'repeat(auto-fit, minmax(260px, 1fr))',
                      gap: 20
                    }}
                  >
                    {people
                      .filter(person => liked.includes(person.id))
                      .map(person => (
                        <ProfileCard
                          key={person.id}
                          person={person}
                          showActions={false}
                        />
                      ))}
                  </div>
                ) : (
                  <div className="lc-empty">
                    <div className="lc-empty-icon">
                      <Heart size={27} />
                    </div>

                    <h3>No demo likes yet</h3>

                    <p>
                      Visit Discover and use the like button
                      on a sample profile.
                    </p>

                    <button
                      className="lc-primary-button"
                      onClick={() => setTab('Discover')}
                    >
                      Discover Profiles
                    </button>
                  </div>
                )}
              </>
            )}

            {tab === 'Messages' && (
              <>
                <div className="lc-section-heading">
                  <div>
                    <h2>Sample Inbox</h2>
                    <p>
                      Fictional conversations stored in this browser
                    </p>
                  </div>
                </div>

                <div className="lc-chat-layout">
                  <div className="lc-chat-list">
                    <div className="lc-chat-list-title">
                      Conversations
                    </div>

                    {chats.map(chat => (
                      <button
                        key={chat.id}
                        className={`lc-chat-person ${
                          activeChat === chat.id ? 'active' : ''
                        }`}
                        onClick={() => setActiveChat(chat.id)}
                      >
                        <div
                          className="lc-avatar"
                          style={{ background: chat.color }}
                        >
                          {chat.initials}
                        </div>

                        <div>
                          <strong>{chat.name}</strong>
                          <small>
                            {chat.messages[
                              chat.messages.length - 1
                            ]?.text || 'No messages'}
                          </small>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="lc-chat-window">
                    {currentChat ? (
                      <>
                        <div className="lc-chat-header">
                          <div
                            className="lc-avatar"
                            style={{
                              background: currentChat.color
                            }}
                          >
                            {currentChat.initials}
                          </div>

                          <div>
                            <strong>{currentChat.name}</strong>
                            <small>
                              Fictional demo conversation
                            </small>
                          </div>
                        </div>

                        <div className="lc-chat-messages">
                          {currentChat.messages.map(message => (
                            <div
                              key={message.id}
                              className={`lc-message ${message.sender}`}
                            >
                              {message.text}

                              <span className="lc-message-time">
                                {message.time}
                              </span>
                            </div>
                          ))}
                        </div>

                        <form
                          className="lc-chat-input"
                          onSubmit={sendMessage}
                        >
                          <input
                            type="text"
                            placeholder="Write a demo message..."
                            value={messageText}
                            onChange={event =>
                              setMessageText(event.target.value)
                            }
                          />

                          <button
                            className="lc-send-button"
                            type="submit"
                            aria-label="Send demo message"
                          >
                            <Send size={17} />
                          </button>
                        </form>
                      </>
                    ) : (
                      <div className="lc-empty">
                        Select a conversation.
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {tab === 'Profile' && (
              <div className="lc-info-card">
                <div
                  className="lc-avatar"
                  style={{
                    background: '#fce7f3',
                    width: 70,
                    height: 70,
                    fontSize: 25
                  }}
                >
                  V
                </div>

                <h2>My Demo Profile</h2>

                <p>
                  Welcome to the LoveConnect educational UI prototype.
                  This is a sample profile used to demonstrate the
                  interface.
                </p>

                <p>
                  <strong>Profile status:</strong> Demo only
                </p>

                <p>
                  <strong>Account:</strong> No real account created
                </p>

                <button
                  className="lc-primary-button"
                  onClick={() =>
                    showNotice('Profile editing is not enabled.')
                  }
                >
                  Edit Profile
                </button>
              </div>
            )}

            {tab === 'Settings' && (
              <div className="lc-info-card">
                <h2>Settings</h2>

                <p>
                  LoveConnect is currently an educational front-end
                  prototype.
                </p>

                <p>
                  <strong>Data:</strong> Fictional sample data only.
                </p>

                <p>
                  <strong>Messages:</strong> Stored locally in this
                  browser for the demo.
                </p>

                <p>
                  <strong>External services:</strong> No real user
                  messaging or matching is enabled.
                </p>

                <button
                  className="lc-primary-button"
                  onClick={() => setTab('Discover')}
                >
                  Back to Discover
                </button>
              </div>
            )}

          </div>

          <footer className="lc-footer">
            LoveConnect · Educational UI Prototype · Fictional Sample Data
          </footer>
        </main>
      </div>

      {notice && (
        <div className="lc-notice">
          {notice}
        </div>
      )}
    </>
  );
}