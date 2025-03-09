// @discord.js
// This file contains the JavaScript implementation for a Discord-like UI

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Discord UI
  initDiscordUI();
});

function initDiscordUI() {
  // Create main structure
  const body = document.body;
  body.innerHTML = '';
  body.className = 'bg-gray-800 text-gray-100 overflow-hidden m-0 p-0 font-sans';
  
  // Create CSS
  createStyles();
  
  // Create main container
  const appContainer = document.createElement('div');
  appContainer.className = 'flex h-screen';
  body.appendChild(appContainer);
  
  // Server sidebar
  appContainer.appendChild(createServerSidebar());
  
  // Channels sidebar
  appContainer.appendChild(createChannelsSidebar());
  
  // Main chat area
  appContainer.appendChild(createChatArea());
  
  // Members sidebar
  appContainer.appendChild(createMembersSidebar());
  
  // Initialize functionality
  initServerSelection();
  initChannelSelection();
  initMessageSending();
  
  // Load icons if using Feather or similar
  if (typeof feather !== 'undefined') {
    feather.replace();
  }
}

function createStyles() {
  const style = document.createElement('style');
  style.textContent = `
    /* Base styles */
    body {
      margin: 0;
      padding: 0;
      font-family: 'Whitney', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      overflow: hidden;
    }
    
    /* Scrollbar styles */
    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-track {
      background: #2e3338;
    }
    ::-webkit-scrollbar-thumb {
      background: #202225;
      border-radius: 3px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #18191c;
    }
    
    /* Tailwind-like utility classes */
    .flex { display: flex; }
    .flex-col { flex-direction: column; }
    .flex-1 { flex: 1 1 0%; }
    .items-center { align-items: center; }
    .justify-center { justify-content: center; }
    .h-screen { height: 100vh; }
    .w-16 { width: 4rem; }
    .w-60 { width: 15rem; }
    .w-12 { width: 3rem; }
    .h-12 { height: 3rem; }
    .bg-gray-900 { background-color: #202225; }
    .bg-gray-800 { background-color: #2f3136; }
    .bg-gray-700 { background-color: #36393f; }
    .bg-gray-600 { background-color: #4f545c; }
    .text-gray-100 { color: #dcddde; }
    .text-gray-200 { color: #b9bbbe; }
    .text-gray-400 { color: #72767d; }
    .bg-indigo-500 { background-color: #5865f2; }
    .bg-green-500 { background-color: #3ba55c; }
    .bg-yellow-500 { background-color: #faa61a; }
    .bg-red-500 { background-color: #ed4245; }
    .text-white { color: #ffffff; }
    .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
    .px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
    .px-4 { padding-left: 1rem; padding-right: 1rem; }
    .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
    .p-3 { padding: 0.75rem; }
    .p-4 { padding: 1rem; }
    .space-y-3 > * + * { margin-top: 0.75rem; }
    .space-y-4 > * + * { margin-top: 1rem; }
    .space-x-2 > * + * { margin-left: 0.5rem; }
    .space-x-4 > * + * { margin-left: 1rem; }
    .rounded-full { border-radius: 9999px; }
    .rounded-2xl { border-radius: 1rem; }
    .rounded-lg { border-radius: 0.5rem; }
    .rounded { border-radius: 0.25rem; }
    .border-b { border-bottom-width: 1px; }
    .border-gray-900 { border-color: #202225; }
    .font-medium { font-weight: 500; }
    .font-bold { font-weight: 700; }
    .font-semibold { font-weight: 600; }
    .text-lg { font-size: 1.125rem; }
    .text-sm { font-size: 0.875rem; }
    .text-xs { font-size: 0.75rem; }
    .uppercase { text-transform: uppercase; }
    .shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
    .overflow-y-auto { overflow-y: auto; }
    .overflow-x-auto { overflow-x: auto; }
    .hover\\:bg-gray-700:hover { background-color: #36393f; }
    .hover\\:bg-indigo-500:hover { background-color: #5865f2; }
    .hover\\:bg-green-500:hover { background-color: #3ba55c; }
    .hover\\:text-white:hover { color: #ffffff; }
    .hover\\:text-gray-200:hover { color: #b9bbbe; }
    .hover\\:rounded-2xl:hover { border-radius: 1rem; }
    .mb-1 { margin-bottom: 0.25rem; }
    .mb-2 { margin-bottom: 0.5rem; }
    .mb-4 { margin-bottom: 1rem; }
    .mr-1 { margin-right: 0.25rem; }
    .mr-2 { margin-right: 0.5rem; }
    .mr-3 { margin-right: 0.75rem; }
    .ml-2 { margin-left: 0.5rem; }
    .ml-auto { margin-left: auto; }
    .w-8 { width: 2rem; }
    .h-8 { height: 2rem; }
    .w-10 { width: 2.5rem; }
    .h-10 { height: 2.5rem; }
    .w-3 { width: 0.75rem; }
    .h-3 { height: 0.75rem; }
    .w-4 { width: 1rem; }
    .h-4 { height: 1rem; }
    .w-5 { width: 1.25rem; }
    .h-5 { height: 1.25rem; }
    .w-full { width: 100%; }
    .w-36 { width: 9rem; }
    .opacity-70 { opacity: 0.7; }
    .relative { position: relative; }
    .absolute { position: absolute; }
    .bottom-0 { bottom: 0; }
    .right-0 { right: 0; }
    .top-1\\/2 { top: 50%; }
    .transform { transform: translateY(-50%); }
    .border-2 { border-width: 2px; }
    .border-gray-800 { border-color: #2f3136; }
    .focus\\:outline-none:focus { outline: none; }
    .bg-transparent { background-color: transparent; }
    .border-none { border: none; }
    .transition-all { transition-property: all; }
    .transition-colors { transition-property: background-color, border-color, color, fill, stroke; }
    .duration-200 { transition-duration: 200ms; }
  `;
  document.head.appendChild(style);
}

