import React, { useState } from 'react';
import {
  Heart, X, MessageCircle, UserRound, SlidersHorizontal,
  Sparkles, ShieldCheck, MapPin, ArrowRight, Settings, Home
} from 'lucide-react';

const people = [
  {
    name: 'Aarav',
    age: 22,
    city: 'Pune',
    about: 'Coffee, weekend hikes and discovering new music.',
    interests: ['Music', 'Travel', 'Coffee'],
    color: 'linear-gradient(145deg,#b9a3f5,#f3c9df)',
    initials: 'A'
  },
  {
    name: 'Mira',
    age: 23,
    city: 'Mumbai',
    about: 'Bookstores, art galleries and long conversations.',
    interests: ['Art', 'Books', 'Food'],
    color: 'linear-gradient(145deg,#f5b8d0,#c8b8f6)',
    initials: 'M'
  },
  {
    name: 'Ishaan',
    age: 24,
    city: 'Nashik',
    about: 'Learning new things and exploring local cafes.',
    interests: ['Tech', 'Movies', 'Cafes'],
    color: 'linear-gradient(145deg,#a9d6ee,#c9b9f3)',
    initials: 'I'
  }
];

const STORAGE_KEY = 'loveconnect-demo-actions-v1';
const CHAT_STORAGE_KEY = 'loveconnect-demo-chats-v1';

const sampleChats = [
  {
    id: 'aarav',
    name: 'Aarav',
    initials: 'A',
    color: 'linear-gradient(145deg,#b9a3f5,#f3c9df)',
    messages: [
      { id: 1, sender: 'them', text: 'Hi! How is your project going?' },
      { id: 2, sender: 'me', text: 'It is going well. Working on the UI.' },
      { id: 3, sender: 'them', text: 'That sounds good!' }
    ]
  },
  {
    id: 'mira',
    name: 'Mira',
    initials: 'M',
    color: 'linear-gradient(145deg,#f5b8d0,#c8b8f6)',
    messages: [
      { id: 1, sender: 'them', text: 'Did you find the notes?' },
      { id: 2, sender: 'me', text: 'Yes, I found them. Thanks!' }
    ]
  },
  {
    id: 'ishaan',
    name: 'Ishaan',
    initials: 'I',
    color: 'linear-gradient(145deg,#a9d6ee,#c9b9f3)',
    messages: [
      { id: 1, sender: 'them', text: 'Have you checked the new resources?' }
    ]
  }
];

function loadSavedData() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return {
      liked: Array.isArray(data?.liked) ? data.liked : [],
      seen: Array.isArray(data?.seen) ? data.seen : []
    };
  } catch {
    return { liked: [], seen: [] };
  }
}

function loadChats() {
  try {
    const data = JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY));
    return Array.isArray(data) ? data : sampleChats;
  } catch {
    return sampleChats;
  }
}

const styles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700&display=swap');

* { box-sizing: border-box; }

body {
  margin: 0;
  font-family: 'DM Sans', sans-serif;
  color: #29243a;
}

button, input { font: inherit; }
button { cursor: pointer; }

