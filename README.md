<p align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=SpaceStation&fontSize=80&fontAlignY=35&animation=twinkling&fontColor=gradient"/> </a> 
</p>

<p align="center"> 
  <a href="https://ko-fi.com/nanotect" target="_blank"> <img src="https://ko-fi.com/img/githubbutton_sm.svg"/> </a> 
</p>

## 📑 Feature
- [x] Slash Command (Base, Group, Sub)
- [x] Custom Radio
- [x] Stay on voice (24/7)
- [x] View Playing Song
- [x] AutoReconnect Voice (On Run Bot!)
- [x] AutoJoin (When got disconnect or move!)
- [x] Stage Voice Support! (AutoDetect And Created)
- [x] AutoPlay (On Radio End!)
- [x] Database (JSON)
- [x] Easy to use

## 📎 Requirements

- Node.js v16+ **[Download](https://nodejs.org/en/download/)**
- Discord Bot Token **[Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)**


## 📚 Installation

```
git clone https://github.com/Adivise/SpaceStation
cd SpaceStation
npm install
```


## 📄 Configuration

Copy or Rename `.env.example` to `.env` and fill out the values:

```.env
# Bot
TOKEN=REPLACE_HERE
EMBED_COLOR=#000001

# Dev
OWNER_ID=REPLACE_HERE

# Nodes
NODE_HOST=localhost
NODE_PORT=5556
NODE_PASSWORD=123456
```

After installation or finishes all you can use `node .` to start the bot.

## 🔩 Features & Commands

> Note: The default prefix is '/'

🎶 **Station Commands!**

- Setup (/station setup)
- Add (/station add [song/link])
- Skip (/station skip)