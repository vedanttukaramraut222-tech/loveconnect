
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
  ChevronRight,
  Settings,
  Home
} from 'lucide-react';

const people = [
  {
    name: 'Aarav',
    age: 22,
    city: 'Pune',
    about: 'Coffee, weekend hikes and discovering new music.',
    interests: ['Music', 'Travel', 'Coffee'],
    color: 'linear-gradient(135deg,#c7b5ff,#f4d8ed)',
    initials: 'A'
  },
  {
    name: 'Mira',
    age: 23,
    city: 'Mumbai',
    about: 'Bookstores, art galleries and long conversations.',
    interests: ['Art', 'Books', 'Food'],
    color: 'linear-gradient(135deg,#f7c6dc,#c8c1ff)',
    initials: 'M'
  },
  {
    name: 'Ishaan',
    age: 24,
    city: 'Nashik',
    about: 'Learning new things and exploring local cafes.',
    interests: ['Tech', 'Movies', 'Cafes'],
    color: 'linear-gradient(135deg,#b7d9f7,#d9c9ff)',
    initials: 'I'
  }
];

const STORAGE_KEY = 'loveconnect-demo-actions-v1';

const emptyData = {
  liked: [],
  seen: []
};

function loadSavedData() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));

    return {
      liked: Array.isArray(data?.liked) ? data.liked : [],
      seen: Array.isArray(data?.seen) ? data.seen : []
    };
  } catch {
    return emptyData;
  }
}

