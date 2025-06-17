# codPM Discord Server Status

This Node.js script fetches the status of a Call of Duty server using the [cod.pm](https://cod.pm) API and updates a Discord channel via webhook with a rich embedded message showing current map, mode, and players.

---

## Features

- Fetches live server info from cod.pm API
- Formats data into Discord embeds
- Posts or edits a message via Discord webhook
- Automatically stores the message ID for future updates
- Schedules easily via cron (Linux/macOS) or Task Scheduler (Windows)

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/kmstrube81/codPM-discord-server-status.git
cd codPM-discord-server-status
```

### 2. Install Dependencies

Make sure you have Node.js (v14+) installed. Then run:

```bash
npm install
```

---

## Configuration

Edit the `config.json` file in the project root:

```json
{
  "serverIP": "SERVER_IP",
  "serverPort": "SERVER_PORT",
  "discordWebhookUrl": "DISCORD_WEBHOOK",
  "messageId": "",
  "timezone": "TIMEZONE"
}
```

| Key                | Description                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| `serverIP`         | IP address of the Call of Duty server to track                              |
| `serverPort`       | Port number of the server                                                   |
| `discordWebhookUrl`| Discord webhook URL for the channel where you want to post updates          |
| `messageId`        | Leave blank on first run – the script will save the posted message ID here |
| `timezone`         | Timezone (e.g., `"America/Chicago"`, `"UTC"`) used for timestamp formatting|

Example:
```json
{
  "serverIP": "123.45.67.89",
  "serverPort": "28960",
  "discordWebhookUrl": "https://discord.com/api/webhooks/...",
  "messageId": "",
  "timezone": "America/Chicago"
}
```

---

## Running the Script

You can run the script manually to test:

```bash
node index.js
```

On the first run, it will post a new message and save the message ID to `config.json`. On future runs, it will edit that message.

---

## Scheduling

### Option 1: Cron (Linux/macOS)

Run the script periodically by adding it to your crontab.

1. Edit your crontab:

```bash
crontab -e
```

2. Add this line to run it every 5 minutes:

```cron
*/5 * * * * cd /full/path/to/codPM-discord-server-status && /usr/bin/node index.js >> cron.log 2>&1
```

Replace `/usr/bin/node` with the path to your Node.js binary if needed (check with `which node`).

### Option 2: Task Scheduler (Windows)

1. Open **Task Scheduler** and create a new task.
2. Set it to trigger every 5 minutes.
3. Set the **Action** to:
   - **Program/script**: path to `node.exe` (e.g., `C:\Program Files\nodejs\node.exe`)
   - **Add arguments**: `C:\full\path\to\index.js`
   - **Start in**: `C:\full\path\to\codPM-discord-server-status`
4. Save and enable the task.

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## Credits

- Developed by [Kasey Strube](https://github.com/kmstrube81)
- Powered by [cod.pm](https://cod.pm) for server data
- Uses [discord.js](https://discord.js.org), [axios](https://axios-http.com), and [luxon](https://moment.github.io/luxon)

---

## Questions?

Open an issue on the [GitHub repo](https://github.com/kmstrube81/codPM-discord-server-status)