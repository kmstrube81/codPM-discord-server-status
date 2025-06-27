import { EmbedBuilder } from "discord.js";
import { readFileSync } from "fs";
import { DateTime } from "luxon";

const config = JSON.parse(readFileSync("config.json", "utf8"));

export function formatEmbed(data) {
  const {
    serverinfo,
    playerinfo,
    time_retrieved,
    mapimage
  } = data;

  
  const map = serverinfo?.mapname || "unknown";
  const mode = serverinfo?.g_gametype || "N/A";
  const hostname = serverinfo?.sv_hostname || "Unnamed Server";
  const playerCount = playerinfo?.length || 0;
  const maxPlayers = serverinfo?.sv_maxclients || "?";

  const timezone = config.timezone || "UTC";
  const updatedTime = DateTime.fromSeconds(Number(time_retrieved)).setZone(timezone).toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);

  const imageUrl = `https://cod.pm/mp_maps/${mapimage}`;
  
  const embed1 = new EmbedBuilder()
    .setTitle(hostname)
    .setImage(imageUrl)
	.setFooter({ text: `${mode} — ${map} — ${playerCount}/${maxPlayers} players` });
  let embed2 = new EmbedBuilder()
	.setFooter({ text: `Updated ${updatedTime} (${timezone})` });
  if(playerCount){

	  const namePad = 30;
	  const scorePad = 6;
	  const pingPad = 6;
	  
	  const footer = "[See All Players...](https://cod.pm/server/" + config.serverIP + "/" + config.serverPort + ")"; 
	  
	  let chars = namePad + scorePad + pingPad + footer.length + 18;

	  const header = pad("Name", namePad) + pad("Score", scorePad) + pad("Ping", pingPad);
	  
	  playerinfo.sort((a,b) => b.score - a.score );
		  
	  const lines = playerinfo.map(p =>
		pad(sanitize(p.name), namePad) + pad(p.score, scorePad) + pad(p.ping, pingPad)
	  );
	  let flag = false;
	  let rows = "";
	  lines.forEach((line) => {
		let join = line + '\n';
		chars += 44;
		if(chars < 1024){
			rows += join;
		} else {
			flag = true;
		}
	  });
	  
	  let footerMd = flag ? footer : "";

	  const table = [header, "-".repeat(header.length), rows].join("\n");

	  
		
	  embed2.addFields({
		  name: `/connect ${config.serverIP}:${config.serverPort}`,
		  value: `\`\`\`\n${table}\n\`\`\`\n${footerMd}`
		});
		
		
		
		
		
	}
	else {  
	
		embed2.addFields({
		  name: `/connect ${config.serverIP}:${config.serverPort}`,
		  value: "Server is empty"
		});
	
	}
	return [embed1, embed2]; 
}

function pad(str, len) {
  str = str.toString();
  return str.length >= len ? str.slice(0, len - 1) + " " : str + " ".repeat(len - str.length);
}

function sanitize(name) {
  return name
    .replace(/\^\d/g, "") // remove color codes like ^1, ^7, etc.
    .replace(/\|/g, "")   // remove pipes
    .replace(/`/g, "'");  // replace backticks with apostrophes
}