.lc-auth {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px;
  background:
    radial-gradient(circle at 15% 15%,#f0e6ff 0,transparent 35%),
    radial-gradient(circle at 90% 85%,#fce3ed 0,transparent 32%),
    #f8f6fc;
}

.lc-card {
  width: 100%;
  max-width: 470px;
  background: rgba(255,255,255,.94);
  border: 1px solid #eee8f5;
  border-radius: 27px;
  padding: 42px;
  box-shadow: 0 24px 75px rgba(57,35,91,.10);
}

.lc-brand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 11px;
  margin-bottom: 34px;
}

.lc-brand-icon {
  width: 44px;
  height: 44px;
  border-radius: 15px;
  display: grid;
  place-items: center;
  color: white;
  background: linear-gradient(135deg,#7854d8,#c16cba);
  box-shadow: 0 8px 20px #a78bd766;
}

.lc-brand-name {
  font-size: 21px;
  font-weight: 800;
  letter-spacing: -.8px;
}

.lc-brand-name span { color: #8b63d5; }

.lc-eyebrow {
  text-align: center;
  color: #9277c5;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.lc-title {
  font-family: 'Playfair Display',serif;
  font-size: 35px;
  line-height: 1.2;
  text-align: center;
  margin: 12px 0;
  letter-spacing: -.6px;
}

.lc-subtitle {
  text-align: center;
  color: #898397;
  font-size: 14px;
  line-height: 1.7;
  margin: 0 auto 27px;
  max-width: 330px;
}

.lc-feature {
  padding: 20px;
  border: 1px solid #eee8f5;
  border-radius: 18px;
  background: linear-gradient(135deg,#fbf9ff,#fff8fc);
  display: flex;
  gap: 15px;
  align-items: flex-start;
  margin: 24px 0;
}

.lc-feature-icon {
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 13px;
  background: #eee7fb;
  color: #7954c8;
}

.lc-feature h3 { margin: 1px 0 5px; font-size: 14px; }
.lc-feature p { margin: 0; color: #898397; font-size: 12px; line-height: 1.6; }

.lc-check {
  display: flex;
  gap: 11px;
  align-items: flex-start;
  font-size: 13px;
  line-height: 1.6;
  color: #5f596e;
  margin: 22px 0;
}

.lc-check input {
  width: 17px;
  height: 17px;
  accent-color: #8059d4;
  margin-top: 2px;
  flex-shrink: 0;
}

.lc-primary {
  width: 100%;
  border: 0;
  border-radius: 14px;
  padding: 15px 18px;
  background: linear-gradient(110deg,#7956d5,#a75ebd);
  color: white;
  font-weight: 700;
  font-size: 14px;
  box-shadow: 0 9px 22px #8e63ce3d;
  transition: .2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
}

.lc-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 13px 25px #8e63ce55;
}

.lc-primary:disabled {
  opacity: .45;
  cursor: not-allowed;
  transform: none;
}

.lc-footnote {
  text-align: center;
  color: #aaa4b3;
  font-size: 10px;
  line-height: 1.7;
  margin: 20px 0 0;
}

.lc-input {
  width: 100%;
  border: 1px solid #e9e4ef;
  border-radius: 12px;
  padding: 14px 15px;
  margin-bottom: 12px;
  outline: none;
  background: #fff;
  color: #29243a;
}

.lc-input:focus {
  border-color: #a68bdd;
  box-shadow: 0 0 0 3px #a68bdd20;
}

.lc-tabs {
  display: flex;
  padding: 4px;
  background: #f5f1fa;
  border-radius: 12px;
  margin-bottom: 22px;
}

.lc-tabs button {
  flex: 1;
  border: 0;
  padding: 11px;
  background: transparent;
  border-radius: 9px;
  color: #8a8497;
  font-size: 13px;
  font-weight: 700;
}

.lc-tabs button.selected {
  background: white;
  color: #7654c8;
  box-shadow: 0 2px 8px #30204412;
}

/* Dashboard */

.lc-app {
  min-height: 100vh;
  background: #faf9fc;
  display: flex;
}

.lc-sidebar {
  width: 250px;
  flex-shrink: 0;
  background: white;
  border-right: 1px solid #eeeaf3;
  padding: 27px 19px;
  display: flex;
  flex-direction: column;
}

.lc-sidebar .lc-brand {
  justify-content: flex-start;
  padding: 0 9px;
  margin-bottom: 45px;
}

.lc-nav-label {
  color: #aaa4b3;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.5px;
  padding: 0 12px;
  margin-bottom: 13px;
}

.lc-nav {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 13px 14px;
  border: 0;
  background: transparent;
  color: #817b8e;
  border-radius: 12px;
  text-align: left;
  width: 100%;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 5px;
  transition: .2s;
}

.lc-nav:hover { background: #f7f3fc; color: #7956cf; }
.lc-nav.active { color: #7956cf; background: #f2edfb; }

.lc-nav svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.lc-side-bottom { margin-top: auto; }

.lc-safety {
  display: flex;
  gap: 11px;
  padding: 15px;
  background: #f7f4fc;
  border-radius: 13px;
  color: #7956cf;
  margin-bottom: 18px;
}

.lc-safety b {
  display: block;
  font-size: 12px;
  color: #44375d;
}

.lc-safety small {
  display: block;
  font-size: 10px;
  color: #9a92a8;
  margin-top: 4px;
}

.lc-main {
  flex: 1;
  min-width: 0;
  padding: 32px 5%;
}

.lc-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 34px;
  gap: 15px;
}

.lc-kicker {
  color: #9679c6;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.8px;
}

.lc-page-title {
  font-size: 27px;
  letter-spacing: -1px;
  margin: 7px 0 0;
}

.lc-filter {
  border: 1px solid #e9e4ef;
  background: white;
  padding: 11px 16px;
  border-radius: 11px;
  display: flex;
  gap: 8px;
  align-items: center;
  color: #6d6679;
  font-size: 12px;
}

.lc-layout {
  display: grid;
  grid-template-columns: minmax(230px,1fr) minmax(280px,390px) minmax(180px,.7fr);
  gap: 28px;
  align-items: center;
  max-width: 1120px;
  margin: 0 auto;
}

.lc-intro .lc-pill {
  display: inline-flex;
  gap: 7px;
  align-items: center;
  padding: 8px 12px;
  border-radius: 30px;
  background: #f0eafb;
  color: #7956cf;
  font-size: 11px;
  font-weight: 700;
}

.lc-intro h2 {
  font-family: 'Playfair Display',serif;
  font-size: 39px;
  line-height: 1.2;
  letter-spacing: -.8px;
  margin: 22px 0 13px;
}

.lc-intro h2 em { color: #9365ca; font-weight: 600; }

.lc-intro p {
  font-size: 13px;
  color: #928b9c;
  line-height: 1.8;
}

.lc-profile {
  overflow: hidden;
  background: white;
  border: 1px solid #eeeaf3;
  border-radius: 22px;
  box-shadow: 0 16px 45px #38225312;
}

.lc-photo {
  height: 340px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lc-avatar {
  width: 125px;
  height: 125px;
  border-radius: 50%;
  background: #ffffff70;
  border: 5px solid #ffffff85;
  display: grid;
  place-items: center;
  color: #fff;
  font-size: 58px;
  font-weight: 800;
  text-shadow: 0 2px 12px #4b3a6650;
}

.lc-tag {
  position: absolute;
  top: 17px;
  left: 17px;
  background: #ffffffdc;
  color: #7156a4;
  padding: 7px 10px;
  border-radius: 8px;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 1px;
}

.lc-person {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 45px 20px 18px;
  color: white;
  background: linear-gradient(transparent,#30223c9c);
}

.lc-person h2 { margin: 0 0 7px; font-size: 24px; }

.lc-person span {
  display: flex;
  gap: 5px;
  align-items: center;
  font-size: 12px;
}

.lc-info { padding: 20px; }

.lc-info p {
  color: #777184;
  font-size: 12px;
  line-height: 1.7;
  margin: 0 0 14px;
}

.lc-tags { display: flex; flex-wrap: wrap; gap: 7px; }

.lc-tags span {
  padding: 7px 10px;
  border-radius: 20px;
  background: #f5f1fa;
  color: #7a64a2;
  font-size: 10px;
  font-weight: 600;
}

.lc-actions {
  display: flex;
  justify-content: center;
  gap: 18px;
  margin-top: 20px;
}

.lc-action {
  width: 49px;
  height: 49px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: white;
  border: 1px solid #eee7f4;
  color: #8d70c6;
  box-shadow: 0 4px 14px #39204d0b;
}

.lc-action.like {
  background: linear-gradient(135deg,#815bd8,#b465bd);
  color: white;
  border: 0;
}

.lc-notice {
  display: block;
  text-align: center;
  color: #8c69bd;
  font-size: 11px;
  margin-top: 12px;
}

.lc-side-note {
  padding: 19px;
  border: 1px solid #eee8f4;
  background: white;
  border-radius: 17px;
}

.lc-side-note .icon {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background: #f1ebfa;
  color: #805bc9;
  display: grid;
  place-items: center;
  margin-bottom: 13px;
}

.lc-side-note b { font-size: 13px; }

.lc-side-note p {
  color: #948d9e;
  font-size: 11px;
  line-height: 1.7;
  margin-bottom: 0;
}

.lc-placeholder {
  max-width: 850px;
  margin: 65px auto;
  text-align: center;
  background: white;
  border: 1px solid #eeeaf3;
  border-radius: 22px;
  padding: 45px 25px;
}

.lc-placeholder-icon {
  width: 60px;
  height: 60px;
  margin: auto;
  border-radius: 18px;
  background: #f0eafb;
  color: #805bc9;
  display: grid;
  place-items: center;
}

.lc-placeholder h2 {
  font-family: 'Playfair Display',serif;
  font-size: 27px;
  margin: 18px 0 8px;
}

.lc-placeholder p {
  color: #918a9b;
  font-size: 13px;
  line-height: 1.7;
}

.lc-footer {
  text-align: center;
  color: #aaa3b1;
  font-size: 10px;
  margin: 55px 0 10px;
}

.lc-footer span { padding: 0 7px; color: #c3a5db; }

.lc-back {
  margin-top: 20px;
  max-width: 210px;
  margin-left: auto;
  margin-right: auto;
}

.lc-liked-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(220px,1fr));
  gap: 20px;
  margin-top: 25px;
  text-align: left;
}

.lc-liked-grid .lc-profile .lc-photo { height: 230px; }

/* Messages */

.lc-chat-layout {
  display: grid;
  grid-template-columns: 280px minmax(0,1fr);
  height: 620px;
  max-width: 1100px;
  margin: 0 auto;
  background: white;
  border: 1px solid #eeeaf3;
  border-radius: 20px;
  overflow: hidden;
}

.lc-chat-list {
  border-right: 1px solid #eeeaf3;
  overflow-y: auto;
}

.lc-chat-list h3 {
  padding: 20px;
  margin: 0;
  font-size: 16px;
}

.lc-chat-contact {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 15px;
  border: 0;
  background: white;
  text-align: left;
  border-top: 1px solid #f3eff6;
}

.lc-chat-contact.active,
.lc-chat-contact:hover {
  background: #f6f1fc;
}

.lc-chat-avatar {
  width: 43px;
  height: 43px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: white;
  font-weight: 800;
  flex-shrink: 0;
}

.lc-chat-contact b {
  display: block;
  font-size: 13px;
  color: #383044;
}

.lc-chat-contact small {
  display: block;
  color: #9991a3;
  font-size: 11px;
  margin-top: 5px;
}

.lc-chat-window {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.lc-chat-header {
  padding: 16px 20px;
  border-bottom: 1px solid #eeeaf3;
  display: flex;
  align-items: center;
  gap: 12px;
}

.lc-chat-header b { font-size: 14px; }

.lc-chat-header small {
  display: block;
  color: #9a93a3;
  font-size: 11px;
  margin-top: 4px;
}

.lc-chat-messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #fcfbfd;
}

.lc-message {
  max-width: 75%;
  padding: 11px 14px;
  border-radius: 15px;
  font-size: 13px;
  line-height: 1.6;
  overflow-wrap: anywhere;
}

.lc-message.received {
  align-self: flex-start;
  background: #f0ebf7;
  color: #514663;
  border-bottom-left-radius: 4px;
}

.lc-message.sent {
  align-self: flex-end;
  background: linear-gradient(120deg,#7956d5,#a75ebd);
  color: white;
  border-bottom-right-radius: 4px;
}

.lc-chat-input-area {
  padding: 14px;
  display: flex;
  gap: 10px;
  border-top: 1px solid #eeeaf3;
}

.lc-chat-input-area input {
  flex: 1;
  min-width: 0;
  border: 1px solid #e9e4ef;
  border-radius: 12px;
  padding: 12px;
  outline: none;
}

.lc-chat-input-area button {
  border: 0;
  border-radius: 12px;
  background: #8059d4;
  color: white;
  padding: 0 17px;
  font-weight: 700;
}

.lc-chat-empty {
  margin: auto;
  text-align: center;
  color: #9991a3;
  font-size: 13px;
}

@media(max-width:1050px) {
  .lc-layout {
    grid-template-columns: 1fr minmax(280px,390px);
  }

  .lc-side-note { grid-column: 1/-1; }
}

@media(max-width:700px) {
  .lc-card { padding: 30px 23px; border-radius: 22px; }
  .lc-title { font-size: 30px; }

  .lc-sidebar {
    width: 72px;
    min-width: 72px;
    flex-shrink: 0;
    padding: 20px 8px;
  }

  .lc-sidebar .lc-brand {
    padding: 0;
    justify-content: center;
    margin-bottom: 32px;
  }

  .lc-brand-name,
  .lc-nav-label { display: none; }

  .lc-sidebar .lc-nav {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0;
    padding: 14px 5px;
    font-size: 0;
    min-height: 48px;
  }

  .lc-sidebar .lc-nav svg {
    display: block;
    width: 21px;
    height: 21px;
  }

  .lc-sidebar .lc-nav.active { font-size: 0; }
  .lc-safety { display: none; }

  .lc-main { padding: 23px 15px; }
  .lc-topbar { margin-bottom: 24px; }
  .lc-page-title { font-size: 22px; }

  .lc-layout {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 20px;
  }

  .lc-intro h2 {
    font-size: 32px;
    margin: 15px 0 8px;
  }

  .lc-photo { height: 300px; }
  .lc-side-note { order: 3; }

  .lc-chat-layout {
    grid-template-columns: 105px minmax(0,1fr);
    height: 600px;
  }

  .lc-chat-contact {
    flex-direction: column;
    text-align: center;
    padding: 13px 5px;
    gap: 6px;
  }

  .lc-chat-contact small { display: none; }

  .lc-chat-list h3 {
    font-size: 12px;
    padding: 15px 5px;
    text-align: center;
  }

  .lc-chat-header { padding: 13px 10px; }
  .lc-chat-messages { padding: 12px 8px; }

  .lc-message {
    max-width: 90%;
    font-size: 12px;
  }

  .lc-chat-input-area {
    padding: 9px;
    gap: 5px;
  }

  .lc-chat-input-area input {
    padding: 10px 7px;
    font-size: 12px;
  }

  .lc-chat-input-area button {
    padding: 0 10px;
    font-size: 12px;
  }
}

@media(max-width:380px) {
  .lc-sidebar {
    width: 60px;
    min-width: 60px;
    padding-left: 5px;
    padding-right: 5px;
  }

  .lc-main { padding: 18px 10px; }
  .lc-filter { padding: 9px; }
}
`;export default function App() {
  const [eligible, setEligible] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [tab, setTab] = useState('Discover');
  const [notice, setNotice] = useState('');
  const [saved, setSaved] = useState(loadSavedData);

  // Demo messaging state
  const [chats, setChats] = useState(loadChats);
  const [activeChat, setActiveChat] = useState('aarav');
  const [messageText, setMessageText] = useState('');

  const remaining = people.filter(
    p => !saved.seen.includes(p.name)
  );

  const person = remaining.length ? remaining[0] : people[0];

  const likedPeople = people.filter(
    p => saved.liked.includes(p.name)
  );

  function act(kind) {
    const currentSeen = remaining.length ? saved.seen : [];
    const nextSeen = [...currentSeen, person.name];

    const next = {
      liked: kind === 'like'
        ? [...new Set([...saved.liked, person.name])]
        : saved.liked,
      seen: nextSeen.length >= people.length ? [] : nextSeen
    };

    setSaved(next);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}

    setNotice(
      kind === 'like'
        ? `${person.name} added to your demo likes.`
        : `${person.name} passed in this demo.`
    );
  }

  function openChat(chatId) {
    setActiveChat(chatId);
  }

  function sendMessage(e) {
    e.preventDefault();

    const text = messageText.trim();

    if (!text || !activeChat) return;

    const updatedChats = chats.map(chat =>
      chat.id === activeChat
        ? {
            ...chat,
            messages: [
              ...chat.messages,
              {
                id: Date.now(),
                sender: 'me',
                text
              }
            ]
          }
        : chat
    );

    setChats(updatedChats);
    setMessageText('');

    try {
      localStorage.setItem(
        CHAT_STORAGE_KEY,
        JSON.stringify(updatedChats)
      );
    } catch {
      setNotice('Unable to save this demo message.');
    }
  }

  function Brand() {
    return (
      <div className="lc-brand">
        <div className="lc-brand-icon">
          <Heart size={22} fill="white" />
        </div>

        <div className="lc-brand-name">
          Love<span>Connect</span>
        </div>
      </div>
    );
  }

  function ProfileCard({ p, liked = false }) {
    return (
      <div className="lc-profile">
        <div
          className="lc-photo"
          style={{ background: p.color }}
        >
          <div className="lc-avatar">{p.initials}</div>

          <div className="lc-tag">
            {liked ? 'LIKED SAMPLE' : 'SAMPLE PROFILE'}
          </div>

          <div className="lc-person">
            <h2>{p.name}, {p.age}</h2>

            <span>
              <MapPin size={13} />
              {p.city}
            </span>
          </div>
        </div>

        <div className="lc-info">
          <p>{p.about}</p>

          <div className="lc-tags">
            {p.interests.map(x => (
              <span key={x}>{x}</span>
            ))}
          </div>

          {!liked && (
            <>
              <div className="lc-actions">
                <button
                  className="lc-action"
                  onClick={() => act('pass')}
                  aria-label="Pass sample"
                >
                  <X />
                </button>

                <button
                  className="lc-action like"
                  onClick={() => act('like')}
                  aria-label="Like sample"
                >
                  <Heart fill="white" />
                </button>
              </div>

              {notice && (
                <small className="lc-notice">{notice}</small>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  const currentChat = chats.find(
    chat => chat.id === activeChat
  );

  return (
    <>
      <style>{styles}</style>

      {!eligible ? (
        <div className="lc-auth">
          <div className="lc-card">
            <Brand />

            <div className="lc-eyebrow">
              Educational demo experience
            </div>

            <h1 className="lc-title">
              Welcome to a world<br />
              of meaningful connections.
            </h1>

            <p className="lc-subtitle">
              Explore the LoveConnect interface through a fictional,
              educational prototype.
            </p>

            <div className="lc-feature">
              <div className="lc-feature-icon">
                <ShieldCheck size={22} />
              </div>

              <div>
                <h3>Demo environment</h3>

                <p>
                  This is a fictional UI prototype. It does not provide
                  real dating, social networking or messaging.
                </p>
              </div>
            </div>

            <label className="lc-check">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={e => setConfirmed(e.target.checked)}
              />

              <span>
                I understand this is an educational demo.
              </span>
            </label>

            <button
              className="lc-primary"
              disabled={!confirmed}
              onClick={() => setEligible(true)}
            >
              Continue to demo <ArrowRight size={17} />
            </button>

            <p className="lc-footnote">
              Educational prototype only.<br />
              No real accounts, matches or messages are available.
            </p>
          </div>
        </div>
      ) : !showDemo ? (
        <div className="lc-auth">
          <div className="lc-card">
            <Brand />

            <div className="lc-eyebrow">
              Explore the interface
            </div>

            <h1 className="lc-title">
              Your space to connect.
            </h1>

            <p className="lc-subtitle">
              Enter the sample experience. No information below is
              submitted or stored.
            </p>

            <div className="lc-tabs">
              <button
                className={authMode === 'login' ? 'selected' : ''}
                onClick={() => setAuthMode('login')}
              >
                Login
              </button>

              <button
                className={authMode === 'signup' ? 'selected' : ''}
                onClick={() => setAuthMode('signup')}
              >
                Sign Up
              </button>
            </div>

            {authMode === 'signup' && (
              <input
                className="lc-input"
                placeholder="Demo name"
              />
            )}

            <input
              className="lc-input"
              type="email"
              placeholder="Demo email (not saved)"
            />

            <input
              className="lc-input"
              type="password"
              placeholder="Demo password (not saved)"
            />

            <button
              className="lc-primary"
              onClick={() => setShowDemo(true)}
            >
              Enter demo <ArrowRight size={17} />
            </button>

            <p className="lc-footnote">
              Educational prototype only. No real account is created.
            </p>
          </div>
        </div>
      ) : (
        <div className="lc-app">
          <aside className="lc-sidebar">
            <Brand />

            <div className="lc-nav-label">WORKSPACE</div>

            {[
              ['Discover', Home],
              ['Matches', Heart],
              ['Messages', MessageCircle],
              ['Profile', UserRound]
            ].map(([name, Icon]) => (
              <button
                key={name}
                className={`lc-nav ${tab === name ? 'active' : ''}`}
                onClick={() => setTab(name)}
                title={name}
                aria-label={name}
              >
                <Icon size={18} />
                <span>{name}</span>
              </button>
            ))}

            <div className="lc-side-bottom">
              <div className="lc-safety">
                <ShieldCheck size={19} />

                <div>
                  <b>Demo environment</b>
                  <small>Fictional profiles only</small>
                </div>
              </div>

              <button
                className={`lc-nav ${tab === 'Settings' ? 'active' : ''}`}
                onClick={() => setTab('Settings')}
                title="Settings"
                aria-label="Settings"
              >
                <Settings size={18} />
                <span>Settings</span>
              </button>

              <button
                className="lc-nav"
                onClick={() => setShowDemo(false)}
                title="Exit demo"
                aria-label="Exit demo"
              >
                <UserRound size={18} />
                <span>Exit demo</span>
              </button>
            </div>
          </aside>

          <main className="lc-main">
            <header className="lc-topbar">
              <div>
                <div className="lc-kicker">
                  LOVECONNECT · DEMO SPACE
                </div>

                <h1 className="lc-page-title">
                  {tab === 'Discover' ? 'Discover people' : tab}
                </h1>
              </div>

              <button className="lc-filter" disabled>
                <SlidersHorizontal size={16} />
                Filters
              </button>
            </header>

            {tab === 'Discover' ? (
              <section className="lc-layout">
                <div className="lc-intro">
                  <span className="lc-pill">
                    <Sparkles size={14} />
                    Curated discovery
                  </span>

                  <h2>
                    Good connections <em>start here.</em>
                  </h2>

                  <p>
                    Explore fictional sample profiles in this
                    educational interface.
                  </p>
                </div>

                <ProfileCard p={person} />

                <div className="lc-side-note">
                  <div className="icon">
                    <ShieldCheck size={19} />
                  </div>

                  <b>Private demo</b>

                  <p>
                    All profiles are fictional. No real accounts,
                    location tracking or messaging are connected.
                  </p>
                </div>
              </section>
            ) : tab === 'Matches' ? (
              <section className="lc-placeholder">
                <div className="lc-placeholder-icon">
                  <Heart />
                </div>

                <h2>Your demo likes</h2>

                <p>
                  {likedPeople.length
                    ? `${likedPeople.length} fictional sample profile(s) liked.`
                    : 'You have not liked any sample profiles yet.'}
                </p>

                {likedPeople.length > 0 && (
                  <div className="lc-liked-grid">
                    {likedPeople.map(p => (
                      <ProfileCard
                        key={p.name}
                        p={p}
                        liked
                      />
                    ))}
                  </div>
                )}

                <button
                  className="lc-primary lc-back"
                  onClick={() => setTab('Discover')}
                >
                  Back to Discover <ArrowRight size={16} />
                </button>
              </section>
            ) : tab === 'Messages' ? (
              <section className="lc-chat-layout">

                <div className="lc-chat-list">
                  <h3>Sample Inbox</h3>

                  {chats.map(chat => (
                    <button
                      key={chat.id}
                      className={`lc-chat-contact ${
                        activeChat === chat.id ? 'active' : ''
                      }`}
                      onClick={() => openChat(chat.id)}
                    >
                      <div
                        className="lc-chat-avatar"
                        style={{ background: chat.color }}
                      >
                        {chat.initials}
                      </div>

                      <div>
                        <b>{chat.name}</b>

                        <small>
                          {chat.messages.at(-1)?.text || 'No messages'}
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
                          className="lc-chat-avatar"
                          style={{ background: currentChat.color }}
                        >
                          {currentChat.initials}
                        </div>

                        <div>
                          <b>{currentChat.name}</b>
                          <small>Fictional demo contact</small>
                        </div>
                      </div>

                      <div className="lc-chat-messages">
                        {currentChat.messages.map(message => (
                          <div
                            key={message.id}
                            className={`lc-message ${
                              message.sender === 'me'
                                ? 'sent'
                                : 'received'
                            }`}
                          >
                            {message.text}
                          </div>
                        ))}
                      </div>

                      <form
                        className="lc-chat-input-area"
                        onSubmit={sendMessage}
                      >
                        <input
                          value={messageText}
                          onChange={e => setMessageText(e.target.value)}
                          placeholder="Write a demo message..."
                          maxLength={1000}
                        />

                        <button type="submit">
                          Send
                        </button>
                      </form>
                    </>
                  ) : (
                    <div className="lc-chat-empty">
                      Select a sample conversation.
                    </div>
                  )}
                </div>

              </section>
            ) : (
              <section className="lc-placeholder">
                <div className="lc-placeholder-icon">
                  {tab === 'Profile'
                    ? <UserRound />
                    : <Settings />}
                </div>

                <h2>
                  {tab === 'Profile' ? 'Demo profile' : 'Settings'}
                </h2>

                <p>
                  This section is a non-functional demo placeholder.
                </p>

                <button
                  className="lc-primary lc-back"
                  onClick={() => setTab('Discover')}
                >
                  Back to Discover <ArrowRight size={16} />
                </button>
              </section>
            )}

            <footer className="lc-footer">
              LoveConnect <span>•</span>
              Educational UI prototype <span>•</span>
              Fictional sample data
            </footer>
          </main>
        </div>
      )}
    </>
  );
}