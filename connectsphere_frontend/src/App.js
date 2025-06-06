import React, { useState } from 'react';
import './App.css';

// MAIN COMPONENTS STUBS BELOW

// PUBLIC_INTERFACE
function TopNavBar({ onSearch }) {
  /** This is the top navigation bar with logo, search, and profile access. */
  return (
    <nav className="cs-navbar">
      <div className="cs-navbar-section cs-navbar-logo">
        <span className="cs-logo-symbol">🔵</span>
        <span className="cs-logo-text">ConnectSphere</span>
      </div>
      <div className="cs-navbar-section cs-navbar-search">
        <input
          className="cs-search-input"
          type="text"
          placeholder="Search ConnectSphere"
          onChange={e => onSearch(e.target.value)}
        />
      </div>
      <div className="cs-navbar-section cs-navbar-profile">
        <ProfileMenu />
      </div>
    </nav>
  );
}

// PUBLIC_INTERFACE
function ProfileMenu() {
  /** Stub for the user profile dropdown/menu. */
  return (
    <div className="cs-profile-menu">
      <img
        src="https://ui-avatars.com/api/?name=U+P"
        alt="User"
        className="cs-profile-avatar"
      />
      <span className="cs-profile-name">User Name</span>
    </div>
  );
}

// PUBLIC_INTERFACE
function LeftSidebar() {
  /** The left sidebar: Shortcuts to groups, pages, friends. */
  return (
    <aside className="cs-sidebar cs-sidebar-left">
      <SidebarShortcut icon="👥" label="Friends" />
      <SidebarShortcut icon="📄" label="Pages" />
      <SidebarShortcut icon="👨‍👩‍👧‍👦" label="Groups" />
    </aside>
  );
}