function createServerSidebar() {
  const sidebar = document.createElement('div');
  sidebar.className = 'w-16 bg-gray-900 flex flex-col items-center py-3 space-y-3';
  
  const servers = [
    { id: 'home', name: 'Home', initial: 'H', selected: true },
    { id: 'tailwind', name: 'Tailwind CSS', initial: 'T' },
    { id: 'react', name: 'React Devs', initial: 'R' },
    { id: 'typescript', name: 'TypeScript', initial: 'TS' },
    { id: 'nextjs', name: 'Next.js', initial: 'N' }
  ];
  
  servers.forEach(server => {
    const button = document.createElement('button');
    button.className = `w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium transition-all duration-200 ${
      server.selected
        ? 'bg-indigo-500 text-white rounded-2xl'
        : 'bg-gray-700 text-gray-200 hover:bg-indigo-500 hover:text-white hover:rounded-2xl'
    }`;
    button.setAttribute('data-server-id', server.id);
    button.textContent = server.initial;
    sidebar.appendChild(button);
  });
  
  // Add server button
  const addButton = document.createElement('button');
  addButton.className = 'w-12 h-12 rounded-full bg-gray-700 text-green-500 flex items-center justify-center hover:bg-green-500 hover:text-white transition-colors duration-200';
  addButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';
  sidebar.appendChild(addButton);
  
  return sidebar;
}