export default function App() {
  const [tab, setTab] = useState('Discover');
  const [notice, setNotice] = useState('');
  const [showDemo, setShowDemo] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [saved, setSaved] = useState(loadSavedData);

  const remainingPeople = people.filter(
    person => !saved.seen.includes(person.name)
  );

  const person = remainingPeople.length > 0
    ? remainingPeople[0]
    : people[0];

  const likedPeople = people.filter(
    person => saved.liked.includes(person.name)
  );

  const act = (kind) => {
    if (!person) return;

    const currentSeen = remainingPeople.length > 0
      ? saved.seen
      : [];

    const nextSeen = [...currentSeen, person.name];

    const next = {
      liked: kind === 'like'
        ? [...new Set([...saved.liked, person.name])]
        : saved.liked,

      seen: nextSeen.length >= people.length
        ? []
        : nextSeen
    };

    setSaved(next);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Browser storage unavailable.
    }

    setNotice(
      kind === 'like'
        ? `${person.name} added to your likes.`
        : `${person.name} passed.`
    );
  };

  if (!showDemo) {
    return (
      <div className="auth-page">
        <div className="auth-card">

          <div className="auth-logo">
            <Heart size={28} fill="white" />
          </div>

          <h1>LoveConnect</h1>
          <p>Your space to connect.</p>

          <div className="auth-tabs">
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
            <input type="text" placeholder="Your name" />
          )}

          <input type="email" placeholder="Email address" />
          <input type="password" placeholder="Password" />

          <button
            className="auth-submit"
            onClick={() => setShowDemo(true)}
          >
            Continue to Demo
          </button>

          <p className="auth-note">
            Educational UI prototype only.
            No real accounts or personal data are stored.
            This concept is intended for adults aged 18+.
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">

      <aside className="sidebar">

        <div className="brand">
          <span className="brand-icon">
            <Heart size={20} fill="white" />
          </span>
          <span>LoveConnect</span>
        </div>

        <div className="nav-label">MENU</div>

        {['Discover', 'Matches', 'Messages', 'Profile'].map((t, i) => (
          <button
            key={t}
            className={'nav-item ' + (tab === t ? 'active' : '')}
            onClick={() => setTab(t)}
          >
            {[
              <Home key="home" />,
              <Heart key="heart" />,
              <MessageCircle key="message" />,
              <UserRound key="user" />
            ][i]}
            {t}
          </button>
        ))}

        <div className="sidebar-bottom">

          <div className="safety">
            <ShieldCheck size={18} />
            <div>
              <b>Safety first</b>
              <small>Demo experience · No real chats</small>
            </div>
          </div>

          <button
            className="nav-item"
            onClick={() => setTab('Settings')}
          >
            <Settings />
            Settings
          </button>

          <button
            className="nav-item"
            onClick={() => setShowDemo(false)}
          >
            <UserRound />
            Back to Login
          </button>

        </div>
      </aside>

      <main className="main">

        <header className="topbar">

          <div>
            <div className="eyebrow">
              YOUR SPACE TO CONNECT
            </div>

            <h1>
              {tab === 'Discover' ? 'Discover people' : tab}
            </h1>
          </div>

          <button className="filter">
            <SlidersHorizontal size={17} />
            Filters
          </button>

        </header>

        {tab === 'Discover' ? (

          <section className="discover-layout">

            <div className="intro">

              <span className="pill">
                <Sparkles size={14} />
                Curated discovery
              </span>

              <h2>
                Good connections
                <br />
                <em>start here.</em>
              </h2>

              <p>
                Explore sample profiles in this private UI prototype.
              </p>

            </div>

            <div className="profile-card">

              <div
                className="photo"
                style={{ background: person.color }}
              >

                <div className="avatar">
                  {person.initials}
                </div>

                <span className="photo-tag">
                  SAMPLE PROFILE
                </span>

                <div className="photo-gradient"></div>

                <div className="person-heading">

                  <h2>
                    {person.name}, {person.age}
                  </h2>

                  <span>
                    <MapPin size={14} />
                    {person.city}
                  </span>

                </div>
              </div>

              <div className="profile-info">

                <p>{person.about}</p>

                <div className="tags">
                  {person.interests.map(x => (
                    <span key={x}>{x}</span>
                  ))}
                </div>

                <div className="actions">

                  <button
                    className="pass"
                    onClick={() => act('pass')}
                    aria-label="Pass"
                  >
                    <X />
                  </button>

                  <button
                    className="like"
                    onClick={() => act('like')}
                    aria-label="Like"
                  >
                    <Heart fill="white" />
                  </button>

                </div>

                {notice && (
                  <small className="notice">
                    {notice}
                  </small>
                )}

              </div>
            </div>

            <div className="side-note">

              <div className="note-icon">
                <ShieldCheck />
              </div>

              <b>Private demo</b>

              <p>
                All profiles are fictional sample data.
                No account, location tracking or messaging is connected.
              </p>

            </div>

          </section>

        ) : tab === 'Matches' ? (

          <section className="placeholder">

            <div className="placeholder-icon">
              <Heart />
            </div>

            <h2>Your liked profiles</h2>

            <p>
              {likedPeople.length === 0
                ? 'You have not liked any sample profiles yet.'
                : `${likedPeople.length} profile(s) liked in this demo.`}
            </p>

            {likedPeople.length > 0 && (

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '20px',
                  width: '100%',
                  marginTop: '24px'
                }}
              >

                {likedPeople.map(p => (

                  <div className="profile-card" key={p.name}>

                    <div
                      className="photo"
                      style={{ background: p.color }}
                    >

                      <div className="avatar">
                        {p.initials}
                      </div>

                      <span className="photo-tag">
                        LIKED PROFILE
                      </span>

                      <div className="person-heading">
                        <h2>{p.name}, {p.age}</h2>

                        <span>
                          <MapPin size={14} />
                          {p.city}
                        </span>
                      </div>

                    </div>

                    <div className="profile-info">

                      <p>{p.about}</p>

                      <div className="tags">
                        {p.interests.map(x => (
                          <span key={x}>{x}</span>
                        ))}
                      </div>

                    </div>

                  </div>

                ))}

              </div>

            )}

            <button
              className="primary"
              onClick={() => setTab('Discover')}
              style={{ marginTop: '24px' }}
            >
              Back to Discover
              <ChevronRight size={16} />
            </button>

          </section>

        ) : (

          <section className="placeholder">

            <div className="placeholder-icon">
              {tab === 'Messages' ? (
                <MessageCircle />
              ) : tab === 'Profile' ? (
                <UserRound />
              ) : (
                <Settings />
              )}
            </div>

            <h2>
              {tab === 'Messages'
                ? 'Messages demo'
                : tab === 'Profile'
                ? 'Your profile'
                : 'Settings'}
            </h2>

            <p>
              {tab === 'Messages'
                ? 'Real messaging is disabled in this educational prototype.'
                : 'This screen will be added in the next development stage.'}
            </p>

            <button
              className="primary"
              onClick={() => setTab('Discover')}
            >
              Back to Discover
              <ChevronRight size={16} />
            </button>

          </section>

        )}

        <footer>
          LoveConnect <span>•</span> UI prototype
          <span>•</span> Fictional sample profiles only
        </footer>

      </main>
    </div>
  );
}