// PUBLIC_INTERFACE
function SidebarShortcut({ icon, label }) {
  return (
    <div className="cs-sidebar-shortcut">
      <span className="cs-sidebar-icon">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

// PUBLIC_INTERFACE
function RightSidebar() {
  /** Right sidebar: Notifications and trending topics */
  return (
    <aside className="cs-sidebar cs-sidebar-right">
      <Notifications />
      <TrendingTopics />
    </aside>
  );
}

// PUBLIC_INTERFACE
function Notifications() {
  /** Notifications stub. */
  return (
    <section className="cs-notifications">
      <h3 className="cs-sidebar-title">Notifications</h3>
      <div className="cs-notification-list">
        <div className="cs-notification-item">You have 1 new friend request.</div>
        <div className="cs-notification-item">New comment on your post.</div>
      </div>
    </section>
  );
}

// PUBLIC_INTERFACE
function TrendingTopics() {
  /** Trending topics stub. */
  return (
    <section className="cs-trending">
      <h3 className="cs-sidebar-title">Trending</h3>
      <ul className="cs-trending-list">
        <li>#ReactJS</li>
        <li>#WebDevelopment</li>
        <li>#OpenAI</li>
      </ul>
    </section>
  );
}

// PUBLIC_INTERFACE
function NewsFeed({ posts, onLike, onComment }) {
  /** The main feed with posts. */
  return (
    <section className="cs-newsfeed">
      <PostBox />
      <div className="cs-posts-list">
        {posts.map(post => (
          <Post
            key={post.id}
            data={post}
            onLike={() => onLike(post.id)}
            onComment={txt => onComment(post.id, txt)}
          />
        ))}
      </div>
    </section>
  );
}

// PUBLIC_INTERFACE
function PostBox() {
  /** Post creation box at top of feed */
  const [text, setText] = useState("");
  // For demo, just stub, no actual posting logic.
  return (
    <div className="cs-postbox">
      <img
        src="https://ui-avatars.com/api/?name=U+P"
        alt="User"
        className="cs-profile-avatar"
      />
      <input
        className="cs-postbox-input"
        type="text"
        placeholder="What's on your mind?"
        value={text}
        onChange={e => setText(e.target.value)}
        disabled
      />
      <button className="cs-btn cs-btn-accent" disabled>Post</button>
    </div>
  );
}

// PUBLIC_INTERFACE
function Post({ data, onLike, onComment }) {
  /** Render a single post, with media, likes, and comments. */
  const [commentText, setCommentText] = useState('');
  return (
    <div className="cs-post">
      <div className="cs-post-header">
        <img src={data.avatar} alt={data.user} className="cs-profile-avatar" />
        <div>
          <strong>{data.user}</strong>
          <span className="cs-post-time">{data.time}</span>
        </div>
      </div>
      <div className="cs-post-content">
        <p>{data.text}</p>
        {data.media && (
          <img
            src={data.media}
            alt="Post media"
            className="cs-post-media"
          />
        )}
      </div>
      <div className="cs-post-actions">
        <button className="cs-btn" onClick={onLike}>
          👍 Like ({data.likes})
        </button>
        <button className="cs-btn" onClick={() => {}}>
          💬 Comment ({data.comments.length})
        </button>
      </div>
      <div className="cs-post-comments">
        {data.comments.map((c, idx) => (
          <div key={idx} className="cs-comment">
            <strong>{c.user}</strong>: {c.text}
          </div>
        ))}
        <form
          className="cs-comment-form"
          onSubmit={e => {
            e.preventDefault();
            if (commentText.trim().length) {
              onComment(commentText);
              setCommentText("");
            }
          }}
        >
          <input
            className="cs-comment-input"
            type="text"
            placeholder="Write a comment..."
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            disabled
          />
          <button className="cs-btn cs-btn-secondary" type="submit" disabled>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

// ----------- Friends, Groups & Messaging Stubs ------------

// PUBLIC_INTERFACE
function MessagingStub() {
  return (
    <div className="cs-messaging-stub">
      <h3>Messaging (Stub)</h3>
      <p>Private chats will appear here.</p>
    </div>
  );
}

// PUBLIC_INTERFACE
function FriendSystemStub() {
  return (
    <div className="cs-friend-system-stub">
      <h3>Friend Requests (Stub)</h3>
      <p>Send, accept, decline requests here.</p>
    </div>
  );
}

// PUBLIC_INTERFACE
function GroupsAndPagesStub() {
  return (
    <div className="cs-groups-stub">
      <h3>Groups & Pages (Stub)</h3>
      <p>Manage and join groups or pages here.</p>
    </div>
  );
}

// -------------------- MAIN APP CONTAINER ---------------------


function App() {
  // Demo posts/stubs. In production, this would come from backend/API.
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Alice",
      avatar: "https://ui-avatars.com/api/?name=Alice",
      time: "3 min ago",
      text: "Hello ConnectSphere! 🎉",
      media: "",
      likes: 4,
      comments: [
        { user: "Bob", text: "Welcome! 👋" },
      ],
    },
    {
      id: 2,
      user: "Bob",
      avatar: "https://ui-avatars.com/api/?name=Bob",
      time: "10 min ago",
      text: "Check out this photo from my trip!",
      media: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
      likes: 2,
      comments: [
        { user: "Alice", text: "Looks great! 🌅" },
      ],
    },
  ]);
  // Like handler demo
  const handleLike = postId => {
    setPosts(posts =>
      posts.map(post =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };
  // Comment handler demo (comment disabled by default for stub/UIdemo)
  const handleComment = (postId, txt) => {
    // Not updating for stub/demo purposes
  };

  // Responsive container layout, following provided layoutDescription
  return (
    <div className="cs-app-container">
      <TopNavBar onSearch={() => {}} />
      <div className="cs-main-content">
        <LeftSidebar />
        <main className="cs-feed-main">
          <NewsFeed posts={posts} onLike={handleLike} onComment={handleComment} />
        </main>
        <RightSidebar />
      </div>
      {/* Extra stubs at root, can be moved/activated via routing etc */}
      <div style={{ display: 'none' }}>
        <MessagingStub />
        <FriendSystemStub />
        <GroupsAndPagesStub />
      </div>
    </div>
  );
}

export default App;
