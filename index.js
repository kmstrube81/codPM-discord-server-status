import axios from "axios";
import { WebhookClient } from "discord.js";
import { readFileSync, writeFileSync } from "fs";
import { formatEmbed } from "./formatMessage.js";

const configPath = "config.json";
const config = JSON.parse(readFileSync(configPath, "utf8"));

async function fetchServerStatus() {
  const url = "https://api.cod.pm/getstatus/"+config.serverIP+"/"+config.serverPort;
  const res = await axios.get(url);
  return res.data;
}

async function postToDiscord(embeds) {
  const webhook = new WebhookClient({ url: config.discordWebhookUrl });

  try {
    if (config.messageId) {
      await webhook.editMessage(config.messageId, { embeds });
      console.log("Embed message updated");
    } else {
      const msg = await webhook.send({ embeds });
      config.messageId = msg.id;
      writeFileSync(configPath, JSON.stringify(config, null, 2));
      console.log("Embed message posted and ID saved");
    }
  } catch (err) {
    console.error("Discord update failed:", err.message);
  }
}

(async () => {
  try {
    const status = await fetchServerStatus();
    const embeds = formatEmbed(status);
    await postToDiscord(embeds);
  } catch (err) {
    console.error("Script failed:", err.message);
  }
})();
