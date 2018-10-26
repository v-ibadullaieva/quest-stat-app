export const API_LINK = 'http://localhost:3001';

export const getQuests = async () => {
  const res = await fetch(API_LINK);
  return await res.json();
}

export const getQuest = async (id) => {
  const res = await fetch(`${API_LINK}/${id}`);
  return await res.json();
}