function createChannelsSidebar() {
  const sidebar = document.createElement('div');
  sidebar.className = 'w-60 bg-gray-800 flex flex-col';
  
  // Header
  const header = document.createElement('div');
  header.className = 'h-12 border-b border-gray-900 flex items-center px-4 shadow-sm';
  header.innerHTML = `
    <h1 class="font-bold text-white">Tailwind CSS</h1>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down ml-auto"><polyline points="6 9 12 15 18 9"></polyline></svg>
  `;
  sidebar.appendChild(header);
  
  // Channels list
  const channelsList = document.createElement('div');
  channelsList.className = 'flex-1 overflow-y-auto pt-3 px-2';
  
  const categories = [
    {
      name: 'INFORMATION',
      channels: [
        { id: 'welcome', name: 'welcome', type: 'text' },
        { id: 'announcements', name: 'announcements', type: 'text' }
      ]
    },
    {
      name: 'TEXT CHANNELS',
      channels: [
        { id: 'general', name: 'general', type: 'text', selected: true },
        { id: 'help', name: 'help', type: 'text' },
        { id: 'showcase', name: 'showcase', type: 'text' }
      ]
    },
    {
      name: 'VOICE CHANNELS',
      channels: [
        { id: 'voice-general', name: 'General', type: 'voice' },
        { id: 'voice-gaming', name: 'Gaming', type: 'voice' }
      ]
    }
  ];
  
  categories.forEach(category => {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'mb-4';
    
    const categoryHeader = document.createElement('h2');
    categoryHeader.className = 'text-xs font-semibold text-gray-400 px-2 mb-1 flex items-center';
    categoryHeader.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down mr-1"><polyline points="6 9 12 15 18 9"></polyline></svg>
      ${category.name}
    `;
    categoryDiv.appendChild(categoryHeader);
    
    category.channels.forEach(channel => {
      const button = document.createElement('button');
      button.className = `w-full text-sm flex items-center rounded px-2 py-1 mb-1 ${
        channel.selected
          ? 'bg-gray-700 text-white'
          : 'text-gray-400 hover:bg-gray-700 hover:text-gray-200'
      }`;
      button.setAttribute('data-channel-id', channel.id);
      
      const iconType = channel.type === 'voice' ? 'mic' : 'hash';
      button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-${iconType} mr-1 opacity-70"><path d="${iconType === 'hash' ? 'M4 9h16M4 15h16M10 3L8 21M16 3l-2 18' : 'M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z M19 10v2a7 7 0 0 1-14 0v-2 M12 19v4 M8 23h8'}"></path></svg>
        ${channel.name}
      `;
      categoryDiv.appendChild(button);
    });
    
    channelsList.appendChild(categoryDiv);
  });
  
  sidebar.appendChild(channelsList);
  
  // User area
  const userArea = document.createElement('div');
  userArea.className = 'h-14 bg-gray-900 px-2 flex items-center';
  userArea.innerHTML = `
    <img src="https://via.placeholder.com/32" alt="Your avatar" class="w-8 h-8 rounded-full">
    <div class="ml-2">
      <div class="text-sm font-medium">You</div>
      <div class="text-xs text-gray-400">#1234</div>
    </div>
    <div class="ml-auto flex space-x-2">
      <button class="text-gray-400 hover:text-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mic"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><path d="M12 19v4"></path><path d="M8 23h8"></path></svg>
      </button>
      <button class="text-gray-400 hover:text-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-headphones"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
      </button>
      <button class="text-gray-400 hover:text-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
      </button>
    </div>
  `;
  sidebar.appendChild(userArea);
  
  return sidebar;
}

