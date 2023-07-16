import { Client, GatewayIntentBits } from "discord.js";
import "dotenv/config";

const prefix = "!";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent],
});

client
  .login(process.env.BOTTOKEN)
  .then((res) => console.log(res))
  .catch((err) => console.log(err.stack));

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (message) => {
  console.log("message.content ==>", message.content);
  if (message.author.bot) return; // ignore other ROBOTS's messages
  if (!message.content.startsWith(prefix)) {
    return console.log(message.content);
  }
  const commandBody = message.content.slice(prefix.length); 
  const args = commandBody.split(" ");
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
  } else if (command === "sum") {
    const numArgs = args.map((x) => parseFloat(x));
    const sum = numArgs.reduce((counter, x) => (counter += x));
    message.reply(`The sum of all the arguments you provided is ${sum} !`);
  }
});

// client.on("interactionCreate", async (interaction) => {
//   if (!interaction.isChatInputCommand()) {
//     return console.log("interaction==>", interaction);
//   }
//   console.log("interactionCreate");
//   if (interaction.commandName === "ping") {
//     await interaction.reply("Pong!");
//   }
// });
