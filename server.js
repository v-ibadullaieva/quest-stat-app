const express = require('express');
const fs = require("fs");
const cors = require('cors');

const MAIN_PAGE_INFO = "data/MainPageInfo.json";
const GENERAL_QUESTS_INFO = "data/GeneralQuestsInfo.json";
const FINISHED_QUESTS_LEAFS = "data/FinishedQuestsLeafs.json";

const readData = (fileName) => 
  new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, content) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(content));
      }
    });
  });

const readQuests = () => 
  readData(MAIN_PAGE_INFO);

const readQuest = async (id) => {
  let data = await readData(GENERAL_QUESTS_INFO);
  const quest = data.find(quest => quest.id === id);

  data = await readData(MAIN_PAGE_INFO);
  const questItem = data.find(quest => quest.globalId === id);
  quest.status = questItem.status;
  
  data = await readData(FINISHED_QUESTS_LEAFS);
  const currentLeafs = data.filter(leaf => leaf.questId === quest.id).map(l => l.name);
  quest.pathway.leafs = quest.pathway.leafs.map(leaf => ({ 
    name: leaf,
    isCompleted: currentLeafs.includes(leaf)
  }));

  return quest;
}

const app = express();
app.use(cors());

app.get("/", async (req, res) => {
  try {
    const quests = await readQuests();
    res.json(quests);
  }
  catch (err) {
    res.status(500).json(null);
  }
});

app.get("/:id", async (req, res) => {
  try {
    const quest = await readQuest(parseInt(req.params.id));
    res.json(quest);
  }
  catch (err) {
    res.status(500).json(null);
  }
});

app.listen({ port: 3001 }, () =>
  console.log(`🚀 Server ready at http://localhost:3001`),
);