function createChatArea() {
  const chatArea = document.createElement('div');
  chatArea.className = 'flex-1 flex flex-col bg-gray-700';
  
  // Header
  const header = document.createElement('div');
  header.className = 'h-12 border-b border-gray-900 flex items-center px-4 shadow-sm';
  header.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-hash text-gray-400 mr-2"><line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="14" y2="21"></line></svg>
    <span class="font-medium">general</span>
    <div class="ml-auto flex items-center space-x-4">
      <button class="text-gray-400 hover:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
      </button>
      <button class="text-gray-400 hover:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
      </button>
      <button class="text-gray-400 hover:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
      </button>
      <div class="relative">
        <input
          type="text"
          placeholder="Search"
          class="bg-gray-900 text-sm rounded px-2 py-1 w-36 text-gray-200 focus:outline-none"
        >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search absolute right-2 top-1/2 transform text-gray-400"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      </div>
    </div>
  `;
  chatArea.appendChild(header);
  
  // Messages
  const messagesContainer = document.createElement('div');
  messagesContainer.className = 'flex-1 overflow-y-auto p-4 space-y-4';
  messagesContainer.id = 'messages-container';
  
  const initialMessages = [
    { id: 1, author: 'Jane Doe', avatar: 'https://via.placeholder.com/40', content: 'Hey everyone! Welcome to our new Discord server!', timestamp: 'Today at 10:30 AM' },
    { id: 2, author: 'John Smith', avatar: 'https://via.placeholder.com/40', content: 'Thanks for inviting me. This looks great!', timestamp: 'Today at 10:32 AM' },
    { id: 3, author: 'Alex Johnson', avatar: 'https://via.placeholder.com/40', content: 'I\'m excited to chat about React and Tailwind with you all.', timestamp: 'Today at 10:35 AM' },
    { id: 4, author: 'Sarah Williams', avatar: 'https://via.placeholder.com/40', content: 'Has anyone tried the new Tailwind v3.0 features?', timestamp: 'Today at 10:40 AM' }
  ];
  
  initialMessages.forEach(message => {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'flex';
    messageDiv.innerHTML = `
      <img src="${message.avatar}" alt="${message.author}'s avatar" class="w-10 h-10 rounded-full mr-3">
      <div>
        <div class="flex items-baseline">
          <span class="font-medium mr-2">${message.author}</span>
          <span class="text-xs text-gray-400">${message.timestamp}</span>
        </div>
        <p class="text-gray-100">${message.content}</p>
      </div>
    `;
    messagesContainer.appendChild(messageDiv);
  });
  
  chatArea.appendChild(messagesContainer);
  
  // Message input
  const messageForm = document.createElement('form');
  messageForm.id = 'message-form';
  messageForm.className = 'p-4';
  messageForm.innerHTML = `
    <div class="bg-gray-600 rounded-lg flex items-center px-4">
      <button type="button" class="text-gray-400 hover:text-white mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
      </button>
      <input
        type="text"
        id="message-input"
        placeholder="Message #general"
        class="bg-transparent border-none text-gray-100 py-3 flex-1 focus:outline-none"
      >
    </div>
  `;
  chatArea.appendChild(messageForm);
  
  return chatArea;
}

function createMembersSidebar() {
  const sidebar = document.createElement('div');
  sidebar.className = 'w-60 bg-gray-800 overflow-y-auto p-3';
  
  // Online members
  const onlineSection = document.createElement('div');
  onlineSection.className = 'mb-2';
  
  const onlineHeader = document.createElement('h3');
  onlineHeader.className = 'text-xs font-semibold text-gray-400 uppercase mb-1';
  onlineHeader.textContent = 'Online — 4';
  onlineSection.appendChild(onlineHeader);
  
  const onlineMembers = [
    { id: 1, name: 'Jane Doe', status: 'online', role: 'Admin' },
    { id: 2, name: 'John Smith', status: 'online' },
    { id: 3, name: 'Alex Johnson', status: 'idle' },
    { id: 4, name: 'Sarah Williams', status: 'dnd', role: 'Moderator' }
  ];
  
  onlineMembers.forEach(member => {
    const memberDiv = document.createElement('div');
    memberDiv.className = 'flex items-center py-1 px-2 hover:bg-gray-700 rounded';
    
    const statusColors = {
      online: 'bg-green-500',
      idle: 'bg-yellow-500',
      dnd: 'bg-red-500'
    };
    
    memberDiv.innerHTML = `
      <div class="relative">
        <img src="https://via.placeholder.com/32" alt="${member.name}'s avatar" class="w-8 h-8 rounded-full">
        <div class="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-800 ${statusColors[member.status]}"></div>
      </div>
      <div class="ml-2">
        <div class="text-sm font-medium">${member.name}</div>
        ${member.role ? `<div class="text-xs text-gray-400">${member.role}</div>` : ''}
      </div>
    `;
    
    onlineSection.appendChild(memberDiv);
  });
  
  sidebar.appendChild(onlineSection);
  
  // Offline members
  const offlineSection = document.createElement('div');
  
  const offlineHeader = document.createElement('h3');
  offlineHeader.className = 'text-xs font-semibold text-gray-400 uppercase mb-1';
  offlineHeader.textContent = 'Offline — 1';
  offlineSection.appendChild(offlineHeader);
  
  const offlineMembers = [
    { id: 5, name: 'Michael Brown', status: 'offline' }
  ];
  
  offlineMembers.forEach(member => {
    const memberDiv = document.createElement('div');
    memberDiv.className = 'flex items-center py-1 px-2 text-gray-400 hover:bg-gray-700 rounded';
    
    memberDiv.innerHTML = `
      <div class="relative">
        <img src="https://via.placeholder.com/32" alt="${member.name}'s avatar" class="w-8 h-8 rounded-full opacity-70">
        <div class="absolute bottom-0 right-0