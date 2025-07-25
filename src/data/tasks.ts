import { Task, Milestone } from '../types';

export const milestones: Milestone[] = [
  {
    id: 'getting-closer',
    name: 'Getting Closer',
    description: 'Sweet and innocent bonding moments',
    tasksRequired: 10,
    emoji: '💕',
  },
  {
    id: 'now-its-spicy',
    name: "Now It's Spicy",
    description: 'More intimate and playful challenges',
    tasksRequired: 20,
    price: 10,
    emoji: '🌶️',
  },
  {
    id: 'love-masters',
    name: 'Love Masters',
    description: 'Advanced romantic adventures',
    tasksRequired: 30,
    price: 50,
    emoji: '🔥',
  },
  {
    id: 'ultimate-bond',
    name: 'Ultimate Bond',
    description: 'The deepest connection challenges',
    tasksRequired: 50,
    price: 100,
    emoji: '💍',
  },
];

export const tasks: Task[] = [
  // Free tasks (1-10)
  { id: 1, title: 'Hold Hands', prompt: 'Hold each other\'s hands for one minute while looking into each other\'s eyes and smiling.', category: 'Sweet', emoji: '🤝', verificationRule: 'holding_hands' },
  { id: 2, title: 'Warm Hug', prompt: 'Give each other a big, cozy hug for at least 30 seconds.', category: 'Sweet', emoji: '🤗', verificationRule: 'hugging' },
  { id: 3, title: 'Forehead Kiss', prompt: 'Gently kiss your partner on the forehead.', category: 'Sweet', emoji: '😘', verificationRule: 'forehead_kiss' },
  { id: 4, title: 'Compliment Game', prompt: 'Take turns saying one thing you love about each other.', category: 'Sweet', emoji: '💬', verificationRule: 'talking' },
  { id: 5, title: 'Cheek Kiss', prompt: 'Give your partner a soft kiss on the cheek.', category: 'Sweet', emoji: '💋', verificationRule: 'cheek_kiss' },
  { id: 6, title: 'Hand Squeeze', prompt: 'Hold hands and give three gentle squeezes to say "I love you" without words.', category: 'Sweet', emoji: '🤲', verificationRule: 'holding_hands' },
  { id: 7, title: 'Share a Smile', prompt: 'Stare at each other and try to make the other laugh with just a silly smile.', category: 'Sweet', emoji: '😊', verificationRule: 'smiling' },
  { id: 8, title: 'Nose Boop', prompt: 'Lightly tap your partner\'s nose with your finger and say "Boop!"', category: 'Sweet', emoji: '👃', verificationRule: 'nose_touch' },
  { id: 9, title: 'Eye Contact Challenge', prompt: 'Maintain eye contact for one minute without breaking it.', category: 'Sweet', emoji: '👀', verificationRule: 'eye_contact' },
  { id: 10, title: 'Hand Heart', prompt: 'Make a heart shape together using both of your hands.', category: 'Sweet', emoji: '💖', verificationRule: 'hand_heart' },
  
  // Paid tasks (11-20) - $10 unlock
  { id: 11, title: 'Tickle Fight', prompt: 'Have a gentle, 10-second tickle fight (no going overboard!)', category: 'Flirty', emoji: '😄', verificationRule: 'playful_interaction', milestone: 'now-its-spicy' },
  { id: 12, title: 'Dance Together', prompt: 'Slow dance for one minute, even without music.', category: 'Flirty', emoji: '💃', verificationRule: 'dancing' },
  { id: 13, title: 'Lip Peck', prompt: 'Give your partner a quick peck on the lips.', category: 'Flirty', emoji: '💋', verificationRule: 'lip_kiss' },
  { id: 14, title: 'Partner Pose', prompt: 'Strike a silly pose together like you\'re in a photoshoot.', category: 'Flirty', emoji: '📸', verificationRule: 'posing' },
  { id: 15, title: 'Piggyback Ride', prompt: 'Give your partner a 10-second piggyback ride around the room.', category: 'Flirty', emoji: '🐷', verificationRule: 'piggyback' },
  { id: 16, title: 'Hand Kiss', prompt: 'Kiss the back of your partner\'s hand like royalty.', category: 'Flirty', emoji: '👑', verificationRule: 'hand_kiss' },
  { id: 17, title: 'Cheek-to-Cheek', prompt: 'Press your cheeks together and hum a song.', category: 'Flirty', emoji: '🎵', verificationRule: 'cheek_to_cheek' },
  { id: 18, title: 'Blow a Kiss', prompt: 'Blow a dramatic kiss to your partner from across the room.', category: 'Flirty', emoji: '😙', verificationRule: 'blowing_kiss' },
  { id: 19, title: 'Spin Hug', prompt: 'Spin around once and end with a big hug.', category: 'Flirty', emoji: '🌪️', verificationRule: 'spinning_hug' },
  { id: 20, title: 'Neck Nuzzle', prompt: 'Gently nuzzle your partner\'s neck for a few seconds.', category: 'Flirty', emoji: '🦢', verificationRule: 'neck_nuzzle' },
  
  // More advanced tasks for higher tiers...
  { id: 21, title: 'Butterfly Kiss', prompt: 'Flutter your eyelashes against your partner\'s cheek.', category: 'Intimate', emoji: '🦋', verificationRule: 'butterfly_kiss', milestone: 'love-masters' },
  { id: 22, title: 'Hair Play', prompt: 'Run your fingers through your partner\'s hair gently.', category: 'Intimate', emoji: '💆', verificationRule: 'hair_touch' },
  // ... more tasks would be added here
];

export const getTaskById = (id: number): Task | undefined => {
  return tasks.find(task => task.id === id);
};

export const getTasksByMilestone = (milestone: string): Task[] => {
  return tasks.filter(task => task.milestone === milestone);
};

export const getUnlockedTasks = (paidUpTo: number): Task[] => {
  if (paidUpTo >= 100) return tasks; // All tasks unlocked
  if (paidUpTo >= 50) return tasks.slice(0, 45); // Up to task 45
  if (paidUpTo >= 10) return tasks.slice(0, 20); // Up to task 20
  return tasks.slice(0, 10); // Free tasks only
};